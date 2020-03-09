const { VlElement } = require('vl-ui-core').Test;
const { By } = require('vl-ui-core').Test.Setup;

class VlMap extends VlElement {  
    async _getMap() {
        return this.shadowRoot;
    }

    async getZoomLevel() {
        return this.driver.executeScript('return arguments[0].map.getView().getZoom()', this);
    }

    async getKaartlagen() {
        const childElements = await this.findElements(By.css(this.selector + ' *'));
        const tagNames = await Promise.all(childElements.map(element => element.getTagName()));
        return tagNames.filter(tagname => tagname.indexOf('vl-map-baselayer') > -1);
    }

    async hasOverviewMap() {
        const map = await this._getMap();
        const overviewMapCollection = await map.findElements(By.css('.ol-overviewmap'));
        return overviewMapCollection.length > 0;
    }

    async getActiveLayer() {
        const baseLayers = await this.driver.executeScript('return arguments[0].map', this);
    }
}

module.exports = VlMap;
