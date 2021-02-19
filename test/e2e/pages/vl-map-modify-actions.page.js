const VlMapModifyAction = require('../components/vl-map-modify-action');
const VlMapPage = require('./vl-map.page');
const {Config} = require('vl-ui-core').Test;
const {By} = require('vl-ui-core').Test.Setup;

class VlMapModifyActionsPage extends VlMapPage {
  async getMapWithModifyPointAction() {
    return this._getMap('#map-with-modify-point-action');
  }

  async getMapWithModifyLineAction() {
    return this._getMap('#map-with-modify-line-action');
  }

  async getMapWithModifyPolygonAction() {
    return this._getMap('#map-with-modify-polygon-action');
  }

  async getModifyAction(map) {
    const element = await map.findElement(By.css('vl-map-modify-action'));
    return new VlMapModifyAction(this.driver, element);
  }

  async load() {
    await super.load(Config.baseUrl + '/demo/vl-map-modify-actions.html');
  }
}

module.exports = VlMapModifyActionsPage;
