import { VlMapLayer } from "./vl-map-layer.js";

/**
 * VlMapLayerGRBOrtho
 * @class
 * @classdesc De kaart layer component voor GRB ortho. <a href="demo/vl-map.html">Demo</a>.
 * 
 * @extends VlElement
 */
export class VlMapLayerGRBOrtho extends VlMapLayer {
    constructor() {
        super();
        this.setAttribute('url', 'https://tile.informatievlaanderen.be/ws/raadpleegdiensten/wmts');
        this.setAttribute('layer', 'omwrgbmrvl');
        this.setAttribute('title', 'GRB ortho laag');
    }
}