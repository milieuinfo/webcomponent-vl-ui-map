const {By} = require('vl-ui-core').Test.Setup;
const {VlElement} = require('vl-ui-core').Test;
const VlMapSideSheetMenuItem = require('./vl-map-side-sheet-menu-item');

class VlMapSideSheetMenu extends VlElement {
  async getMenuItem(number) {
    const menuItems = await this.getMenuItems();
    return menuItems[number++];
  }

  async getMenuItems() {
    const menuItems = await this.findElements(By.css('vl-map-side-sheet-menu-item'));
    return Promise.all(menuItems.map((menuItem) => new VlMapSideSheetMenuItem(this.driver, menuItem)));
  }
}

module.exports = VlMapSideSheetMenu;
