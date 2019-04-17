import { VlMapBaseLayer } from "./vl-map-baselayer.js";

/**
 * VlMapBaseLayerGRBOrtho
 * @class
 * @classdesc De kaart basis laag component voor GRB ortho. <a href="demo/vl-map.html">Demo</a>.
 * 
 * @extends VlElement
 */
export class VlMapBaseLayerGRBOrtho extends VlMapBaseLayer {
    constructor() {
        super();
        this.setAttribute('url', 'https://tile.informatievlaanderen.be/ws/raadpleegdiensten/wmts');
        this.setAttribute('layer', 'omwrgbmrvl');
        this.setAttribute('title', 'GRB ortho laag');
    }
}