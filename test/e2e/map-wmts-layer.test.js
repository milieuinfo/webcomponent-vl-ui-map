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
    const visible = await layer.isVisible();
    assert.isTrue(visible);
    const name = await layer.getName();
    const url = await layer.getUrl();
    const layerName = await layer.getLayer();
    assert.equal(name, 'GRB Wegenkaart');
    assert.equal(layerName, 'grb_sel');
    assert.equal(url, 'https://tile.informatievlaanderen.be/ws/raadpleegdiensten/wmts');
  });
});
