import {define, vlElement} from '/node_modules/vl-ui-core/dist/vl-core.js';
import {
  OlGeoJSON,
  OlLoadingstrategy,
  OlStyle,
  OlStyleFill,
  OlStyleStroke,
  OlTileLayer,
  OlVectorLayer,
  OlVectorSource,
  OlWMTSSource,
  OlExtent,
  OlWMTSTileGrid,
} from '/node_modules/vl-mapactions/dist/vl-mapactions.js';

/**
 * VlMapBaseLayer
 * @class
 * @classdesc De kaart basis laag component.
 *
 * @extends HTMLElement
 * @mixes vlElement
 *
 * @property {(wmts | wfs )} data-vl-type - Attribuut wordt gebruikt om aan te geven wat het type is van de kaartlaag.
 * @property {string} data-vl-url - Attribuut geeft aan via welke URL gebruikt wordt om de kaartlaag op te halen.
 * @property {string} data-vl-layer - Attribuut geeft aan wat de kaartlaag identifier is.
 * @property {string} data-vl-title - Attribuut bepaalt de titel van de kaartlaag.
 *
 * @see {@link https://www.github.com/milieuinfo/webcomponent-vl-ui-map/releases/latest|Release notes}
 * @see {@link https://www.github.com/milieuinfo/webcomponent-vl-ui-map/issues|Issues}
 * @see {@link https://webcomponenten.omgeving.vlaanderen.be/demo/vl-map.html|Demo}
 */
export class VlMapBaseLayer extends vlElement(HTMLElement) {
  async connectedCallback() {
    await this._configureMap();
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

  _WMTSSource() {
    this._wmtsSource = this._wmtsSource || this._createWMTSSource();
    return this._wmtsSource;
  }

  get _vectorSource() {
    this._createdVectorSource = this._createdVectorSource || this._createVectorSource();
    return this._createdVectorSource;
  }

  async _configureMap() {
    if (this._map) {
      this._map.addBaseLayerAndOverlayMapLayer(this._createBaseLayer(), this._createBaseLayer());
      // nodig anders is map initially blanc
      this._map.render();
    }
  }

  _createWMTSSource() {
    const size = OlExtent.getWidth(this._projection.getExtent()) / 256;
    const resolutions = new Array(16);
    const matrixIds = new Array(16);
    for (let z = 0; z < 16; ++z) {
      resolutions[z] = size / Math.pow(2, z);
      matrixIds[z] = z;
    }

    return new OlWMTSSource({
      url: this.url,
      layer: this.layer,
      matrixSet: 'BPL72VL',
      format: 'image/png',
      projection: this._projection,
      tileGrid: new OlWMTSTileGrid({
        extent: this._projection.getExtent(),
        origin: OlExtent.getTopLeft(this._projection.getExtent()),
        resolutions: resolutions,
        matrixIds: matrixIds,
      }),
      style: '',
    });
  }

  _createVectorSource() {
    const self = this;
    return new OlVectorSource({
      format: new OlGeoJSON({
        dataProjection: self._projection,
      }),
      url: function() {
        return self.url + '&typeName=' + self.layer;
      },
      strategy: OlLoadingstrategy.bbox,
    });
  }

  _createBaseLayer() {
    switch (this.type) {
      case 'wmts':
        return new OlTileLayer({
          title: this.title,
          type: 'base',
          source: this._WMTSSource(),
        });
      case 'wfs':
        return new OlVectorLayer({
          source: this._vectorSource,
          style: new OlStyle({
            stroke: new OlStyleStroke({
              color: 'rgba(0, 0, 0, 1.0)',
              width: 1,
            }),
            fill: new OlStyleFill({
              color: 'rgba(255, 0, 0, 1.0)',
            }),
          }),
        });
    }
  }
}

define('vl-map-baselayer', VlMapBaseLayer);
