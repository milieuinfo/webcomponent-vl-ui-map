import {VlMapLayer} from '/src/vl-map-layer.js';
import {VlMapWmsLayer} from '/src/vl-map-wms-layer.js';
import {
  OlImageLayer,
  OlImageWMSSource,
} from '/node_modules/vl-mapactions/dist/vl-mapactions.js';

/**
 * VlMapImageWmsLayer
 * @class
 * @classdesc Deze kaartlaag staat toe om een WMS laag aan te maken waarbij de bevraging telkens met één afbeelding gebeurt.
 *
 * @extends VlMapWmsLayer
 *
 * @see {@link https://www.github.com/milieuinfo/webcomponent-vl-ui-map/releases/latest|Release notes}
 * @see {@link https://www.github.com/milieuinfo/webcomponent-vl-ui-map/issues|Issues}
 * @see {@link https://webcomponenten.omgeving.vlaanderen.be/demo/vl-map-wms-layer.html|Demo}
 */
export class VlMapImageWmsLayer extends VlMapWmsLayer {
  constructor() {
    super();
    this._source = this.__createSource();
    this._layer = this.__createLayer();
  }

  __createLayer() {
    const layer = new OlImageLayer(this._createLayerConfig(this._source));
    layer.set('id', VlMapLayer._counter);
    return layer;
  }

  __createSource() {
    return new OlImageWMSSource(this._sourceConfig);
  }
}
