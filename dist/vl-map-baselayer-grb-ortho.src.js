import {define} from 'vl-ui-core';
import {VlMapBaseLayer} from '../dist/vl-map-baselayer.src.js';

/**
 * VlMapBaseLayerGRBOrtho
 * @class
 * @classdesc De kaart basis laag component voor GRB ortho.
 *
 * @extends VlMapBaseLayer
 *
 * @see {@link https://www.github.com/milieuinfo/webcomponent-vl-ui-map/releases/latest|Release notes}
 * @see {@link https://www.github.com/milieuinfo/webcomponent-vl-ui-map/issues|Issues}
 * @see {@link https://webcomponenten.omgeving.vlaanderen.be/demo/vl-map.html|Demo}
 */
export class VlMapBaseLayerGRBOrtho extends VlMapBaseLayer {
  constructor() {
    super();
    this.setAttribute('url', 'https://tile.informatievlaanderen.be/ws/raadpleegdiensten/wmts');
    this.setAttribute('layer', 'omwrgbmrvl');
    this.setAttribute('title', 'GRB ortho laag');
  }
}

define('vl-map-baselayer-grb-ortho', VlMapBaseLayerGRBOrtho);

