import {define} from 'vl-ui-core';
import {VlMapLayer} from '../dist/vl-map-layer.src.js';
import {OlWMTSSource, OlWMTSTileGrid, OlTileLayer, OlExtent} from 'vl-mapactions/dist/vl-mapactions.js';
/**
 * VlMapWmtsLayer
 *
 * @class
 * @classdesc Een WMTS (overlay) layer
 *
 * @extends VlMapLayer
 *
 * @see {@link https://www.github.com/milieuinfo/webcomponent-vl-ui-map/releases/latest|Release notes}
 * @see {@link https://www.github.com/milieuinfo/webcomponent-vl-ui-map/issues|Issues}
 * @see {@link https://webcomponenten.omgeving.vlaanderen.be/demo/vl-map-wmts-layer.html|Demo}
 */
export class VlMapWmtsLayer extends VlMapLayer {
  connectedCallback() {
    super.connectedCallback();
    this._source = this.__createSource();
    this._layer = this._createLayer();
  }

  get _projection() {
    if (this.parentNode) {
      return this.parentNode._projection;
    }
  }

  get url() {
    const url = this.getAttribute('data-vl-url');
    if (!url) {
      throw new Error('URL not defined');
    }
    return url;
  }

  get _wmtsLayer() {
    const layer = this.getAttribute('data-vl-layer');
    if (!layer) {
      throw new Error('Layer not defined');
    }
    return layer;
  }

  _createLayer() {
    const layer = new OlTileLayer({
      title: this._name,
      source: this._source,
      minResolution: this._minResolution,
      maxResolution: this._maxResolution,
    });
    layer.set('id', VlMapLayer._counter);
    return layer;
  }

  __createSource() {
    const tileLimits = this.__grbTileLimits;
    return new OlWMTSSource({
      url: this.url,
      layer: this._wmtsLayer,
      matrixSet: this.__grbMatrixSet,
      format: this.__wmtsFormat,
      projection: this._projection,
      tileGrid: new OlWMTSTileGrid({
        extent: this._projection.getExtent(),
        origin: OlExtent.getTopLeft(this._projection.getExtent()),
        resolutions: tileLimits.resolutions,
        matrixIds: tileLimits.matrixIds,
      }),
      style: '',
    });
  }

  get __wmtsFormat() {
    return 'image/png';
  }

  get __grbMatrixSet() {
    return 'BPL72VL';
  }

  get __grbTileLimits() {
    const size = OlExtent.getWidth(this._projection.getExtent()) / 256;
    const resolutions = new Array(16);
    const matrixIds = new Array(16);
    for (let z = 0; z < 16; ++z) {
      resolutions[z] = size / Math.pow(2, z);
      matrixIds[z] = z;
    }
    return {matrixIds, resolutions};
  }
}

define('vl-map-wmts-layer', VlMapWmtsLayer);

