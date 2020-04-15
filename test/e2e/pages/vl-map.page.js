const VlMap = require('../components/vl-map');
const VlMapBaseLayer = require('../components/vl-map-baselayer');
const { Page, Config } = require('vl-ui-core').Test;

class VlMapPage extends Page {
    async _getMap(selector) {
        return new VlMap(this.driver, selector);
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

    async getKaartMetVerschillendeGrbKaartlagen() {
        return this._getMap('#map-kaartlagen');
    }

    async getKaartZonderEscapeFunctionaliteit() {
        return this._getMap('#map-escape');
    }

    async getKaartZonderRotateFunctionaliteit() {
        return this._getMap('#map-rotatie');
    }

    async getMapZonderMouseWheelZoomFunctionaliteit() {
        return this._getMap('#map-mouse-zoom');
    }

    async load() {
        await super.load(Config.baseUrl + '/demo/vl-map.html');
    }
}

module.exports = VlMapPage;