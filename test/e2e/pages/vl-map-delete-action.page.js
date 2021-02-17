const VlMapDeleteAction = require('../components/vl-map-delete-action');
const {Config} = require('vl-ui-core').Test;
const VlMapPage = require('./vl-map.page');

class VlMapDeleteActionPage extends VlMapPage {
  async getDeleteAction() {
    return this._getDeleteAction('#delete-action');
  }

  async getMap() {
    return this._getMap('#map-with-delete-action');
  }

  async load() {
    await super.load(Config.baseUrl + '/demo/vl-map-delete-action.html');
  }

  async _getDeleteAction(selector) {
    return new VlMapDeleteAction(this.driver, selector);
  }

  async _getLayer(LayerClass, selector) {
    return new LayerClass(this.driver, selector);
  }
}

module.exports = VlMapDeleteActionPage;
