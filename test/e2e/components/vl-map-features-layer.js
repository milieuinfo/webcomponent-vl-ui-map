const VlMapLayer = require('./vl-map-layer');

class VlMapFeaturesLayer extends VlMapLayer {
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

  async getNumberOfFeatures() {
    return (await this.getFeatures()).length;
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

  async getCoordinateForFeature(id) {
    const feature = await this.getFeature(id);
    const {type, coordinates} = feature.geometry;
    if (type == 'Point') {
      return coordinates;
    } else {
      if (type == 'LineString') {
        return coordinates[0];
      } else {
        const interiorCoordinate = await this.getCoordinateOfInteriorPointOfFeature(id);
        return interiorCoordinate;
      }
    }
  }

  static get TAG() {
    return 'vl-map-features-layer';
  }
}

module.exports = VlMapFeaturesLayer;
