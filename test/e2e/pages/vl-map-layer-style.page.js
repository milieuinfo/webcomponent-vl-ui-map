const VlMapLayerStyle = require('../components/vl-map-layer-style');
const {Config} = require('vl-ui-core').Test;
const {By} = require('vl-ui-core').Test.Setup;
const VlMapPage = require('./vl-map.page');

class VlMapLayerStylePage extends VlMapPage {
  async getStandardMap() {
    return this._getMap('#map-standard');
  }

  async getLabelMap() {
    return this._getMap('#map-label');
  }

  async getAdjustedMap() {
    return this._getMap('#map-adjusted');
  }

  async getMultipleStylesMap() {
    return this._getMap('#map-multiple-styles');
  }

  async getLayerStyle(map) {
    const styles = await this.getLayerStyles(map);
    return styles[0];
  }

  async getLayerStyles(map) {
    const styles = await map.findElements(By.css('vl-map-layer-style'));
    return Promise.all(styles.map((style) => new VlMapLayerStyle(this.driver, style)));
  }

  async load() {
    await super.load(Config.baseUrl + '/demo/vl-map-layer-style.html');
  }
}

module.exports = VlMapLayerStylePage;
