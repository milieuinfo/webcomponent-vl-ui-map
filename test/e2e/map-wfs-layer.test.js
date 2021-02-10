const {assert, getDriver} = require('vl-ui-core').Test.Setup;
const VlWfsLayerPage = require('./pages/vl-map-wfs-layer.page');

describe('vl-map-wfs-layer', async () => {
  let page;

  before(() => {
    page = new VlWfsLayerPage(getDriver());
    return page.load();
  });

  it.only('als gebruiker kan ik de details van de wfs opvragen', async () => {
    const layer = (await (await page.getMapWithStandardLayer()).getWfsLayers())[0];

    await assert.eventually.isTrue(layer.isVisible());
    await assert.eventually.equal(layer.getName(), 'Oppervlaktewaterlichamen');
    await assert.eventually.equal(layer.getUrl(), 'https://geoserver.vmm.be/geoserver/vmm/wfs');
    await assert.eventually.equal(layer.getLayers(), 'owl_l');
  });
});
