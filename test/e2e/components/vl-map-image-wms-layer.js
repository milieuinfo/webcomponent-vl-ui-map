const VlMapWmsLayer = require('./vl-map-wms-layer');

class VlMapImageWmsLayer extends VlMapWmsLayer {
  static get TAG() {
    return 'vl-map-image-wms-layer';
  }
}

module.exports = VlMapImageWmsLayer;
