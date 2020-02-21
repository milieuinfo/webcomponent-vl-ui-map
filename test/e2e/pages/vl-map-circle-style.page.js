const VlMap = require('../components/vl-map');
const { Page, Config } = require('vl-ui-core').Test;

class VlMapCircleStyle extends Page {
    async _getMap(selector) {
        return new VlMap(this.driver, selector);
    }

    async getStandaardCircleStyleMap() {
        return this._getMap('#map-standaard');
    }

    async getAangfepasteCircleStyleMap() {
        return this._getMap('#map-aangepast');
    }

    async getGeclusterdeFeaturesMap() {
        return this._getMap('#map-cluster');
    }
    
    async load() {
        await super.load(Config.baseUrl + '/demo/vl-map-circle-style.html');
    }
}

module.exports = VlMapCircleStyle;
