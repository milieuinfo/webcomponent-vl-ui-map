const VlMapLayer = require('./vl-map-layer');

class VlMapWfsLayer extends VlMapLayer {
  async getUrl() {
    return this.getAttribute('url');
  }

  async getLayers() {
    return this.getAttribute('layers');
  }

  static get TAG() {
    return 'vl-map-wfs-layer';
  }
}

module.exports = VlMapWfsLayer;
