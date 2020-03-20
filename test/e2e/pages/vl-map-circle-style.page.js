const VlMapLayerCircleStyle = require('../components/vl-map-layer-circle-style');
const { Page, Config } = require('vl-ui-core').Test;

class VlMapCircleStylePage extends Page {

    async _getStyle(selector) {
        return new VlMapLayerCircleStyle(this.driver, selector);
    }

    async getStandaardCircleStyle() {
        return this._getStyle('#map-standaard-circle-style');
    }

    async getAangepasteCircleStyle() {
        return this._getStyle('#map-aangepast-circle-style');
    }
    
    async load() {
        await super.load(Config.baseUrl + '/demo/vl-map-circle-style.html');
    }
}

module.exports = VlMapCircleStylePage;
