const VlMapAction = require('./vl-map-action');
const VlMapLayerCircleStyle = require('./vl-map-layer-circle-style');

class VlMapSelectAction extends VlMapAction {

    async isClustered() {
        return this.hasAttribute('cluster');
    }

    async hasCircleStyle() {
        return (await this.findElements(By.css('vl-map-layer-circle-style'))).length > 0;
    }

    async getCircleStyle() {
        const style = await this.findElement(By.css('vl-map-layer-circle-style'));
        return new VlMapLayerCircleStyle(this.driver, style);
    }
}

module.exports = VlMapSelectAction;
