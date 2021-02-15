const {VlElement} = require('vl-ui-core').Test;

class VlMapLayer extends VlElement {
  async isVisible() {
    return this.driver.executeScript('return arguments[0]._layer.getVisible();', this);
  }

  async getName() {
    return this.getAttribute('name');
  }

  async getFeatures() {
    return this.driver.executeScript(`return arguments[0].features;`, this);
  }

  async getNumberOfFeatures() {
    return this.driver.executeScript(`return arguments[0].layer.getSource().getFeatures().length;`, this);
  }

  async getFeature(id) {
    const feature = await this.driver.executeScript(`return arguments[0]._geoJSON.writeFeature(arguments[0].getFeature(${id}));`, this);
    return JSON.parse(feature);
  }

  async getCoordinateOfInteriorPointOfFeature(id) {
    return await this.driver.executeScript(`return arguments[0].layer.getSource().getFeatureById(${id}).getGeometry().getInteriorPoint().getFirstCoordinate();`, this);
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
    const {type, coordinates} = feature.geometry;
    await map.scrollIntoView();
    if (type == 'Point') {
      await map.clickOnCoordinates(coordinates);
    } else {
      if (type == 'LineString') {
        await map.clickOnCoordinates(coordinates[0]);
      } else {
        const interiorCoordinate = await this.getCoordinateOfInteriorPointOfFeature(id);
        await map.clickOnCoordinates(interiorCoordinate);
      }
    }
  }
}

module.exports = VlMapLayer;
