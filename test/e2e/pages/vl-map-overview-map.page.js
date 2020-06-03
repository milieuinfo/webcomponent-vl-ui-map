const VlMap = require('../components/vl-map');
const {Page, Config} = require('vl-ui-core').Test;

class VlMapOverviewMapPage extends Page {
  async getMap() {
    return new VlMap(this.driver, '#map');
  }

  async load() {
    await super.load(Config.baseUrl + '/demo/vl-map-overview-map.html');
  }
}

module.exports = VlMapOverviewMapPage;
