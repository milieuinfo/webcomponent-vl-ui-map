import {VlMapBaseLayer} from '/node_modules/vl-ui-map/build/es6min/vl-map-baselayer.js'; export class VlMapBaseLayerGRB extends VlMapBaseLayer {
  constructor() {
    super(), this.setAttribute('url', 'https://tile.informatievlaanderen.be/ws/raadpleegdiensten/wmts'), this.setAttribute('layer', 'grb_bsk'), this.setAttribute('title', 'GRB basis laag');
  }
}
