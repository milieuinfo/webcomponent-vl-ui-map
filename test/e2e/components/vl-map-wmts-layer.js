const VlMapLayer = require('./vl-map-layer');

class VlMapWmtsLayer extends VlMapLayer {
  async getUrl() {
    return this.getAttribute('url');
  }

  static get TAG() {
    return 'vl-map-wmts-layer';
  }
}

module.exports = VlMapWmtsLayer;
