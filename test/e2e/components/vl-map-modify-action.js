const VlMapAction = require('./vl-map-action');

class VlMapModifyAction extends VlMapAction {
  async movePointByCoordinates(from, to ) {
    const map = await this.getMap();
    await map.scrollIntoView();
    await map.movePointByCoordinates(from, to );
  }
}

module.exports = VlMapModifyAction;
