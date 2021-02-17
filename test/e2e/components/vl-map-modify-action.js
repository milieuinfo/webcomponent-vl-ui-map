const VlMapAction = require('./vl-map-action');
const VlMapFeaturesLayer = require('./vl-map-features-layer');


class VlMapModifyAction extends VlMapAction {
  async getFeaturesLayer() {
    return new VlMapFeaturesLayer(this.driver, await this.driver.executeScript('return arguments[0].parentElement', this));
  }

  async movePointByCoordinates(from, to ) {
    const map = await this.getMap();
    await map.scrollIntoView();
    await map.movePointByCoordinates(from, to );
  }
}

module.exports = VlMapModifyAction;
