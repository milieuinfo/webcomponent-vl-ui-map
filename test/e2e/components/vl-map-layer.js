const {VlElement} = require('vl-ui-core').Test;

class VlMapLayer extends VlElement {
  async isVisible() {
    return this.driver.executeScript('return arguments[0]._layer.getVisible();', this);
  }

  async getName() {
    return this.getAttribute('name');
  }

  async getFeatures() {
    return this.driver.executeScript(`return arguments[0].layer.getSource().getFeatures();`, this);
  }

  async getFeature(id) {
    const feature = await this.driver.executeScript(`return arguments[0]._mapElement.geoJSON.writeFeature(arguments[0].layer.getSource().getFeatures().find((feature) => feature.getId() === ${id}));`, this);
    return JSON.parse(feature);
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
    const {coordinates} = feature.geometry;
    await map.scrollIntoView();
    await map.clickOnCoordinates(coordinates);
  }
}

module.exports = VlMapLayer;
