const VlMapAction = require('./vl-map-action');
const VlMapLayerCircleStyle = require('./vl-map-layer-circle-style');

class VlMapSelectAction extends VlMapAction {

    async isClustered() {
        return this.hasAttribute('cluster');
    }

    async _getCircleStyleElement() {
        return this.findElement(By.css('vl-map-layer-circle-style'));
    }

    async hasCircleStyle() {
        return this._getCircleStyleElement().then(() => true).catch(() => false);
    }

    async getCircleStyle() {
        const style = await this._getCircleStyleElement();
        return new VlMapLayerCircleStyle(this.driver, style);
    }
}

module.exports = VlMapSelectAction;
