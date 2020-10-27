const {VlElement} = require('vl-ui-core').Test;
const {VlSelect} = require('vl-ui-select').Test;
const {By} = require('vl-ui-core').Test.Setup;

class VlMapSearch extends VlElement {
  async open() {
    const select = await this._getSelect();
    await select.open();
  }

  async search(text) {
    await this.sendText(text);
    await this.dispatchSearchEvent(text);
    await this._waitForValues();
  }

  async sendText(text) {
    const search = await this._getSearch();
    const input = await search.findElement(By.css('.vl-select__list > input'));
    await this.driver.executeScript(`arguments[0].focus()`, input);
    await this.driver.executeScript(`arguments[0].value='${text}'`, input);
    await this.driver.executeScript(`arguments[0].dispatchEvent(new CustomEvent('keyup', {composed: true, bubbles: true}))`, input);
  }

  async dispatchSearchEvent(text) {
    const select = await this._getSelect();
    await this.driver.executeScript(`arguments[0].dispatchEvent(new CustomEvent('search', {detail: {value: '${text}'}}))`, select);
  }

  async hasNoResults() {
    const search = await this._getSearch();
    try {
      await search.findElement(By.css('.vl-select__list > .has-no-results'));
      return true;
    } catch (error) {
      return false;
    }
  }

  async selectByIndex(index) {
    const select = await this._getSelect();
    await select.selectByIndex(index);
  }

  async getSelectedValue() {
    const select = await this._getSelect();
    return this.driver.executeScript(`return arguments[0].value`, select);
  }

  async zoomTo(text) {
    await this.open();
    await this.search(text);
    await this.selectByIndex(0);
  }

  async _getSearch() {
    return this.shadowRoot;
  }

  async _getSelect() {
    const search = await this._getSearch();
    const select = await search.findElement(By.css('select[is="vl-select"]'));
    return new VlSelect(this.driver, select);
  }

  async _waitForValues() {
    const select = await this._getSelect();
    const counter = 0;
    try {
      await this.driver.wait(async () => {
        if (await this.hasNoResults()) {
          counter++;
          if (counter == 5) {
            return true;
          }
        } else {
          const values = await select.values();
          return values.filter((value) => value != null).length > 0;
        }
      }, 3000);
    } catch (error) {}
  }
}

module.exports = VlMapSearch;
