const VlMapLayer = require('./vl-map-layer');

class VlMapWmtsLayer extends VlMapLayer {
  async getUrl() {
    return this.getAttribute('url');
  }

  async getLayer() {
    return this.getAttribute('layer');
  }

  static get TAG() {
    return 'vl-map-wmts-layer';
  }
}

module.exports = VlMapWmtsLayer;
