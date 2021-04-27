import {define} from 'vl-ui-core';
import {VlMapWmsLayer} from '../dist/vl-map-wms-layer.src.js';
import {
  OlTileWMSSource,
  OlTileLayer,
} from 'vl-mapactions/dist/vl-mapactions.js';
import '../dist/vl-map-wms-style.src.js';

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
    super(OlTileLayer, OlTileWMSSource);
  }
}

customElements.whenDefined('vl-map-wms-style').then(() => {
  define('vl-map-tiled-wms-layer', VlMapTiledWmsLayer);
});

