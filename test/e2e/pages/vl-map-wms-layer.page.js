const {Config} = require('vl-ui-core').Test;
const VlMapPage = require('./vl-map.page');

class VlMapWmsLayerPage extends VlMapPage {
  async getMapWithTiledWmsLayer() {
    return this._getMap('#map-with-tiled-wms-layer');
  }

  async getMapWithImageWmsLayer() {
    return this._getMap('#map-with-image-wms-layer');
  }

  async load() {
    await super.load(Config.baseUrl + '/demo/vl-map-wms-layer.html');
  }
}

module.exports = VlMapWmsLayerPage;
