const {assert, getDriver} = require('vl-ui-core').Test.Setup;
const VlWmsLayerPage = require('./pages/vl-map-wms-layer.page');

describe('vl-map-wms-layer', async () => {
  let page;

  before(() => {
    page = new VlWmsLayerPage(getDriver());
    return page.load();
  });

  it('als gebruiker kan ik de details van de tiled wms opvragen', async () => {
    const layer = (await (await page.getMapWithTiledWmsLayer()).getTiledWmsLayers())[0];

    await assert.eventually.isTrue(layer.isVisible());
    await assert.eventually.equal(layer.getName(), 'Gemeentegrenzen');
    await assert.eventually.equal(layer.getUrl(), 'https://geoservices.informatievlaanderen.be/raadpleegdiensten/GRB/wms');
    await assert.eventually.equal(layer.getLayers(), 'GEM_GRENS');
    await assert.eventually.equal(layer.getVersion(), '1.3.0');
    await assert.eventually.equal(layer.getOpacity(), '1');
  });

  it('als gebruiker kan ik de details van de image wms opvragen', async () => {
    const layer = (await (await page.getMapWithImageWmsLayer()).getImageWmsLayers())[0];

    await assert.eventually.isTrue(layer.isVisible());
    await assert.eventually.equal(layer.getName(), 'Beschermingszones');
    await assert.eventually.equal(layer.getUrl(), 'https://www.dov.vlaanderen.be/geoserver/wms');
    await assert.eventually.equal(layer.getLayers(), 'grondwater:beschermingszones_2014');
    await assert.eventually.equal(layer.getVersion(), '1.3.0');
    await assert.eventually.equal(layer.getOpacity(), '0.7');
  });
});
