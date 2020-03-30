const { VlElement } = require('vl-ui-core').Test;

class VlMapAction extends VlElement {

    async isActive() {
        return this.hasAttribute('active');
    }
}

module.exports = VlMapAction;
