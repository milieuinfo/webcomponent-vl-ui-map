const VlMap = require('../components/vl-map');
const {Page, Config} = require('vl-ui-core').Test;

class VlMapWmsLayerPage extends Page {
  async getMapWithStandardLayer() {
    return this._getMap('#map-with-wms-layer');
  }

  async load() {
    await super.load(Config.baseUrl + '/demo/vl-map-wms-layer.html');
  }

  async _getMap(selector) {
    return new VlMap(this.driver, selector);
  }
}

module.exports = VlMapWmsLayerPage;
