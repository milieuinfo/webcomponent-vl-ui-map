const VlMap = require('../components/vl-map');
const {Page, Config} = require('vl-ui-core').Test;

class VlMapSideSheetMenuPage extends Page {
  async getMap() {
    return this._getMap('#vl-map-side-sheet-map');
  }

  async load() {
    await super.load(Config.baseUrl + '/demo/vl-map-side-sheet.html');
  }

  async _getMap(selector) {
    return new VlMap(this.driver, selector);
  }
}

module.exports = VlMapSideSheetMenuPage;
