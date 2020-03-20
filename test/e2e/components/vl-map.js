const { VlElement } = require('vl-ui-core').Test;
const { By } = require('vl-ui-core').Test.Setup;
const VlMapBaseLayer = require('./vl-map-baselayer');
const VlMapSearch = require('./vl-map-search');
const VlMapOverviewMap = require('./vl-map-overview-map');

class VlMap extends VlElement {
	async _getMap() {
		return this.shadowRoot;
	}

	async getBaseLayers() {
		const childElements = await this.findElements(By.css(':scope > *'));
		const tagNames = await Promise.all(childElements.map(element => element.getTagName()));
		const baseLayerElements = childElements.filter((element, index) => tagNames[index].startsWith('vl-map-baselayer'));
		return Promise.all(baseLayerElements.map(element => new VlMapBaseLayer(this.driver, element)));
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
		const overviewMap = await map.findElement(By.css('.ol-overviewmap'));
		return new VlMapOverviewMap(this.driver, overviewMap);
	}

	async getActiveBaseLayerTitle() {
        return this.driver.executeScript(`
			return arguments[0].map.baseLayers.find((layer) => {
				return layer.getVisible();
			}).get('title')
				`, this);
    }

    async _getSearchElement() {
		return this.driver.executeScript(`return arguments[0].shadowRoot.querySelector('vl-map-search')`, this);
	}

    async hasSearch() {
        const search = await this._getSearchElement();
        return search != null;
    }

    async getSearch() {
        const search = await this._getSearchElement();
        return new VlMapSearch(this.driver, search);
    }

    async zoomIn() {
        const map = await this._getMap();
        const zoomOutButton = await map.findElement(By.css('button.ol-zoom-in'));
        await zoomOutButton.click();
    }

    async zoomOut() {
        const map = await this._getMap();
        const zoomOutButton = await map.findElement(By.css('button.ol-zoom-out'));
        await zoomOutButton.click();
    }

    async hasZoom(zoom) {
        return this.driver.wait(async () => {
            const currentZoom = await this.driver.executeScript(`return arguments[0].map.getView().getZoom()`, this);
            return currentZoom === zoom;
        }, 2000).then(() => true).catch(() => false);
    }

    async clickOnCoordinates(coordinates) {
        const pixels = await this.driver.executeScript(
            `return arguments[0]._map.getPixelFromCoordinate(${JSON.stringify(coordinates)})`, this);
        const rect = await this.getRect();
        await this.driver.actions().move({
            origin: this,
            x: Math.round(pixels[0] - (rect.width / 2)),
            y: Math.round(pixels[1] - (rect.height / 2))
        }).click().perform();
    }
}

module.exports = VlMap;
