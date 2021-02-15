const {VlElement} = require('vl-ui-core').Test;
const VlMap = require('./vl-map');

class VlMapAction extends VlElement {
  async isActive() {
    return this.hasAttribute('active');
  }

  async getMap() {
    const map = await new VlMap(this.driver, await this.driver.executeScript('return arguments[0]._mapElement', this));
    await map.isReady();
    await map.scrollIntoView();
    return map;
  }
}

module.exports = VlMapAction;
