const {VlSideSheet} = require('vl-ui-side-sheet').Test;
const {By} = require('vl-ui-core').Test.Setup;
const VlMapSideSheetMenu = require('./vl-map-side-sheet-menu');

class VlMapSideSheet extends VlSideSheet {
  async getMenu() {
    const menu = await this.findElement(By.css('vl-map-side-sheet-menu'));
    return new VlMapSideSheetMenu(this.driver, menu);
  }
}

module.exports = VlMapSideSheet;
