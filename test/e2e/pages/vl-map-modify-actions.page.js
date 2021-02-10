const VlMapModifyAction = require('../components/vl-map-modify-action');

const VlMap = require('../components/vl-map');
const {Page, Config} = require('vl-ui-core').Test;

class VlMapModifyActionsPage extends Page {
  
  async getMapWithModifyPointAction() {
    return new VlMap(this.driver, '#map-with-modify-point-action');
  }
  
  async getMapWithModifyLineAction() {
    return new VlMap(this.driver, '#map-with-modify-line-action');
  }
  
  async getMapWithModifyPolygonAction() {
    return new VlMap(this.driver, '#map-with-modify-polygon-action');
  }
  
  async load() {
    await super.load(Config.baseUrl + '/demo/vl-map-modify-actions.html');
  }
  
  async getModifyPointAction() {
    return new VlMapModifyAction(this.driver, '#modify-point-action');
  }
  
  async getModifyLineAction() {
    return new VlMapModifyAction(this.driver, '#modify-line-action');
  }
  
  async getModifyPolygonAction() {
    return new VlMapModifyAction(this.driver, '#modify-polygon-action');
  }
}

module.exports = VlMapModifyActionsPage;
