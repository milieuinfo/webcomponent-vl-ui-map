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

  async load(url) {
    await super.load(url || Config.baseUrl + '/demo/vl-map.html');
  }

  async _getMap(selector) {
    const map = await new VlMap(this.driver, selector);
    await this.driver.wait(async () => {
      try {
        await this.driver.wait(this.driver.executeScript('return arguments[0].ready', map), 1000);
        return true;
      } catch (error) {
        return false;
      }
    });
    await map.scrollIntoView();
    return map;
  }

  async _getBaseLayer(selector) {
    return new VlMapBaseLayer(this.driver, selector);
  }
}

module.exports = VlMapPage;
