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
    let counter = 0;
    await this.driver.wait(async () => {
      console.log(++counter);
      let resolved = false;
      const promise = this.driver.executeScript('return arguments[0].ready', map);
      try {
        console.log(promise);
        await this.driver.wait(async () => await promise.then(() => resolved = true));
        console.log(promise);
        console.log(resolved);
        return resolved;
      } catch (error) {
        console.log(error);
        console.log(false);
        return false;
      }
    });
    return map;
  }

  async _getBaseLayer(selector) {
    return new VlMapBaseLayer(this.driver, selector);
  }
}

module.exports = VlMapPage;
