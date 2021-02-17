const {assert, getDriver} = require('vl-ui-core').Test.Setup;
const VlMapFeaturesLayerPage = require('./pages/vl-map-features-layer.page');

describe('vl-map-features-layer', async () => {
  let page;

  before(() => {
    page = new VlMapFeaturesLayerPage(getDriver());
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
    const layer = (await (await page.getMapWithStandardLayer()).getLayers())[0];
    const features = await layer.getFeatures();
    assert.equal(features.length, 3);
  });
});
