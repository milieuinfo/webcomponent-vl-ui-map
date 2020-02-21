const { VlElement } = require('vl-ui-core').Test;
const { By } = require('selenium-webdriver');

class VlMap extends VlElement {  
    async _getMap() {
        return this.shadowRoot();
    }

    async getZoomLevel() {
        return driver.executeScript('return arguments[0].map.getView().getZoom()', this);
    }

    async getKaartlagen() {
        const childElements = await this.findElements(By.css(this.selector + ' *'));
        const tagNames = await Promise.all(childElements.map(element => element.getTagName()));
        return tagNames.filter(tagname => tagname.indexOf('vl-map-baselayer') > -1);
    }

}

module.exports = VlMap;
