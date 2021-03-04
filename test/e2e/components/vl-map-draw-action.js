const VlMapLayerAction = require('./vl-map-layer-action');

class VlMapDrawAction extends VlMapLayerAction {
  async draw(action) {
    await this.isReady();
    const layer = await this.getLayer();
    const numberOfFeatures = await layer.getNumberOfFeatures();
    await action();
    await this.driver.wait(async () => (await layer.getNumberOfFeatures()) == numberOfFeatures + 1);
  }
}

module.exports = VlMapDrawAction;
