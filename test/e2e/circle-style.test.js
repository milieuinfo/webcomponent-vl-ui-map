const { assert, driver } = require('vl-ui-core').Test.Setup;
const VlMapCircleStylePage = require('./pages/vl-map-circle-style.page');

describe('vl-map-circle-style', async() => {
    const vlMapPage = new VlMapCircleStylePage(driver);

    before(() => {
        return vlMapPage.load();
    });

    it('ik kan een layer met circle stijl definieren', async () => {
        const layer = await vlMapPage.getStandaardLayer();

        await assert.eventually.isTrue(layer.hasCircleStyle());
    });

    it('ik kan een layer met circle stijl definiëren met aangepaste stijl', async () => {
        const layer = await vlMapPage.getAangepasteCircleStyleLayer();

        await assert.eventually.isTrue(layer.hasCircleStyle());
        const style = await layer.getCircleStyle();
        await assert.eventually.equal(style.getColor(), '#fff');
        await assert.eventually.equal(style.getSize(), '10');
        await assert.eventually.equal(style.getBorderColor(), '#000');
        await assert.eventually.equal(style.getBorderSize(), '2');
        await assert.eventually.isNull(style.getTextColor());
        await assert.eventually.isNull(style.getTextOffsetX());
        await assert.eventually.isNull(style.getTextOffsetY());
    });
});
