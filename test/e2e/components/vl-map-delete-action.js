const VlMapAction = require('./vl-map-action');
const VlMapLayers = require('./vl-map-layers');

class VlMapDeleteAction extends VlMapAction {
  async getLayer() {
    return await VlMapLayers.asLayer(this.driver, await this.parent());
  }

  async removeFeature(id) {
    const layer = await this.getLayer();
    const map = await this.getMap();
    await layer.clickPointFeatureOnMap(id, map);
  }

  async removeAllInRectangle(coordinatesTopLeft, coordinatesBottomRight) {
    const map = await this.getMap();
    await map.dragRectangle(coordinatesTopLeft, coordinatesBottomRight);
  }
}

module.exports = VlMapDeleteAction;
