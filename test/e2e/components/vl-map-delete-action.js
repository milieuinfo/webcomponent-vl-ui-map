const VlMapAction = require('./vl-map-action');

class VlMapDeleteAction extends VlMapAction {
  async removeFeature(id) {
    const layer = await this.getLayer();
    const map = await this.getMap();
    await map.scrollIntoView();
    const coordinateForFeature = await layer.getCoordinateForFeature(id);
    const numberOfFeaturesBefore = await layer.getNumberOfFeatures();
    await map.clickOnCoordinates(coordinateForFeature);
    await this.driver.wait(async () => {
      const numberOfFeatures = await layer.getNumberOfFeatures();
      return numberOfFeatures == numberOfFeaturesBefore - 1;
    });
  }

  async removeAllInRectangle(coordinatesTopLeft, coordinatesBottomRight) {
    const map = await this.getMap();
    await map.scrollIntoView();
    await map.dragRectangle(coordinatesTopLeft, coordinatesBottomRight);
  }
}

module.exports = VlMapDeleteAction;
