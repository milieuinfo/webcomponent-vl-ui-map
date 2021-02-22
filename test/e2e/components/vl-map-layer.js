const {VlElement} = require('vl-ui-core').Test;

class VlMapLayer extends VlElement {
  async isVisible() {
    return this.driver.executeScript('return arguments[0]._layer.getVisible();', this);
  }

  async getName() {
    return this.getAttribute('name');
  }

  static get TAG() {
    throw new Error('De tag werd nog niet opgegeven voor dit type layer');
  }
}

module.exports = VlMapLayer;
