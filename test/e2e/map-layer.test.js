const {assert, driver} = require('vl-ui-core').Test.Setup;
const VlMapLayerPage = require('./pages/vl-map-layer.page');

describe('vl-map-layer', async () => {
  const page = new VlMapLayerPage(driver);

  before(() => {
    return page.load();
  });

  it('als gebruiker zie ik het verschil tussen een clustered layer en niet geclusterde layer', async () => {
    const standardLayer = (await (await page.getMapWithStandardLayer()).getLayers())[0];
    const clusteredLayer = (await (await page.getMapWithClusteredLayer()).getLayers())[0];

    await assert.eventually.isFalse(standardLayer.isClustered());
    await assert.eventually.isNull(standardLayer.getClusterDistance());
    await assert.eventually.isTrue(clusteredLayer.isClustered());
    await assert.eventually.equal(clusteredLayer.getClusterDistance(), 100);
  });

  it('als gebruiker zie ik het verschil tussen een auto extent layer en niet auto extent layer', async () => {
    const standardLayer = (await (await page.getMapWithStandardLayer()).getLayers())[0];
    const autoExtentLayer = (await (await page.getMapWithAutoExtentLayer()).getLayers())[0];

    await assert.eventually.isFalse(standardLayer.hasAutoExtent());
    await assert.eventually.isNull(standardLayer.getAutoExtentMaxZoom());
    await assert.eventually.isTrue(autoExtentLayer.hasAutoExtent());
    await assert.eventually.equal(autoExtentLayer.getAutoExtentMaxZoom(), '3');
  });

  it('als gebruiker kan ik het aantal features opvragen', async () => {
    const standardLayer = (await (await page.getMapWithStandardLayer()).getLayers())[0];

    const features = await standardLayer.getFeatures();
    assert.equal(features.length, 3);
  });
});
