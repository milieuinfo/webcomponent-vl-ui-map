import {VlMapLayer} from '/src/vl-map-layer.js';
import {
  OlImageLayer,
  OlImageWMSSource,
  OlTileWMSSource,
  OlTileLayer,
} from '/node_modules/vl-mapactions/dist/vl-mapactions.js';

/**
 * VlMapWmsLayer
 * @class
 * @classdesc Deze kaartlaag staat toe om een WMS laag aan te maken.
 *
 * @extends VlMapLayer
 *
 * @property {string} data-vl-name - Attribuut bepaalt de kaartlaag naam.
 * @property {string} data-vl-url - Attribuut bepaalt de WMS url. Verplicht.
 * @property {string} data-vl-layers - Attribuut bepaalt de layers van de WMS. Verplicht.
 * @property {string} [data-vl-styles=] - Attribuut bepaalt de WMS stijlen.
 * @property {string} [data-vl-version=1.3.0] - Attribuut bepaalt de WMS versie.
 * @property {number} [data-vl-opacity=1] - Attribuut bepaalt de WMS transparantie.
 * @property {boolean} [data-vl-tiled=true] - Attribuut bepaalt of de WMS tiled wordt opgehaald.
 *
 * @see {@link https://www.github.com/milieuinfo/webcomponent-vl-ui-map/releases/latest|Release notes}
 * @see {@link https://www.github.com/milieuinfo/webcomponent-vl-ui-map/issues|Issues}
 * @see {@link https://webcomponenten.omgeving.vlaanderen.be/demo/vl-map-wms-layer.html|Demo}
 */
export class VlMapWmsLayer extends VlMapLayer {

  get _url() {
    return this.getAttribute('data-vl-url') || console.error('url not defined');
  }

  get _layers() {
    return this.getAttribute('data-vl-layers') || console.error('layers not defined');
  }

  get _styles() {
    return this.getAttribute('data-vl-styles') || '';
  }

  get _version() {
    return this.getAttribute('data-vl-version') || '1.3.0';
  }

  get _opacity() {
    return this.getAttribute('data-vl-opacity') || 1;
  }

  get _tiled() {
    return this.getAttribute('data-vl-tiled') !== "false";
  }

  constructor() {
    super();
    this._source = this.__createSource();
    this._layer = this.__createLayer();
  }

  async connectedCallback() {
    await super.connectedCallback();
  }

  __createLayer() {
    const layerConfig = {
      title: this._name,
      source: this._source,
      opacity: this._opacity,
      minResolution: this._minResolution,
      maxResolution: this._maxResolution,
    }
    let layer;
    if (this._tiled) {
      layer = new OlTileLayer(layerConfig);
    } else {
      layer = new OlImageLayer(layerConfig);
    }
    layer.set('id', VlMapLayer._counter);
    return layer;
  }

  __createSource() {
    const sourceConfig = {
      url: this._url,
      params: {
        'LAYERS': this._layers,
        'STYLES': this._styles,
        'VERSION': this._version,
      },
    }
    if (this._tiled) {
      return new OlTileWMSSource(sourceConfig);
    } else {
      return new OlImageWMSSource(sourceConfig);
    }
  }
}
