const VlMapLayerCircleStyle = require('../components/vl-map-layer-circle-style');
const {Config} = require('vl-ui-core').Test;
const {By} = require('vl-ui-core').Test.Setup;
const VlMapPage = require('./vl-map.page');

class VlMapCircleStylePage extends VlMapPage {
  async getStandardMap() {
    return this._getMap('#map-standard');
  }

  async getModifiedMap() {
    return this._getMap('#map-modified');
  }

  async getLayerCircleStyle(map) {
    const styles = await this.getLayerCircleStyles(map);
    return styles[0];
  }

  async getLayerCircleStyles(map) {
    const styles = await map.findElements(By.css('vl-map-layer-circle-style'));
    return Promise.all(styles.map((style) => new VlMapLayerCircleStyle(this.driver, style)));
  }

  async load() {
    await super.load(Config.baseUrl + '/demo/vl-map-circle-style.html');
  }
}

module.exports = VlMapCircleStylePage;
