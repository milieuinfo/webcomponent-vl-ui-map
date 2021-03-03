const VlMapAction = require('./vl-map-action');

class VlMapDrawAction extends VlMapAction {
  async draw(action) {
    const layer = await this.getLayer();
    const numberOfFeatures = await layer.getNumberOfFeatures();
    await action();
    await this.driver.wait(async () => (await layer.getNumberOfFeatures()) == numberOfFeatures + 1);
  }
}

module.exports = VlMapDrawAction;
