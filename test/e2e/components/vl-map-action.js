const {VlElement} = require('vl-ui-core').Test;

class VlMapAction extends VlElement {
  async isActive() {
    return this.hasAttribute('active');
  }

  async getMap() {
    return new VlElement(this.driver, await this.driver.executeScript('return arguments[0]._mapElement', this));
  }
}

module.exports = VlMapAction;
