const VlMapDrawPointAction = require('../components/vl-map-draw-point-action');
const VlMapDrawLineAction = require('../components/vl-map-draw-line-action');
const VlMap = require('../components/vl-map');
const {Page, Config} = require('vl-ui-core').Test;

class VlMapDrawActionsPage extends Page {
  async getMapWithDrawPointAction() {
    return new VlMap(this.driver, '#map-with-draw-point-action');
  }
  async getMapWithDrawLineAction() {
    return new VlMap(this.driver, '#map-with-draw-line-action');
  }

  async getDrawPointAction() {
    return new VlMapDrawPointAction(this.driver, '#draw-point-action');
  }

  async getDrawLineAction() {
    return new VlMapDrawLineAction(this.driver, '#draw-line-action');
  }

  async load() {
    await super.load(Config.baseUrl + '/demo/vl-map-draw-actions.html');
  }
}

module.exports = VlMapDrawActionsPage;
