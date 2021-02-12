const {Config} = require('vl-ui-core').Test;
const VlMapPage = require('./vl-map.page');

class VlMapOverviewMapPage extends VlMapPage {
  async getMap() {
    return this._getMap('#map');
  }

  async load() {
    await super.load(Config.baseUrl + '/demo/vl-map-overview-map.html');
  }
}

module.exports = VlMapOverviewMapPage;
