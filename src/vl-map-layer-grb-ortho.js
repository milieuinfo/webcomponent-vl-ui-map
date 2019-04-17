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
        this.url = 'https://tile.informatievlaanderen.be/ws/raadpleegdiensten/wmts';
        this.layer = 'omwrgbmrvl';
        this.title = 'GRB ortho laag';
    }
}