const VlMap = require('../components/vl-map');
const {Page, Config} = require('vl-ui-core').Test;

class VlMapLayerSwitcherPage extends Page {
  async getMap() {
    return new VlMap(this.driver, '#map-with-layer-switcher');
  }

  async load() {
    await super.load(Config.baseUrl + '/demo/vl-map-layer-switcher.html');
  }
}

module.exports = VlMapLayerSwitcherPage;