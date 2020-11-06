const VlMapDrawAction = require('../components/vl-map-draw-action');
const VlMap = require('../components/vl-map');
const {Page, Config} = require('vl-ui-core').Test;

class VlMapDrawActionPage extends Page {
  async getMapWithDrawAction() {
    return new VlMap(this.driver, '#map-with-draw-action');
  }

  async getDrawAction() {
    return new VlMapDrawAction(this.driver, '#draw-action');
  }

  async load() {
    await super.load(Config.baseUrl + '/demo/vl-map-draw-action.html');
  }
}

module.exports = VlMapDrawActionPage;
