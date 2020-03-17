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
        console.log(await input.getText());
        debugger;
        await input.sendKeys(text);
    }

    async selectByIndex(index) {
        const select = await this._getSelect();
        await select.selectByIndex(index);
    }
}

module.exports = VlMapSearch;
