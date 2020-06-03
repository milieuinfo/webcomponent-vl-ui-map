const VlMapLayer = require('../components/vl-map-layer');
const {Page, Config} = require('vl-ui-core').Test;

class VlMapLayerPage extends Page {
  async _getLayer(selector) {
    return new VlMapLayer(this.driver, selector);
  }

  async getStandaardLayer() {
    return this._getLayer('#standaard-layer');
  }

  async getClusteredLayer() {
    return this._getLayer('#clustered-layer');
  }

  async getAutoExtentLayer() {
    return this._getLayer('#auto-extent-layer');
  }

  async load() {
    await super.load(Config.baseUrl + '/demo/vl-map-layer.html');
  }
}

module.exports = VlMapLayerPage;
