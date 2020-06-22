const {VlElement} = require('vl-ui-core').Test;
const {VlSelect} = require('vl-ui-select').Test;
const {By} = require('vl-ui-core').Test.Setup;

class VlMapSearch extends VlElement {
  async _getSearch() {
    await this.driver.wait(async () => {
      return await this.shadowRoot;
    });
    return this.shadowRoot;
  }

  async _getSelect() {
    const search = await this._getSearch();
    const select = await search.findElement(By.css('select[is="vl-select"]'));
    return new VlSelect(this.driver, select);
  }

  async open() {
    const select = await this._getSelect();
    await select.open();
  }

  async search(text) {
    const search = await this._getSearch();
    const input = await search.findElement(By.css('.vl-select__list > input'));
    await this.driver.executeScript(`arguments[0].focus()`, input);
    await this.driver.executeScript(`arguments[0].value='${text}'`, input);
    await this.driver.executeScript(`arguments[0].dispatchEvent(new CustomEvent('keyup', {composed: true, bubbles: true}))`, input);
    await this._waitForValues();
  }

  async _waitForValues() {
    const select = await this._getSelect();
    await this.driver.wait(async () => {
      return (await this.hasNoResults());
    });
    const values = await select.values();
    return values.filter((value) => value != null).length > 0;
  }

  async hasNoResults() {
    const search = await this._getSearch();
    const html = await search.getInnerHTML();
    console.log(html);
    try {
      return !!(await search.findElement(By.css('.has-no-results')));
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
}

module.exports = VlMapSearch;
