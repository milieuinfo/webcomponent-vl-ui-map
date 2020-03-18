const { VlElement } = require('vl-ui-core').Test;

class VlMapOverviewMap extends VlElement {

    async toggleBaseLayer() {
        return this.click();
    }
}

module.exports = VlMapOverviewMap;
