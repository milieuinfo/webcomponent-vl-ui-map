import {define} from '/node_modules/vl-ui-core/dist/vl-core.js';
import {VlMapWmsLayer} from '/src/vl-map-wms-layer.js';
import {
  OlTileWMSSource,
  OlTileLayer,
} from '/node_modules/vl-mapactions/dist/vl-mapactions.js';

/**
 * VlMapTiledWmsLayer
 * @class
 * @classdesc Deze kaartlaag staat toe om een WMS laag aan te maken.
 *
 * @extends VlMapWmsLayer
 *
 * @see {@link https://www.github.com/milieuinfo/webcomponent-vl-ui-map/releases/latest|Release notes}
 * @see {@link https://www.github.com/milieuinfo/webcomponent-vl-ui-map/issues|Issues}
 * @see {@link https://webcomponenten.omgeving.vlaanderen.be/demo/vl-map-wms-layer.html|Demo}
 */
export class VlMapTiledWmsLayer extends VlMapWmsLayer {
  constructor() {
    super(OlTileLayer, OlTileWMSSource, 'tileloadend');
  }
}

define('vl-map-tiled-wms-layer', VlMapTiledWmsLayer);
