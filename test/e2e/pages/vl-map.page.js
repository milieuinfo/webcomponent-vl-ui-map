const VlMap = require('../components/vl-map');
const { Page, Config } = require('vl-ui-core').Test;

class VlMapPage extends Page {
    async _getMap(selector) {
        return new VlMap(this.driver, selector);
    }

    async load() {
        await super.load(Config.baseUrl + '/demo/vl-map.html');
    }
}

module.exports = VlMapPage;
