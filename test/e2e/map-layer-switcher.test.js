
const {assert, driver} = require('vl-ui-core').Test.Setup;
const VlMapLayerSwitcherPage = require('./pages/vl-map-layer-switcher.page');

describe('vl-map-layer-switcher', async () => {
  const vlMapPage = new VlMapLayerSwitcherPage(driver);

  before(() => {
    return vlMapPage.load();
  });

  it('de kaartlaag checkbox zal standaard aangevinkt zijn als de laag zichtbaar is', async () => {
    const map = await vlMapPage.getMap();
    const layerSwitcher = await map.getLayerSwitcher();
    const checkbox = await layerSwitcher.getCheckboxForLayer('layer');
    await assert.eventually.isTrue(checkbox.isChecked());
  });

  it('als gebruiker kan ik een kaartlaag tonen en verbergen', async () => {
    const map = await vlMapPage.getMap();
    const sideSheet = await map.getSideSheet();
    const layerSwitcher = await map.getLayerSwitcher();
    const layers = await map.getLayers();
    const layer = layers[0];

    await assert.eventually.isFalse(sideSheet.isOpen());
    await sideSheet.open();
    await assert.eventually.isTrue(sideSheet.isOpen());
    await assert.eventually.isTrue(layer.isVisible());

    const checkbox = await layerSwitcher.getCheckboxForLayer('layer');
    await assert.eventually.isTrue(layer.isVisible());
    await checkbox.click();
    await assert.eventually.isFalse(layer.isVisible());
    await checkbox.click();
    await assert.eventually.isTrue(layer.isVisible());
  });
});

