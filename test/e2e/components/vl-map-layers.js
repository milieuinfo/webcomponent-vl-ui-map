const {By} = require('vl-ui-core').Test.Setup;
const VlMapFeaturesLayer = require('./vl-map-features-layer');
const VlMapWfsLayer = require('./vl-map-wfs-layer');
const VlMapWmtsLayer = require('./vl-map-wmts-layer');
const VlMapTiledWmsLayer = require('./vl-map-tiled-wms-layer');
const VlMapImageWmsLayer = require('./vl-map-image-wms-layer');
const LAYER_TYPES = [
  VlMapFeaturesLayer,
  VlMapWfsLayer,
  VlMapWmtsLayer,
  VlMapTiledWmsLayer,
  VlMapImageWmsLayer];

class VlMapLayers {
  static async getLayer(rootElement) {
    const layers = await VlMapLayers.getLayers(rootElement);
    return layers[0];
  }

  static async getLayersOfType(rootElement, LayerClass) {
    return await VlMapLayers._getLayersByCssSelector(rootElement,
        LayerClass.TAG);
  }

  static async getLayers(rootElement) {
    return VlMapLayers._getLayersByCssSelector(rootElement,
        '[data-vl-is-layer]');
  }

  static async _getLayersByCssSelector(rootElement, selector) {
    const layerElements = await rootElement.findElements(By.css(selector));
    return Promise.all(layerElements.map((element) => VlMapLayers.asLayer(rootElement.driver, element)));
  }

  static async asLayer(driver, element) {
    const LayerType = await VlMapLayers._getLayerType(element);
    return new LayerType(driver, element);
  }

  static async _getLayerType(element) {
    const elementTag = await element.getTagName();
    return LAYER_TYPES.find(
        (layerType) => elementTag.toUpperCase() === layerType.TAG.toUpperCase());
  }
}

module.exports = VlMapLayers;
