const {VlElement} = require('vl-ui-core').Test;
const VlMap = require('./vl-map');
const VlMapLayers = require('./vl-map-layers');

class VlMapAction extends VlElement {
  async isActive() {
    return this.hasAttribute('active');
  }

  async getMap() {
    const element = await this.driver.executeScript('return arguments[0]._mapElement', this);
    const map = await new VlMap(this.driver, element);
    await map.isReady();
    await map.scrollIntoView();
    return map;
  }

  async getLayer() {
    return await VlMapLayers.asLayer(this.driver, await this.parent());
  }
}

module.exports = VlMapAction;
