import {define} from '/node_modules/vl-ui-core/dist/vl-core.js';
import {VlMapWmsLayer} from '/node_modules/vl-ui-map/dist/vl-map-wms-layer.js';
import {
  OlImageLayer,
  OlImageWMSSource,
} from '/node_modules/vl-mapactions/dist/vl-mapactions.js';
import '/node_modules/vl-ui-map/dist/vl-map-wms-style.js';

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
    super(OlImageLayer, OlImageWMSSource);
  }
}

customElements.whenDefined('vl-map-wms-style').then(() => {
  define('vl-map-image-wms-layer', VlMapImageWmsLayer);
});
