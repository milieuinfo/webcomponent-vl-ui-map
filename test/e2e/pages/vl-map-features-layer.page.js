const {Config} = require('vl-ui-core').Test;
const VlMapPage = require('./vl-map.page');

class VlMapFeaturesLayerPage extends VlMapPage {
  async getMapWithStandardLayer() {
    return this._getMap('#map-with-standard-layer');
  }

  async getMapWithClusteredLayer() {
    return this._getMap('#map-with-clustered-layer');
  }

  async getMapWithAutoExtentLayer() {
    return this._getMap('#map-with-auto-extent-layer');
  }

  async load() {
    await super.load(Config.baseUrl + '/demo/vl-map-features-layer.html');
  }
}

module.exports = VlMapFeaturesLayerPage;
