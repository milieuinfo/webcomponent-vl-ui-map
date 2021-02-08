const {assert, getDriver} = require('vl-ui-core').Test.Setup;
const VlWmtsLayerPage = require('./pages/vl-map-wmts-layer.page');

describe('vl-map-features-layer', async () => {
  let page;

  before(() => {
    page = new VlWmtsLayerPage(getDriver());
    return page.load();
  });

  it('als gebruiker kan ik de details van de wmts opvragen', async () => {
    const layer = (await (await page.getMapWithStandardLayer()).getLayers())[0];
//    const url = await layer.getUrl();
//    assert.equal(url, "https://tile.informatievlaanderen.be/ws/raadpleegdiensten/wmts");
  });
});
