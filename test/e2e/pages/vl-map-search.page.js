const VlMapSearch = require('../components/vl-map-search');
const {Config} = require('vl-ui-core').Test;
const {By} = require('vl-ui-core').Test.Setup;
const VlMapPage = require('./vl-map.page');

class VlMapSearchPage extends VlMapPage {
  async getMap() {
    return this._getMap('#map-with-search');
  }

  async getBindMap() {
    return this._getMap('#bind-map');
  }

  async getBindMapSearch() {
    return this._getSearch('#bind-map-search');
  }

  async clickBindMapButton() {
    const button = await this.driver.findElement(By.css('#bind-map-button'));
    await button.click();
  }

  async load() {
    await super.load(Config.baseUrl + '/demo/vl-map-search.html');
  }

  async _getSearch(selector) {
    return new VlMapSearch(this.driver, selector);
  }
}

module.exports = VlMapSearchPage;
