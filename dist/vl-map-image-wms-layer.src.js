import {define} from 'vl-ui-core';
import {VlMapWmsLayer} from '../dist/vl-map-wms-layer.src.js';
import {
  OlImageLayer,
  OlImageWMSSource,
} from 'vl-mapactions/dist/vl-mapactions.js';

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
    super(OlImageLayer, OlImageWMSSource, 'imageloadend');
  }
}

define('vl-map-image-wms-layer', VlMapImageWmsLayer);

