const { assert, driver } = require('vl-ui-core').Test.Setup;
const VlMapLayerPage = require('./pages/vl-map-layer.page');

describe('vl-map-layer', async() => {
    const page = new VlMapLayerPage(driver);

    before(() => {
        return page.load();
    });

    it('Als gebruiker kan ik de url en type van een grb baselayer bevragen', async () => {
        const baseLayerGrb = await page.getBaseLayerGrb();

        await assert.eventually.equal(baseLayerGrb.getUrl(), 'https://tile.informatievlaanderen.be/ws/raadpleegdiensten/wmts');
        await assert.eventually.equal(baseLayerGrb.getType(), 'wmts');
    });

    it('Als gebruiker zie ik het verschil tussen een grijze grb baselayer en de gewone grb baselayer aan de layer en title', async () => {
        const baseLayerGrbGray = await page.getBaseLayerGrbGray();
        const baseLayerGrb = await page.getBaseLayerGrb();

        await assert.eventually.equal(baseLayerGrbGray.getLayer(), 'grb_bsk_grijs');
        await assert.eventually.equal(baseLayerGrbGray.getTitle(), 'GRB basis laag grijs');
        await assert.eventually.equal(baseLayerGrb.getLayer(), 'grb_bsk');
        await assert.eventually.equal(baseLayerGrb.getTitle(), 'GRB basis laag');
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
});
