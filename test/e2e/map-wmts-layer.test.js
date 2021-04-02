const {assert, getDriver} = require('vl-ui-core').Test.Setup;
const VlWmtsLayerPage = require('./pages/vl-map-wmts-layer.page');

describe('vl-map-wmts-layer', async () => {
  let page;

  before(() => {
    page = new VlWmtsLayerPage(getDriver());
    return page.load();
  });

  it('als gebruiker kan ik de details van de wmts opvragen', async () => {
    const map = await page.getMapWithStandardLayer();
    const layers = await map.getWmtsLayers();
    await assert.eventually.isTrue(layers[0].isVisible());
    await assert.eventually.equal(layers[0].getName(), 'GRB Wegenkaart');
    await assert.eventually.equal(layers[0].getLayer(), 'grb_sel');
    await assert.eventually.equal(layers[0].getUrl(), 'https://tile.informatievlaanderen.be/ws/raadpleegdiensten/wmts');
  });
});
