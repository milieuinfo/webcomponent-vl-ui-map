const VlMap = require('../components/vl-map');
const {Page, Config} = require('vl-ui-core').Test;

class VlMapFeaturesLayerPage extends Page {
  async getMapWithStandardLayer() {
    return this._getMap('#map-with-wmts-layer');
  }

  async load() {
    await super.load(Config.baseUrl + '/demo/vl-map-wmts-layer.html');
  }

  async _getMap(selector) {
    return new VlMap(this.driver, selector);
  }
}

module.exports = VlMapFeaturesLayerPage;
