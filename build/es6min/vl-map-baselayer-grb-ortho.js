import {VlMapBaseLayer} from '/node_modules/vl-ui-map/build/es6min/vl-map-baselayer.js'; export class VlMapBaseLayerGRBOrtho extends VlMapBaseLayer {
  constructor() {
    super(), this.setAttribute('url', 'https://tile.informatievlaanderen.be/ws/raadpleegdiensten/wmts'), this.setAttribute('layer', 'omwrgbmrvl'), this.setAttribute('title', 'GRB ortho laag');
  }
}
