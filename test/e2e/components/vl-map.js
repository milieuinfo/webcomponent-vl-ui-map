const { VlElement } = require('vl-ui-core').Test;
const { By } = require('vl-ui-core').Test.Setup;
const VlMapBaseLayer = require('./vl-map-baselayer');
const VlMapSearch = require('./vl-map-search');

class VlMap extends VlElement {
	async _getMap() {
		return this.shadowRoot;
	}

	async getBaseLayers() {
		const childElements = await this.findElements(By.css(this.selector + ' *'));
		const tagNames = await Promise.all(childElements.map(element => element.getTagName()));
		const baseLayerElements = childElements.filter((element, index) => tagNames[index].indexOf('vl-map-baselayer') > -1);
		return Promise.all(baseLayerElements.map(async element => await new VlMapBaseLayer(this.driver, element)));
	}
	
	async isEscapeKeyDisabled() {
		return this.hasAttribute("disable-escape-key");
	}

	async isRotationDisabled() {
		return this.hasAttribute("disable-rotation");
	}
	
	async isMouseWheelZoomDisabled() {
		return this.hasAttribute("disable-mouse-wheel-zoom");
	}

	async getOverviewMap() {
		const map = await this._getMap();
		await this.driver.wait(async () => {
            const overviewMaps = await map.findElements(By.css('.ol-overviewmap'));
			return overviewMaps.length > 0;
		});
		return await map.findElement(By.css('.ol-overviewmap'));
	}

	async getActiveBaseLayerTitle() {
        return this.driver.executeScript(`
			return arguments[0].map.baseLayers.find((layer) => {
				return layer.getVisible();
			}).get('title')
				`, this);
    }

	async toggleBaseLayer() {
		const overviewMap = await this.getOverviewMap();
		return overviewMap.click();
	}

    async hasSearch() {
        const search = await this.driver.executeScript(`return arguments[0].shadowRoot.querySelector('vl-map-search')`, this);
        return search != null;
    }

    async getSearch() {
        const search = await this.driver.executeScript(`return arguments[0].shadowRoot.querySelector('vl-map-search')`, this);
        return new VlMapSearch(this.driver, search);
    }
}

module.exports = VlMap;
