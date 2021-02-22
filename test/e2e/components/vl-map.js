const {VlElement} = require('vl-ui-core').Test;
const {By} = require('vl-ui-core').Test.Setup;
const VlMapBaseLayer = require('./vl-map-baselayer');
const VlMapSearch = require('./vl-map-search');
const VlMapLayers = require('./vl-map-layers');
const VlMapWfsLayer = require('./vl-map-wfs-layer');
const VlMapTiledWmsLayer = require('./vl-map-tiled-wms-layer');
const VlMapImageWmsLayer = require('./vl-map-image-wms-layer');
const VlMapWmtsLayer = require('./vl-map-wmts-layer');
const VlMapFeaturesLayer = require('./vl-map-features-layer');
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
    return VlMapLayers.getLayers(this);
  }

  async getFeaturesLayers() {
    return VlMapLayers.getLayersOfType(this, VlMapFeaturesLayer);
  }

  async getWfsLayers() {
    return VlMapLayers.getLayersOfType(this, VlMapWfsLayer);
  }

  async getTiledWmsLayers() {
    return VlMapLayers.getLayersOfType(this, VlMapTiledWmsLayer);
  }

  async getImageWmsLayers() {
    return VlMapLayers.getLayersOfType(this, VlMapImageWmsLayer);
  }

  async getWmtsLayers() {
    return VlMapLayers.getLayersOfType(this, VlMapWmtsLayer);
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

  /**
   * Geef de pixels voor een coördinaat op de kaart.
   * Relatief t.o.v. de hoogte en breedte van diezelfde kaart.
   *
   * @param {Number[]} coordinates - coördinaat op de kaart
   * @return {Promise<{x: number, y: number}>}
   * @private
   * @see {@link https://openlayers.org/en/latest/apidoc/module-ol_Map-Map.html#getPixelFromCoordinate}
   * @see {@link https://www.selenium.dev/selenium/docs/api/javascript/module/selenium-webdriver/lib/webdriver_exports_WebElement.html#getRect}
   */
  async _getPixelsFromCoordinate(coordinates = [0, 0]) {
    const pixels = await this.driver.executeScript(`return arguments[0].map.getPixelFromCoordinate(${JSON.stringify(coordinates)})`, this);
    const rect = await this.getRect();
    return {
      x: Math.round(pixels[0] - (rect.width / 2)),
      y: Math.round(pixels[1] - (rect.height / 2)),
    };
  }

  async clickOnCoordinates(coordinates) {
    const pixel = await this.driver.executeScript(`return arguments[0].map.getPixelFromCoordinate(${JSON.stringify(coordinates)})`, this);
    const movePoint = await this._moveToPointOnMap(pixel);
    await this.driver.actions().move(movePoint).click().perform();
  }

  /**
   * Beweeg een punt o.b.v zijn coördinaat naar een andere plaats op de kaart.
   *
   * @param {Number[]} from - coördinaat om vanuit te bewegen
   * @param {Number[]} to - coördinaat om naar te bewegen
   * @return {Promise<void>}
   */
  async movePointByCoordinates(from = [0, 0], to = [0, 0]) {
    const fromPixels = await this._getPixelsFromCoordinate(from);
    const toPixels = await this._getPixelsFromCoordinate(to);

    await this.clickOnCoordinates(from);

    const actions = await this.driver.actions();

    await actions.move({
      origin: this,
      x: fromPixels.x,
      y: fromPixels.y,
    }).press().perform();

    await actions.move({
      origin: this,
      x: toPixels.x,
      y: toPixels.y,
    }).release().perform();

    await actions.click().perform();
  }

  /**
   * Beweeg een punt o.b.v zijn coördinaat naar een andere plaats op de kaart.
   *
   * @param {Number[]} from - coördinaat om vanuit te bewegen
   * @param {Number[]} to - coördinaat om naar te bewegen
   * @return {Promise<void>}
   */
  async movePointByCoordinates(from = [0, 0], to = [0, 0]) {
    const fromPixels = await this._getPixelsFromCoordinate(from);
    const toPixels = await this._getPixelsFromCoordinate(to);

    await this.clickOnCoordinates(from);
    if (await this._isFirefox()) {
      // TODO stefanborghys: 13/02/21 moving a point (without losing the cursor) seems impossible, i cannot get this to work
      const actions = await this.driver.actions();
      actions.move({
        duration: 500,
        origin: this,
        x: fromPixels.x,
        y: fromPixels.y,
      }).press().perform();
      actions.move({
        duration: 500,
        origin: this,
        x: toPixels.x,
        y: toPixels.y,
      }).release().perform();
    } else {
      await this.driver.actions()
          .move({
            duration: 500,
            origin: this,
            x: fromPixels.x,
            y: fromPixels.y,
          })
          .press()
          .move({
            duration: 500,
            origin: this,
            x: toPixels.x,
            y: toPixels.y,
          })
          .release()
          .perform();
    }
  }

  async _isFirefox() {
    const userAgent = await this.driver.executeScript(`return navigator.userAgent`, this);
    return userAgent.includes('Firefox');
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

  async isReady() {
    await this.driver.wait(async () => {
      try {
        await this.driver.wait(this.driver.executeScript('return arguments[0].ready', this), 1000);
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    });
    return true;
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

  async _moveToPointOnMap(pixel) {
    const rect = await this.getRect();
    return {
      origin: this,
      x: Math.round(pixel[0] - (rect.width / 2)),
      y: Math.round(pixel[1] - (rect.height / 2)),
      duration: 1000,
    };
  }

  async dragRectangle(topLeft, bottomRight) {
    const pixelStart = await this.driver.executeScript(`return arguments[0].map.getPixelFromCoordinate(${JSON.stringify(topLeft)})`, this);
    const pixelEnd = await this.driver.executeScript(`return arguments[0].map.getPixelFromCoordinate(${JSON.stringify(bottomRight)})`, this);
    const moveStart = await this._moveToPointOnMap(pixelStart);
    const moveEnd = await this._moveToPointOnMap(pixelEnd);
    return this.driver.actions()
        .move(moveStart)
        .press()
        .move(moveEnd)
        .release()
        .perform();
  }
}

module.exports = VlMap;
