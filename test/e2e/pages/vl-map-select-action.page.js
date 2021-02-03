const VlMapSelectAction = require('../components/vl-map-select-action');
const VlMap = require('../components/vl-map');
const {Page, Config} = require('vl-ui-core').Test;
const {By, assert} = require('vl-ui-core').Test.Setup;

class VlMapSelectActionPage extends Page {
  async getSelectAction() {
    return this._getSelectAction('#select-action');
  }

  async getClusteredSelectAction() {
    return this._getSelectAction('#select-action-cluster');
  }

  async clickPointFeature(id) {
    const map = await this._getMap('#map-with-select-action');
    const layers = await map.getLayers();
    assert.isNotEmpty(layers);
    const layer = layers[0];
    await layer.clickPointFeatureOnMap(id, map);
    return this._waitForFeatureToBeSelected(id);
  }

  async _waitForFeatureToBeSelected(id) {
    const selectAction = await this.getSelectAction();
    return this.driver.wait(async () => {
      const selectedId = await this.driver.executeScript(`return arguments[0]._action.selectedFeature && arguments[0]._action.selectedFeature.getId()`, selectAction);
      return selectedId === id;
    }, 5000);
  }

  async getLogText() {
    const log = await this.driver.findElement(By.css('#select-action-log'));
    return log.getText();
  }

  async load() {
    await super.load(Config.baseUrl + '/demo/vl-map-select-action.html');
  }

  async _getSelectAction(selector) {
    return new VlMapSelectAction(this.driver, selector);
  }

  async _getLayer(layerClass, selector) {
    return new layerClass(this.driver, selector);
  }

  async _getMap(selector) {
    return new VlMap(this.driver, selector);
  }
}

module.exports = VlMapSelectActionPage;
