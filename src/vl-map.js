import {vlElement} from '/node_modules/vl-ui-core/dist/vl-core.js';

/**
 * VlMap
 * @class
 * @classdesc De kaart component.
 *
 * @extends vlElement
 *
 * @property {boolean} disable-escape-key - Attribuut wordt gebruikt om ervoor te zorgen dat de escape toets niet gebruikt kan worden.
 * @property {boolean} disable-rotation - Attribuut wordt gebruikt om ervoor te zorgen dat het niet mogelijk is om de kaart te draaien.
 * @property {boolean} disable-mouse-wheel-zoom - Attribuut wordt gebruikt om ervoor te zorgen dat het niet mogelijk is om de kaart in te zoomen met het muiswiel.
 *
 * @see {@link https://www.github.com/milieuinfo/webcomponent-vl-ui-map/releases/latest|Release notes}
 * @see {@link https://www.github.com/milieuinfo/webcomponent-vl-ui-map/issues|Issues}
 * @see {@link https://webcomponenten.omgeving.vlaanderen.be/demo/vl-map.html|Demo}
 */
export class VlMap extends vlElement(HTMLElement) {
  constructor() {
    super(`
      <style>
        @import "/src/style.css";
      </style>
      <style>
        :host {
          display: none;
          position: relative;
          --vl-map--margin-top: 0px;
        }
        
        #map {
          height: calc(var(--vl-map-height, 500px) - var(--vl-map--margin-top)); 
          width: 100%;
        }
        
        .ol-zoom, .ol-zoomslider, .ol-rotate {
          margin-top: var(--vl-map--margin-top) !important;
        }
        
        .ol-overlaycontainer-stopevent > .ol-zoom {
          border-radius: 0;
        }
        
        .ol-overlaycontainer-stopevent > .ol-overviewmap {
          border-radius: 0;
          width: 100px;
          height: 100px;
        }
        
        .ol-overlaycontainer-stopevent > .ol-scale-line {
          border-radius: 0;
          background-color: white;
        }
        
        .ol-overlaycontainer-stopevent > .ol-scale-line .ol-scale-line-inner {
          border-color: black;
          color: black;
        }
        
        .ol-overlaycontainer-stopevent > .ol-control {
          margin-top: 0;
        }
        
        .ol-overlaycontainer-stopevent > .ol-zoomslider {
          background: none;
        }
        
        .ol-overlaycontainer-stopevent > .ol-zoomslider .ol-zoomslider-thumb {
          margin-bottom: 5px;
        }
      </style>

      <div id="map"></div>
    `);

    this.__prepareReadyPromises();
  }

  /**
   * Geeft een Promise terug die resolved wanneer de kaart klaar is voor verder gebruik.
   *
   * @return {Promise<void>}
   */
  get ready() {
    return this.__ready;
  }

  __prepareReadyPromises() {
    this.__mapReady = new Promise((resolve) => this.__mapReadyResolver = resolve);
    this.__overviewMapReady = new Promise((resolve) => this.__overviewMapReadyResolver = resolve);
    this.__ready = Promise.all([this.__mapReady, this.__overviewMapReady]);
  }

  /**
   * Geeft de OpenLayers map terug.
   *
   * @Return {acd.ol.CustomMap}
   */
  get map() {
    return this._map;
  }

  get disableEscapeKey() {
    return this.getAttribute('disable-escape-key') != undefined;
  }

  get disableRotation() {
    return this.getAttribute('disable-rotation') != undefined;
  }

  get disableMouseWheelZoom() {
    return this.getAttribute('disable-mouse-wheel-zoom') != undefined;
  }

  get _geoJSON() {
    if (!this.__geoJSON) {
      this.__geoJSON = new ol.format.GeoJSON();
    }
    return this.__geoJSON;
  }

  get _mapElement() {
    return this._shadow.querySelector('#map');
  }

  get _projection() {
    return new ol.proj.Projection({
      code: 'EPSG:31370',
      extent: this._extent,
    });
  }

  get _extent() {
    return [9928, 66928, 272072, 329072];
  }

  connectedCallback() {
    this.__initializeCoordinateSystem();

    this._map = new acd.ol.CustomMap({
      actions: [],
      disableEscapeKey: this.disableEscapeKey,
      disableRotation: this.disableRotation,
      disableMouseWheelZoom: this.disableMouseWheelZoom,
      customLayers: {
        baseLayerGroup: this.__createLayerGroup('Basis lagen', []),
        overviewMapLayers: [],
        overlayGroup: this.__createLayerGroup('Lagen', []),
      },
      projection: this._projection,
      target: this._mapElement,
    });

    this._map.initializeView();
    this.__updateMapSizeOnLoad();
    this.__updateOverviewMapSizeOnLoad();
  }

  /**
   * Voegt een kaartactie toe aan de kaart.
   *
   * @param {ol.interaction} action
   */
  addAction(action) {
    this._map.addAction(action);
  }

  /**
   * Zoomt op de kaart naar de bounding box.
   *
   * @param {Number[]} boundingbox
   */
  zoomTo(boundingbox) {
    this._map.zoomToExtent(boundingbox);
  }

  __updateMapSize() {
    this.style.display = 'block';
    if (this._map) {
      this._map.updateSize();
    }
    this.__mapReadyResolver();
  }

  __updateOverviewMapSize() {
    if (this._map.overviewMapControl) {
      this._map.overviewMapControl.getOverviewMap().updateSize();
    }
    this.__overviewMapReadyResolver();
  }

  __updateOverviewMapSizeOnLoad() {
    VlMap.__callOnceOnLoad(this.__updateOverviewMapSize.bind(this));
  }

  __updateMapSizeOnLoad() {
    VlMap.__callOnceOnLoad(this.__updateMapSize.bind(this));
  }

  __createLayerGroup(title, layers) {
    return new ol.layer.Group({
      title: title,
      layers: layers,
    });
  }

  __initializeCoordinateSystem() {
    proj4.defs('EPSG:31370', '+proj=lcc +lat_1=51.16666723333333 +lat_2=49.8333339 +lat_0=90 +lon_0=4.367486666666666 +x_0=150000.013 +y_0=5400088.438 +ellps=intl +towgs84=-106.869,52.2978,-103.724,0.3366,-0.457,1.8422,-1.2747 +units=m +no_defs');
  }

  static __callOnceOnLoad(callback) {
    if (document.readyState === 'complete') {
      callback();
    } else {
      window.addEventListener('load', callback, {once: true});
    }
  }
}
