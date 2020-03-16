const { VlElement } = require('vl-ui-core').Test;
const VlMapLayerCircleStyle = require('./vl-map-layer-circle-style');
const { By } = require('vl-ui-core').Test.Setup;

class VlMapLayer extends VlElement {
	
	async getName() {
		return this.getAttribute("name");
	}

    async getFeatures() {
        return this.driver.executeScript(`
        	return arguments[0].features.map((f) => new ol.format.GeoJSON().writeFeature(f));`, this);
    }

    async getFeature(id) {
        return this.driver.executeScript(`
        	return new ol.format.GeoJSON().writeFeature(
        		arguments[0].features.find((f) => f.getId() === arguments[1])
			);`, this, id);
    }

    async hasCircleStyle() {
	    return (await this.findElements(By.css('vl-map-layer-circle-style'))).length > 0;
    }

    async getCircleStyle() {
	    const style = await this.findElement(By.css('vl-map-layer-circle-style'));
	    return new VlMapLayerCircleStyle(this.driver, style);
    }

    async isClustered() {
	    return this.hasAttribute('cluster');
    }

    async getClusterDistance() {
	    return this.getAttribute('cluster-distance');
    }

    async hasAutoExtent() {
	    return this.hasAttribute('auto-extent');
    }

    async getAutoExtentMaxZoom() {
	    return this.getAttribute('auto-extent-max-zoom');
    }
}

module.exports = VlMapLayer;
