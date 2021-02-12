const VlMapWmsLayer = require('./vl-map-wms-layer');

class VlMapTiledWmsLayer extends VlMapWmsLayer {
  static get TAG() {
    return 'vl-map-tiled-wms-layer';
  }
}

module.exports = VlMapTiledWmsLayer;
