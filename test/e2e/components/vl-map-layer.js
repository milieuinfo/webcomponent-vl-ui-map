const {VlElement} = require('vl-ui-core').Test;

class VlMapLayer extends VlElement {
  async isVisible() {
    return this.driver.executeScript('return arguments[0]._layer.getVisible();', this);
  }

  async getName() {
    return this.getAttribute('name');
  }

  async getNumberOfFeatures() {
    return (await this.getFeatures()).length;
  }

  async getFeatures() {
    return this.driver.executeScript(`return arguments[0].features;`, this);
  }

  async getFeature(id) {
    const feature = await this.driver.executeScript(`return arguments[0]._geoJSON.writeFeature(arguments[0].getFeature(${id}));`, this);
    return JSON.parse(feature);
  }

  async isClustered() {
    return this.hasAttribute('data-vl-cluster');
  }

  async getClusterDistance() {
    return this.getAttribute('data-vl-cluster-distance');
  }

  async hasAutoExtent() {
    return this.hasAttribute('data-vl-auto-extent');
  }

  async getAutoExtentMaxZoom() {
    return this.getAttribute('data-vl-auto-extent-max-zoom');
  }

  async clickPointFeatureOnMap(id, map) {
    const feature = await this.getFeature(id);
    const {coordinates} = feature.geometry;
    await map.scrollIntoView();
    await map.clickOnCoordinates(coordinates);
  }
}

module.exports = VlMapLayer;
