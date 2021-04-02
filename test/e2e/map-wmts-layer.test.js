const {assert, getDriver} = require('vl-ui-core').Test.Setup;
const VlWmtsLayerPage = require('./pages/vl-map-wmts-layer.page');

describe('vl-map-wmts-layer', async () => {
  let page;

  before(() => {
    page = new VlWmtsLayerPage(getDriver());
    return page.load();
  });

  it('als gebruiker kan ik de details van de wmts opvragen', async () => {
    const layer = (await (await page.getMapWithStandardLayer()).getWmtsLayers())[0];
    await assert.eventually.isTrue(layer.isVisible);
    await assert.eventually.equal(layer.getName(), 'GRB Wegenkaart');
    await assert.eventually.equal(layer.getLaye(), 'grb_sel');
    await assert.eventually.equal(layer.getUrl(), 'https://tile.informatievlaanderen.be/ws/raadpleegdiensten/wmts');
  });
});
