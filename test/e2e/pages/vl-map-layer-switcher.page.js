const {Config} = require('vl-ui-core').Test;
const VlMapPage = require('./vl-map.page');

class VlMapLayerSwitcherPage extends VlMapPage {
  async getMapWithLayerSwitcher() {
    return this._getMap('#map-with-layer-switcher');
  }

  async getMapWithCustomLayerSwitcher() {
    return this._getMap('#map-with-custom-layer-switcher');
  }

  async getMapWithResolutionLayerSwitcher() {
    return this._getMap('#map-with-resolution-layer-switcher');
  }
  
  async getMapWithWfsLayerAndSwitcher() {
    return this._getMap('#map-with-wfs-layer-and-switcher');
  }
  
  async getMapWithWmsLayerAndSwitcher() {
    return this._getMap('#map-with-tiled-wms-layer-and-switcher');
  }
  
  async getMapWithWmtsLayerAndSwitcher() {
    return this._getMap('#map-with-wmts-layer-and-switcher');
  }

  async load() {
    await super.load(Config.baseUrl + '/demo/vl-map-layer-switcher.html');
  }
}

module.exports = VlMapLayerSwitcherPage;
