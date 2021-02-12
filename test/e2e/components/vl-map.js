const {VlElement} = require('vl-ui-core').Test;
const {By} = require('vl-ui-core').Test.Setup;
const VlMapBaseLayer = require('./vl-map-baselayer');
const VlMapFeaturesLayer = require('./vl-map-features-layer');
const VlMapWmtsLayer = require('./vl-map-wmts-layer');
const VlMapImageWmsLayer = require('./vl-map-image-wms-layer');
const VlMapTiledWmsLayer = require('./vl-map-tiled-wms-layer');
const VlMapWfsLayer = require('./vl-map-wfs-layer');
const VlMapSearch = require('./vl-map-search');
const VlMapOverviewMap = require('./vl-map-overview-map');
const VlMapLayerSwitcher = require('./vl-map-layer-switcher');
const VlMapSideSheet = require('./vl-map-side-sheet');

class VlMap extends VlElement {
  async getBaseLayers() {
    const childElements = await this.findElements(By.css(':scope > *'));
    const tagNames = await Promise.all(
        childElements.map((element) => element.getTagName()));
    const baseLayerElements = childElements.filter(
        (element, index) => tagNames[index].startsWith('vl-map-baselayer'));
    return Promise.all(baseLayerElements.map(
        (element) => new VlMapBaseLayer(this.driver, element)));
  }

  async getLayers() {
    const featuresLayers = await this.getFeaturesLayers();
    const wmtsLayers = await this.getWmtsLayers();
    const imageWmsLayers = await this.getImageWmsLayers();
    const tiledWmsLayers = await this.getTiledWmsLayers();
    const wfsLayers = await this.getWfsLayers();
    return featuresLayers.concat(wmtsLayers).concat(imageWmsLayers).concat(tiledWmsLayers).concat(wfsLayers);
  }

  async getWmtsLayers() {
    return this._getLayersOfType(VlMapWmtsLayer);
  }

  async getImageWmsLayers() {
    return this._getLayersOfType(VlMapImageWmsLayer);
  }

  async getTiledWmsLayers() {
    return this._getLayersOfType(VlMapTiledWmsLayer);
  }

  async getWfsLayers() {
    return this._getLayersOfType(VlMapWfsLayer);
  }

  async getFeaturesLayers() {
    return this._getLayersOfType(VlMapFeaturesLayer);
  }

  async _getLayersOfType(LayerClass) {
    const layerElements = await this.findElements(
        By.css(`:scope > ${LayerClass.TAG}`));
    return Promise.all(
        layerElements.map((element) => new LayerClass(this.driver, element)));
  }

  async isEscapeKeyDisabled() {
    return this.hasAttribute('disable-escape-key');
  }

  async isRotationDisabled() {
    return this.hasAttribute('disable-rotation');
  }

  async isMouseWheelZoomDisabled() {
    return this.hasAttribute('disable-mouse-wheel-zoom');
  }

  async isFullscreenAllowed() {
    return this.hasAttribute('allow-fullscreen');
  }

  async getOverviewMap() {
    const map = await this._getMap();
    await this.driver.wait(async () => {
      const overviewMaps = await map.findElements(By.css('.ol-overviewmap'));
      return overviewMaps.length > 0;
    });
    const overviewMap = await map.findElement(By.css('.ol-overviewmap'));
    return new VlMapOverviewMap(this.driver, overviewMap);
  }

  async getActiveBaseLayerTitle() {
    return this.driver.executeScript(
        `return arguments[0].map.baseLayers.find((layer) => layer.getVisible()).get('title')`,
        this);
  }

  async getSideSheet() {
    const element = await this.findElement(By.css('vl-map-side-sheet'));
    return new VlMapSideSheet(this.driver, element);
  }

  async getLayerSwitcher() {
    const element = await this.findElement(By.css('vl-map-layer-switcher'));
    return new VlMapLayerSwitcher(this.driver, element);
  }

  async hasSearch() {
    const search = await this._getSearchElement();
    return search != null;
  }

  async getSearch() {
    const search = await this._getSearchElement();
    return new VlMapSearch(this.driver, search);
  }

  async zoomIn() {
    const map = await this._getMap();
    const zoomOutButton = await map.findElement(By.css('.ol-zoom-in'));
    await zoomOutButton.click();
  }

  async zoomOut() {
    const map = await this._getMap();
    const zoomOutButton = await map.findElement(By.css('.ol-zoom-out'));
    await zoomOutButton.click();
  }

  async getZoom() {
    return this.driver.executeScript(
        `return arguments[0].map.getView().getZoom()`, this);
  }

  async hasZoom(zoom) {
    return this.driver.wait(async () => {
      const currentZoom = await this.getZoom();
      return currentZoom >= zoom && currentZoom <= zoom + 1;
    }, 2000).then(() => true).catch(() => false);
  }

  async clickOnCoordinates(coordinates) {
    const pixels = await this.driver.executeScript(
        `return arguments[0].map.getPixelFromCoordinate(${JSON.stringify(
            coordinates)})`, this);
    const rect = await this.getRect();
    await this.driver.actions().move({
      origin: this,
      x: Math.round(pixels[0] - (rect.width / 2)),
      y: Math.round(pixels[1] - (rect.height / 2)),
    }).click().perform();
  }

  async getScale() {
    const map = await this._getMap();
    const scale = await map.findElement(By.css('.ol-scale-line-inner'));
    return scale.getText();
  }

  async toggleFullscreen() {
    const button = await this._getToggleFullscreenButton();
    await button.click();
  }

  async isFullScreen() {
    return this.driver.executeScript(`return document.fullscreen`);
  }

  async _getMap() {
    return this.shadowRoot;
  }

  async _getSearchElement() {
    return this.shadowRoot.findElement(By.css('vl-map-search'));
  }

  async _getToggleFullscreenButton() {
    return this.shadowRoot.findElement(By.css('.ol-full-screen'));
  }
}

module.exports = VlMap;
