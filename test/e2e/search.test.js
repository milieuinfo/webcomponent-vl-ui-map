const { assert, driver } = require('vl-ui-core').Test.Setup;
const VlMapSearchPage = require('./pages/vl-map-search.page');

describe('vl-map-search', async() => {
    const vlMapPage = new VlMapSearchPage(driver);

    before(() => {
        return vlMapPage.load();
    });

    it('Als gebruiker kan ik zien dat het zoeken beschikbaar is', async () => {
        const map = await vlMapPage.getMap();

        await assert.eventually.isTrue(map.hasSearch());
    });
});
