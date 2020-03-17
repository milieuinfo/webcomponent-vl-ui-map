const { VlElement } = require('vl-ui-core').Test;
const { VlSelect } = require('vl-ui-select').Test;
const { By } = require('vl-ui-core').Test.Setup;

class VlMapSearch extends VlElement {

    async _getSearch() {
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
        await this.driver.executeScript(`arguments[0].value='${text}'`, input);
        const select = await this._getSelect();
        await this.driver.executeScript(`arguments[0].dispatchEvent(new CustomEvent('search', {detail: {value: '${text}'}}))`, select);
    }

    async selectByIndex(index) {
        const select = await this._getSelect();
        await select.selectByIndex(index);
    }

    async waitForValues() {
        const select = await this._getSelect();
        await this.driver.wait(async () => {
            const values = await select.values();
            return values.filter(value => value != null).length > 0;
        }, 3000);
    }

    async getSelectedValue() {
        const select = await this._getSelect();
        return this.driver.executeScript(`return arguments[0].value`, select);
    }

}

module.exports = VlMapSearch;
