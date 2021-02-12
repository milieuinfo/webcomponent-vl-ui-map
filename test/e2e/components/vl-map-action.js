const {VlElement} = require('vl-ui-core').Test;
const VlMap = require('./vl-map');

class VlMapAction extends VlElement {
  async isActive() {
    return this.hasAttribute('active');
  }

  async getMap() {
    return new VlMap(this.driver, await this.driver.executeScript('return arguments[0]._mapElement', this));
  }
}

module.exports = VlMapAction;
