const VlMapLayer = require('../components/vl-map-layer');
const VlMapBaseLayer = require('../components/vl-map-baselayer');
const { Page, Config } = require('vl-ui-core').Test;

class VlMapLayerPage extends Page {

    async _getLayer(selector) {
        return new VlMapLayer(this.driver, selector);
    }

    async _getBaseLayer(selector) {
        return new VlMapBaseLayer(this.driver, selector);
    }

    async getBaseLayerGrbGray() {
        return this._getBaseLayer('#baselayer-grb-gray');
    }

    async getBaseLayerGrb() {
        return this._getBaseLayer('#baselayer-grb');
    }

    async getStandaardLayer() {
        return this._getLayer('#standaard-layer');
    }

    async getClusteredLayer() {
        return this._getLayer('#clustered-layer');
    }

    async getAutoExtentLayer() {
        return this._getLayer('#auto-extent-layer');
    }
    
    async load() {
        await super.load(Config.baseUrl + '/demo/vl-map-layer.html');
    }
}

module.exports = VlMapLayerPage;
