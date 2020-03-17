const VlMapSelectAction = require('../components/vl-map-select-action');
const { Page, Config } = require('vl-ui-core').Test;

class VlMapSelectActionPage extends Page {

    async _getSelectAction(selector) {
        return new VlMapSelectAction(this.driver, selector);
    }

    async getSelectAction() {
        return this._getSelectAction('#select-action');
    }

    async getClusteredSelectAction() {
        return this._getSelectAction('#select-action-cluster');
    }
    
    async load() {
        await super.load(Config.baseUrl + '/demo/vl-map-select-action.html');
    }
}

module.exports = VlMapSelectActionPage;
