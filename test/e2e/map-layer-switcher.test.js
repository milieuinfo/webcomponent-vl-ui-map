
const {assert, driver} = require('vl-ui-core').Test.Setup;
const VlMapLayerSwitcherPage = require('./pages/vl-map-layer-switcher.page');

describe('vl-map-layer-switcher', async () => {
  const vlMapPage = new VlMapLayerSwitcherPage(driver);

  before(() => {
    return vlMapPage.load();
  });

  it('de kaartlaag checkbox zal standaard aangevinkt zijn als de laag zichtbaar is', async () => {
    const map = await vlMapPage.getMapWithLayerSwitcher();
    const layerSwitcher = await map.getLayerSwitcher();
    const checkbox = await layerSwitcher.getCheckboxForLayer('Kaartlaag 1');
    await assert.eventually.isTrue(checkbox.isChecked());
  });

  it('als gebruiker kan ik een kaartlaag tonen en verbergen', async () => {
    const map = await vlMapPage.getMapWithCustomLayerSwitcher();
    const sideSheet = await map.getSideSheet();
    const layerSwitcher = await map.getLayerSwitcher();
    const layers = await map.getLayers();
    const layer = layers[0];

    await assert.eventually.isFalse(sideSheet.isOpen());
    await sideSheet.open();
    await assert.eventually.isTrue(sideSheet.isOpen());
    await assert.eventually.isTrue(layer.isVisible());

    const checkbox = await layerSwitcher.getCheckboxForLayer('layer-1');
    await assert.eventually.isTrue(layer.isVisible());
    await checkbox.click();
    await assert.eventually.isFalse(layer.isVisible());
    await checkbox.click();
    await assert.eventually.isTrue(layer.isVisible());
  });

  it('als gebruiker kan ik een kaartlaag met resoluties tonen en verbergen op het juiste zoom niveau', async () => {
    const map = await vlMapPage.getMapWithLayerSwitcher();
    const sideSheet = await map.getSideSheet();
    const layerSwitcher = await map.getLayerSwitcher();
    await sideSheet.open();
    const checkbox = await layerSwitcher.getCheckboxForLayer('resolution-layer');
    await assert.eventually.isTrue(checkbox.isDisabled());
    await map.zoomIn();
    await driver.wait(async () => !(await checkbox.isDisabled()));
    await assert.eventually.isFalse(checkbox.isDisabled());
    await map.zoomIn();
    await driver.wait(async () => await checkbox.isDisabled());
    await assert.eventually.isTrue(checkbox.isDisabled());
  });
});

