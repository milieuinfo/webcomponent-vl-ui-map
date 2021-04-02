const {Config} = require('vl-ui-core').Test;
const VlMapPage = require('./vl-map.page');
class VlMapWfsLayerPage extends VlMapPage {
  async getMapWithStandardLayer() {
    return this._getMap('#map-with-wfs-layer');
  }

  async load() {
    await super.load(Config.baseUrl + '/demo/vl-map-wfs-layer.html');
  }
}

module.exports = VlMapWfsLayerPage;
