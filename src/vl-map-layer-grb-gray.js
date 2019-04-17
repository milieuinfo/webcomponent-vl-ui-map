import { VlMapLayer } from "./vl-map-layer.js";

/**
 * VlMapLayerGRBGray
 * @class
 * @classdesc De kaart layer component voor GRB grijstinten. <a href="demo/vl-map.html">Demo</a>.
 *
 * @extends VlElement
 */
export class VlMapLayerGRBGray extends VlMapLayer {
    constructor() {
        super();
        this.url = 'https://tile.informatievlaanderen.be/ws/raadpleegdiensten/wmts';
        this.layer = 'grb_bsk_grijs';
        this.title = 'GRB basis laag grijs';
    }
}