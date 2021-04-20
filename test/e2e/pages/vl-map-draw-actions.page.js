const VlMapDrawPointAction = require('../components/vl-map-draw-point-action');
const VlMapDrawLineAction = require('../components/vl-map-draw-line-action');
const VlMapDrawPolygonAction = require('../components/vl-map-draw-polygon-action');
const {Config} = require('vl-ui-core').Test;
const VlMapPage = require('./vl-map.page');

class VlMapDrawActionsPage extends VlMapPage {
  async getMapWithDrawPointAction() {
    return this._getMap('#map-with-draw-point-action');
  }

  async getMapWithDrawPointSnapAction() {
    return this._getMap('#map-with-draw-point-snap-action');
  }

  async getMapWithDrawLineAction() {
    return this._getMap('#map-with-draw-line-action');
  }

  async getMapWithDrawPolygonAction() {
    return this._getMap('#map-with-draw-polygon-action');
  }

  async getDrawPointAction() {
    return new VlMapDrawPointAction(this.driver, '#draw-point-action');
  }

  async getDrawPointSnapAction() {
    return new VlMapDrawPointAction(this.driver, '#draw-point-snap-action');
  }

  async getDrawLineAction() {
    return new VlMapDrawLineAction(this.driver, '#draw-line-action');
  }

  async getDrawPolygonAction() {
    return new VlMapDrawPolygonAction(this.driver, '#draw-polygon-action');
  }

  async load() {
    await super.load(Config.baseUrl + '/demo/vl-map-draw-actions.html');
  }
}

module.exports = VlMapDrawActionsPage;
