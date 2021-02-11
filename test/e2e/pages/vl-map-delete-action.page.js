const VlMapDeleteAction = require('../components/vl-map-delete-action');
const VlMap = require('../components/vl-map');
const VlMapLayer = require('../components/vl-map-layer');
const {Page, Config} = require('vl-ui-core').Test;
const {By} = require('vl-ui-core').Test.Setup;

class VlMapDeleteActionPage extends Page {
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

  async _getLayer(selector) {
    return new VlMapLayer(this.driver, selector);
  }

  async _getMap(selector) {
    return new VlMap(this.driver, selector);
  }
}

module.exports = VlMapDeleteActionPage;
