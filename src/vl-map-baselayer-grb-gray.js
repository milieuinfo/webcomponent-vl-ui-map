import { VlMapBaseLayer } from "./vl-map-baselayer.js";

/**
 * VlMapBaseLayerGRBGray
 * @class
 * @classdesc De kaart basis laag component voor GRB grijstinten. <a href="demo/vl-map.html">Demo</a>.
 *
 * @extends VlElement
 * 
 *  @version <a href="http://www.github.com/milieuinfo/webcomponent-vl-ui-map/releases/latest">Release notes</a>
 */
export class VlMapBaseLayerGRBGray extends VlMapBaseLayer {
    constructor() {
        super();
        this.setAttribute('url', 'https://tile.informatievlaanderen.be/ws/raadpleegdiensten/wmts');
        this.setAttribute('layer', 'grb_bsk_grijs');
        this.setAttribute('title', 'GRB basis laag grijs');
    }
}
