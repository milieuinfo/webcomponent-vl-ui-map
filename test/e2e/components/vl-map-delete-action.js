const VlMapAction = require('./vl-map-action');
const VlMapLayer = require('./vl-map-layer');

class VlMapDeleteAction extends VlMapAction {
    async getLayer() {
    	return new VlMapLayer(this.driver, await this.driver.executeScript('return arguments[0].parentElement', this));
    }

    async removeFeature(id) {
    	const layer = await this.getLayer();
    	const map = await this.getMap();
    	await layer.clickPointFeatureOnMap(id, map);
    }

}

module.exports = VlMapDeleteAction;
