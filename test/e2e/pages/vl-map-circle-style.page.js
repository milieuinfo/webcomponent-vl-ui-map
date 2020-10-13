const VlMapLayerCircleStyle = require('../components/vl-map-layer-circle-style');
const {Page, Config} = require('vl-ui-core').Test;

class VlMapCircleStylePage extends Page {
  async getStandardCircleStyle() {
    return this._getStyle('#map-standard-circle-style');
  }

  async getModifiedCircleStyle() {
    return this._getStyle('#map-modified-circle-style');
  }

  async load() {
    await super.load(Config.baseUrl + '/demo/vl-map-circle-style.html');
  }

  async _getStyle(selector) {
    return new VlMapLayerCircleStyle(this.driver, selector);
  }
}

module.exports = VlMapCircleStylePage;
