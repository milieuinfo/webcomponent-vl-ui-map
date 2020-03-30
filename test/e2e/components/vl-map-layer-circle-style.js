const VlMapLayerStyle = require('./vl-map-layer-style');

class VlMapLayerCircleStyle extends VlMapLayerStyle {

    async getSize() {
        return this.getAttribute('size');
    }

    async getBorderColor() {
        return this.getAttribute('border-color');
    }

    async getBorderSize() {
        return this.getAttribute('border-size');
    }
}

module.exports = VlMapLayerCircleStyle;
