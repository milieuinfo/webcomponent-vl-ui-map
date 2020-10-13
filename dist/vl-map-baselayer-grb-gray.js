import {VlMapBaseLayer} from './vl-map-baselayer.js';

/**
 * VlMapBaseLayerGRBGray
 * @class
 * @classdesc De kaart basis laag component voor GRB grijstinten.
 *
 * @extends vlElement
 *
 * @see {@link https://www.github.com/milieuinfo/webcomponent-vl-ui-map/releases/latest|Release notes}
 * @see {@link https://www.github.com/milieuinfo/webcomponent-vl-ui-map/issues|Issues}
 * @see {@link https://webcomponenten.omgeving.vlaanderen.be/demo/vl-map.html|Demo}
 */
export class VlMapBaseLayerGRBGray extends VlMapBaseLayer {
  constructor() {
    super();
    this.setAttribute('url', 'https://tile.informatievlaanderen.be/ws/raadpleegdiensten/wmts');
    this.setAttribute('layer', 'grb_bsk_grijs');
    this.setAttribute('title', 'GRB basis laag grijs');
  }
}
