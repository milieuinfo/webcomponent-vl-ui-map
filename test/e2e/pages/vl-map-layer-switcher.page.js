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

  async load() {
    await super.load(Config.baseUrl + '/demo/vl-map-layer-switcher.html');
  }
}

module.exports = VlMapLayerSwitcherPage;
