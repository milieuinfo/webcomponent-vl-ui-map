const VlMapAction = require('./vl-map-action');

class VlMapModifyAction extends VlMapAction {
  async movePointByCoordinates(from= [0, 0], to = [0, 0]) {
    const map = await this.getMap();
    await map.scrollIntoView();
    await map.movePointByCoordinates(from, to);
  }
}

module.exports = VlMapModifyAction;
