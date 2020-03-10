const { assert, driver } = require('vl-ui-core').Test.Setup;
const VlMapCircleStylePage = require('./pages/vl-map-circle-style.page');

describe('vl-map-circle-style', async() => {
    const vlMapPage = new VlMapCircleStylePage(driver);

    before(async () => {
        return vlMapPage.load();
    });

    it('ik kan een feature met standaard circle stijl definieren', async () => {
        const map = await vlMapPage.getStandaardCircleStyleMap();
        const features = await map.getFeatures();
    });

    it('ik kan een feature met aangepaste circle stijl definieren', async () => {

    });

    it('ik kan een geclusterde features definieren', async () => {

    });
})
