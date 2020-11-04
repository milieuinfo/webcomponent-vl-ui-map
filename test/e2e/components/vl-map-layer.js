const {VlElement} = require('vl-ui-core').Test;

class VlMapLayer extends VlElement {
  async isVisible() {
    return this.driver.executeScript('return arguments[0]._layer.getVisible();', this);
  }

  async getName() {
    return this.getAttribute('name');
  }

  async getFeatures() {
    return this.driver.executeScript(`return arguments[0].features.map((f) => arguments[0].__geoJSON.writeFeature(f));`, this);
  }

  async getFeature(id) {
    return this.driver.executeScript(`return arguments[0].__geoJSON.writeFeature(arguments[0].features.find((f) => f.getId() === arguments[1]));`, this, id);
  }

  async isClustered() {
    return this.hasAttribute('cluster');
  }

  async getClusterDistance() {
    return this.getAttribute('cluster-distance');
  }

  async hasAutoExtent() {
    return this.hasAttribute('auto-extent');
  }

  async getAutoExtentMaxZoom() {
    return this.getAttribute('auto-extent-max-zoom');
  }

  async clickPointFeatureOnMap(id, map) {
    const feature = await this.getFeature(id);
    const {coordinates} = JSON.parse(feature).geometry;
    await map.scrollIntoView();
    await map.clickOnCoordinates(coordinates);
  }
}

module.exports = VlMapLayer;
