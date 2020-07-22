import {vlElement} from '/node_modules/vl-ui-core/dist/vl-core.js';

/**
 * VlMapBaseLayer
 * @class
 * @classdesc De kaart basis laag component.
 *
 * @extends vlElement
 *
 * @property {(wmts | wfs )} type - Attribuut wordt gebruikt om aan te geven wat het type is van de kaartlaag.
 * @property {string} url - Attribuut geeft aan via welke URL gebruikt wordt om de kaartlaag op te halen.
 * @property {string} layer - Attribuut geeft aan wat de kaartlaag identifier is.
 * @property {string} title - Attribuut bepaalt de titel van de kaartlaag.
 *
 * @see {@link https://www.github.com/milieuinfo/webcomponent-vl-ui-map/releases/latest|Release notes}
 * @see {@link https://www.github.com/milieuinfo/webcomponent-vl-ui-map/issues|Issues}
 * @see {@link https://webcomponenten.omgeving.vlaanderen.be/demo/vl-map.html|Demo}
 */
export class VlMapBaseLayer extends vlElement(HTMLElement) {
  connectedCallback() {
    this._configureMap();
  }

  /**
   * Geeft het kaartlaag type terug.
   *
   * @Return {string}
   */
  get type() {
    return this.getAttribute('type') || 'wmts';
  }

  /**
   * Geeft de kaartlaag URL terug.
   *
   * @Return {string}
   */
  get url() {
    return this.getAttribute('url');
  }

  /**
   * Geeft de kaartlaag identifier terug.
   *
   * @Return {string}
   */
  get layer() {
    return this.getAttribute('layer');
  }

  /**
   * Geeft de kaartlaag titel terug.
   *
   * @Return {string}
   */
  get title() {
    return this.getAttribute('title');
  }

  get _map() {
    if (this.parentNode) {
      return this.parentNode.map;
    }
  }

  get _projection() {
    if (this.parentNode) {
      return this.parentNode._projection;
    }
  }

  get _WMTSSource() {
    this._wmtsSource = this._wmtsSource || this._createWMTSSource();
    return this._wmtsSource;
  }

  get _vectorSource() {
    this._createdVectorSource = this._createdVectorSource || this._createVectorSource();
    return this._createdVectorSource;
  }

  _configureMap() {
    if (this._map) {
      this._map.addBaseLayerAndOverlayMapLayer(this._createBaseLayer(), this._createBaseLayer());
    }
  }

  _createWMTSSource() {
    const size = ol.extent.getWidth(this._projection.getExtent()) / 256;
    const resolutions = new Array(16);
    const matrixIds = new Array(16);
    for (let z = 0; z < 16; ++z) {
      resolutions[z] = size / Math.pow(2, z);
      matrixIds[z] = z;
    }

    return new ol.source.WMTS({
      url: this.url,
      layer: this.layer,
      matrixSet: 'BPL72VL',
      format: 'image/png',
      projection: this._projection,
      tileGrid: new ol.tilegrid.WMTS({
        extent: this._projection.getExtent(),
        origin: ol.extent.getTopLeft(this._projection.getExtent()),
        resolutions: resolutions,
        matrixIds: matrixIds,
      }),
      style: '',
    });
  }

  _createVectorSource() {
    const self = this;
    return new ol.source.Vector({
      format: new ol.format.GeoJSON({
        defaultDataProjection: self._projection,
      }),
      url: function() {
        return self.url + '&typeName=' + self.layer;
      },
      strategy: ol.loadingstrategy.bbox,
    });
  }

  _createBaseLayer() {
    switch (this.type) {
      case 'wmts':
        return new ol.layer.Tile({
          title: this.title,
          type: 'base',
          source: this._WMTSSource,
        });
      case 'wfs':
        return new ol.layer.Vector({
          source: this._vectorSource,
          style: new ol.style.Style({
            stroke: new ol.style.Stroke({
              color: 'rgba(0, 0, 0, 1.0)',
              width: 1,
            }),
            fill: new ol.style.Fill({
              color: 'rgba(255, 0, 0, 1.0)',
            }),
          }),
        });
    }
  }
}
