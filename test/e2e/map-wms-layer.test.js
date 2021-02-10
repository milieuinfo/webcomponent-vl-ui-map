const {assert, getDriver} = require('vl-ui-core').Test.Setup;
const VlWmsLayerPage = require('./pages/vl-map-wms-layer.page');

describe('vl-map-wms-layer', async () => {
  let page;

  before(() => {
    page = new VlWmsLayerPage(getDriver());
    return page.load();
  });

  it('als gebruiker kan ik de details van de wms opvragen', async () => {
    const layer = (await (await page.getMapWithStandardLayer()).getWmsLayers())[0];

    await assert.eventually.isTrue(layer.isVisible());
    await assert.eventually.equal(layer.getName(), 'Beschermingszones');
    await assert.eventually.equal(layer.getUrl(), 'https://www.dov.vlaanderen.be/geoserver/wms');
    await assert.eventually.equal(layer.getLayers(), 'grondwater:beschermingszones_2014');
    await assert.eventually.equal(layer.getStyles(), '');
    await assert.eventually.equal(layer.getVersion(), '1.3.0');
    await assert.eventually.equal(layer.getOpacity(), '0.7');
    await assert.eventually.equal(layer.isTiled(), 'false');
  });
});