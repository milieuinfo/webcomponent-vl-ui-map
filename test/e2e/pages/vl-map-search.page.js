const VlMap = require('../components/vl-map');
const { Page, Config } = require('vl-ui-core').Test;

class VlMapSearchPage extends Page {

    async _getMap(selector) {
        return new VlMap(this.driver, selector);
    }

    async getMap() {
        return this._getMap('#map-with-search');
    }
    
    async load() {
        await super.load(Config.baseUrl + '/demo/vl-map-search.html');
    }
}

module.exports = VlMapSearchPage;
