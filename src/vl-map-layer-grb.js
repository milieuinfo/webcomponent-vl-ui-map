import { VlMapLayer } from "./vl-map-layer.js";

/**
 * VlMapLayerGRB
 * @class
 * @classdesc De kaart layer component voor GRB. <a href="demo/vl-map.html">Demo</a>.
 * 
 * @extends VlElement
 */
export class VlMapLayerGRB extends VlMapLayer {
    constructor() {
        super();
        this.setAttribute('url', 'https://tile.informatievlaanderen.be/ws/raadpleegdiensten/wmts');
        this.setAttribute('layer', 'grb_bsk');
        this.setAttribute('title', 'GRB basis laag');
    }
}