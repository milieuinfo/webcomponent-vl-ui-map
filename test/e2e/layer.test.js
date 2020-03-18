const { assert, driver } = require('vl-ui-core').Test.Setup;
const VlMapLayerPage = require('./pages/vl-map-layer.page');

describe('vl-map-layer', async() => {
    const page = new VlMapLayerPage(driver);

    before(() => {
        return page.load();
    });

    it('Als gebruiker zie ik het verschil tussen een clustered layer en niet geclusterde layer', async () => {
        const standaardLayer = await page.getStandaardLayer();
        const clusteredLayer = await page.getClusteredLayer();

        await assert.eventually.isFalse(standaardLayer.isClustered());
        await assert.eventually.isNull(standaardLayer.getClusterDistance());
        await assert.eventually.isTrue(clusteredLayer.isClustered());
        await assert.eventually.equal(clusteredLayer.getClusterDistance(), 100);
    });

    it('Als gebruiker zie ik het verschil tussen een auto extent layer en niet auto extent layer', async () => {
        const standaardLayer = await page.getStandaardLayer();
        const autoExtentLayer = await page.getAutoExtentLayer();

        await assert.eventually.isFalse(standaardLayer.hasAutoExtent());
        await assert.eventually.isNull(standaardLayer.getAutoExtentMaxZoom());
        await assert.eventually.isTrue(autoExtentLayer.hasAutoExtent());
        await assert.eventually.equal(autoExtentLayer.getAutoExtentMaxZoom(), '3');
    });

    it('Als gebruiker kan ik het aantal features opvragen', async () => {
        const standaardLayer = await page.getStandaardLayer();

        const features = await standaardLayer.getFeatures();
        assert.equal(features.length, 3);
    });
});
