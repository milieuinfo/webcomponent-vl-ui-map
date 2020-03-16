const VlMapLayer = require('../components/vl-map-layer');
const { Page, Config } = require('vl-ui-core').Test;

class VlMapCircleStylePage extends Page {

    async _getLayer(selector) {
        return new VlMapLayer(this.driver, selector);
    }

    async getStandaardLayer() {
        return this._getLayer('#map-standaard-layer');
    }

    async getAangepasteCircleStyleLayer() {
        return this._getLayer('#map-aangepast-layer');
    }
    
    async load() {
        await super.load(Config.baseUrl + '/demo/vl-map-circle-style.html');
    }
}

module.exports = VlMapCircleStylePage;
