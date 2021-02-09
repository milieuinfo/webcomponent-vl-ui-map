const {VlSideSheet} = require('vl-ui-side-sheet').Test;
const {By} = require('vl-ui-core').Test.Setup;
const VlMapSideSheetMenuItem = require('./vl-map-side-sheet-menu-item');

class VlMapSideSheet extends VlSideSheet {
  async getMenuItem() {
    const menuItem = await this.findElement(By.css('vl-map-side-sheet-menu-item'));
    return new VlMapSideSheetMenuItem(this.driver, menuItem);
  }
}

module.exports = VlMapSideSheet;
