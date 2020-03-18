const VlMap = require('../components/vl-map');
const { Page, Config } = require('vl-ui-core').Test;
const { By } = require('vl-ui-core').Test.Setup;

class VlMapSearchPage extends Page {

    async _getMap(selector) {
        return new VlMap(this.driver, selector);
    }

    async getMap() {
        return this._getMap('#map-with-search');
    }

    async getBindMap() {
        return this._getMap('#bind-map');
    }

    async clickBindMapButton() {
        const button = await this.driver.findElement(By.css('#bind-map-button'));
        await button.click();
    }
    
    async load() {
        await super.load(Config.baseUrl + '/demo/vl-map-search.html');
    }
}

module.exports = VlMapSearchPage;
