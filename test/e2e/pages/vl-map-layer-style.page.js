const VlMapLayerStyle = require('../components/vl-map-layer-style');
const {Page, Config} = require('vl-ui-core').Test;

class VlMapLayerStylePage extends Page {
  async getStandardStyle() {
    return this._getStyle('#map-standard-style');
  }

  async getLabelStyle() {
    return this._getStyle('#map-label-style');
  }

  async getAdjustedStyle() {
    return this._getStyle('#map-adjusted-style');
  }

  async getStyleRedFromLayerWithMultipleStyles() {
    return this._getStyle('#map-layer-style-red');
  }

  async getStyleGreenFromLayerWithMultipleStyles() {
    return this._getStyle('#map-layer-style-green');
  }

  async load() {
    await super.load(Config.baseUrl + '/demo/vl-map-layer-style.html');
  }

  async _getStyle(selector) {
    return new VlMapLayerStyle(this.driver, selector);
  }
}

module.exports = VlMapLayerStylePage;
