const VlMapAction = require('./vl-map-action');

class VlMapLayerAction extends VlMapAction {
  async isReady() {
    return this.driver.wait(async () => await this.hasAttribute('active'));
  }
}

module.exports = VlMapLayerAction;
