const VlMap = require('../components/vl-map');
const VlMapBaseLayer = require('../components/vl-map-baselayer');
const {Page, Config} = require('vl-ui-core').Test;

class VlMapPage extends Page {
  async getBaseLayerGrbGray() {
    return this._getBaseLayer('#baselayer-grb-gray');
  }

  async getBaseLayerGrb() {
    return this._getBaseLayer('#baselayer-grb');
  }

  async getMap() {
    return this._getMap('#map');
  }

  async getMapWithoutEscape() {
    return this._getMap('#map-escape');
  }

  async getMapWithoutRotation() {
    return this._getMap('#map-rotation');
  }

  async getMapWithoutMouseZoom() {
    return this._getMap('#map-mouse-zoom');
  }

  async getMapWithFullscreenAllowed() {
    return this._getMap('#map-fullscreen');
  }

  async load() {
    await super.load(Config.baseUrl + '/demo/vl-map.html');
  }

  async _getMap(selector) {
    return new VlMap(this.driver, selector);
  }

  async _getBaseLayer(selector) {
    return new VlMapBaseLayer(this.driver, selector);
  }
}

module.exports = VlMapPage;
