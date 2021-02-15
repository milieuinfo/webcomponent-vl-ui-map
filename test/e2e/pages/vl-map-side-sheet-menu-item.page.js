const {Config} = require('vl-ui-core').Test;
const VlMapPage = require('./vl-map.page');

class VlMapSideSheetMenuItemPage extends VlMapPage {
  async getMap() {
    return this._getMap('#vl-map-side-sheet-map');
  }

  async load() {
    await super.load(Config.baseUrl + '/demo/vl-map-side-sheet.html');
  }
}

module.exports = VlMapSideSheetMenuItemPage;
