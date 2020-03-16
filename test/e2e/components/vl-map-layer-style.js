const { VlElement } = require('vl-ui-core').Test;

class VlMapLayerStyle extends VlElement {

    async getColor() {
        return this.getAttribute('color');
    }

    async getTextColor() {
        return this.getAttribute('text-color');
    }

    async getTextOffsetX() {
        return this.getAttribute('text-offset-x');
    }

    async getTextOffsetY() {
        return this.getAttribute('text-offset-y');
    }
}

module.exports = VlMapLayerStyle;
