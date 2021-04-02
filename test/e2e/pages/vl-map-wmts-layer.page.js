const {Config} = require('vl-ui-core').Test;
const VlMapPage = require('./vl-map.page');

class VlMapWmtsLayerPage extends VlMapPage {
  async getMapWithStandardLayer() {
    return this._getMap('#map-with-wmts-layer');
  }

  async load() {
    await super.load(Config.baseUrl + '/demo/vl-map-wmts-layer.html');
  }
}

module.exports = VlMapWmtsLayerPage;
