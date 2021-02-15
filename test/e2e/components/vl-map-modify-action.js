const VlMapAction = require('./vl-map-action');
const VlMapLayer = require('./vl-map-layer');


class VlMapModifyAction extends VlMapAction {
  async getLayer() {
    return new VlMapLayer(this.driver, await this.driver.executeScript('return arguments[0].parentElement', this));
  }

  async movePointByCoordinates(from, to ) {
    const map = await this.getMap();
    await map.scrollIntoView();
    await map.movePointByCoordinates(from, to );
  }
}

module.exports = VlMapModifyAction;
