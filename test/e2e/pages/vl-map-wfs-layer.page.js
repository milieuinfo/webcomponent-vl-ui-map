const VlMap = require('../components/vl-map');
const {Page, Config} = require('vl-ui-core').Test;

class VlMapWfsLayerPage extends Page {
  async getMapWithStandardLayer() {
    return this._getMap('#map-with-wfs-layer');
  }

  async load() {
    await super.load(Config.baseUrl + '/demo/vl-map-wfs-layer.html');
  }

  async _getMap(selector) {
    return new VlMap(this.driver, selector);
  }
}

module.exports = VlMapWfsLayerPage;
