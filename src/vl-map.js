import {vlElement} from '/node_modules/vl-ui-core/dist/vl-core.js';
import {VlCustomMap, OlLayerGroup, OlProjection, OlFullScreenControl} from '/node_modules/vl-mapactions/dist/vl-mapactions.js';

/**
 * VlMap
 * @class
 * @classdesc De kaart component.
 *
 * @extends HTMLElement
 * @mixes vlElement
 *
 * @property {boolean} data-vl-allow-fullscreen - Attribuut wordt gebruikt om de gebruiker de mogelijkheid te geven om de kaart in fullscreen te visualiseren.
 * @property {boolean} data-vl-disable-escape-key - Attribuut wordt gebruikt om ervoor te zorgen dat de escape toets niet gebruikt kan worden.
 * @property {boolean} data-vl-disable-rotation - Attribuut wordt gebruikt om ervoor te zorgen dat het niet mogelijk is om de kaart te draaien.
 * @property {boolean} data-vl-disable-mouse-wheel-zoom - Attribuut wordt gebruikt om ervoor te zorgen dat het niet mogelijk is om de kaart in te zoomen met het muiswiel.
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
      <div id="map">
        <slot></slot>
      </div>
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

  /**
   * Geeft het overlay container element terug.
   *
   * @return {HTMLElement}
   */
  get overlayContainerElement() {
    return this._shadow.querySelector('.ol-overlaycontainer-stopevent');
  }

  __prepareReadyPromises() {
    this.__mapReady = new Promise((resolve) => this.__mapReadyResolver = resolve);
    this.__overviewMapReady = new Promise((resolve) => this.__overviewMapReadyResolver = resolve);
    this.__ready = Promise.all([this.__mapReady, this.__overviewMapReady]);
  }

  /**
   * Geeft de OpenLayers map terug.
   *
   * @return {VlCustomMap}
   */
  get map() {
    return this._map;
  }

  /**
   * Geeft de OpenLayers kaart visualisatie terug.
   *
   * @return {Object}
   */
  get view() {
    return this._map.getView();
  }

  get layers() {
    return [...this.querySelectorAll('vl-map-layer')];
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

  get _mapElement() {
    return this._shadow.querySelector('#map');
  }

  get _controls() {
    if (this.dataset.vlAllowFullscreen != undefined) {
      return [new OlFullScreenControl()];
    } else {
      return [];
    }
  }

  get _projection() {
    return new OlProjection({
      code: 'EPSG:31370',
      extent: this._extent,
      getPointResolution: (r) => r,
    });
  }

  get _extent() {
    return [9928, 66928, 272072, 329072];
  }

  connectedCallback() {
    this.__initializeCoordinateSystem();

    this._map = new VlCustomMap({
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
      controls: this._controls,
    });

    this._map.initializeView();
    this.__updateMapSizeOnLoad();
    this.__updateOverviewMapSizeOnLoad();
  }

  /**
   * Voegt een kaartlaag toe aan de kaart.
   *
   * @param {Object} layer
   */
  addLayer(layer) {
    this._map.getOverlayLayers().push(layer);
  }

  /**
   * Voegt een kaartactie toe aan de kaart.
   *
   * @param {VlMapAction} action
   */
  addAction(action) {
    this._map.addAction(action);
  }

  /**
   * Zoomt op de kaart naar de bounding box.
   *
   * @param {Number[]} boundingbox
   * @param {Number} max
   */
  zoomTo(boundingbox, max) {
    this._map.zoomToExtent(boundingbox, max);
  }

  /**
   * Registreer kaart event.
   *
   * @param {*} event
   * @param {*} callback
   */
  on(event, callback) {
    this._map.on(event, callback);
  }

  /**
   * Render de kaart opnieuw.
   */
  rerender() {
    this._map.render();
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
    return new OlLayerGroup({
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
