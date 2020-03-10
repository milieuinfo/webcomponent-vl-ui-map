const { VlElement } = require('vl-ui-core').Test;
const { By } = require('vl-ui-core').Test.Setup;

class VlMap extends VlElement {
    async _getMap() {
        return this.shadowRoot;
    }

    async _hasOverviewMap() {
        const map = await this._getMap();
        const overviewMapCollection = await map.findElements(By.css('.ol-overviewmap'));
        if (overviewMapCollection < 0) {
            return new Error('Overviewmap is not available!');
        }
        return true;
    }

    async getOverviewMap() {
        const hasOverviewMap = await this._hasOverviewMap();
        if (hasOverviewMap) {
            const map = await this._getMap();
            return map.findElement(By.css('.ol-overviewmap'));
        }
    }

    async getKaartlagen() {
        const childElements = await this.findElements(By.css(this.selector + ' *'));
        const tagNames = await Promise.all(childElements.map(element => element.getTagName()));
        return tagNames.filter(tagname => tagname.indexOf('vl-map-baselayer') > -1);
    }

    async getActiveLayer() {
        const title = await this.driver.executeScript(`
            return arguments[0].map.baseLayers.find((layer) => {
                return layer.getVisible();
            }).get('title')
        `, this);
        return title;
    }

    async getFeatures() {
        const features = await this.driver.executeScript(`
            return arguments[0].map.getOverlayLayers().find((layer) => { 
                const source = layer.getSource(); 
                return source.getFeatures();
            })`, this);
        console.log(features)
    }

    async toggleLayer() {
        const overviewMap = await this.getOverviewMap();
        return overviewMap.click();
    }
}

module.exports = VlMap;
