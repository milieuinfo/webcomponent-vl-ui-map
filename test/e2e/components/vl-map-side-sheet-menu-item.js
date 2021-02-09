const {By} = require('vl-ui-core').Test.Setup;
const {VlElement} = require('vl-ui-core').Test;

class VlMapSideSheetMenuItem extends VlElement {
  async getLink() {
    return this.shadowRoot.findElement(By.css('#vl-map-side-sheet-menu-item-link'));
  }

  async getTitle() {
    const link = await this.getLink();
    return link.getText();
  }

  async getMessagesSlotElements() {
    const slot = await this.shadowRoot.findElement(By.css('slot'));
    return this.getAssignedElements(slot);
  }
}

module.exports = VlMapSideSheetMenuItem;
