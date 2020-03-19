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

    it('Als gebruiker kan ik de zoekfunctionaliteit gebruiken en zal de kaart zoomen', async () => {
        const map = await vlMapPage.getMap();
        const search = await map.getSearch();
        await assert.eventually.isTrue(map.hasZoom(2));

        await search.open();
        await search.search('Tems');
        await search.selectByIndex(0);

        await assert.eventually.equal(search.getSelectedValue(), 'Temse');
        await assert.eventually.isTrue(map.hasZoom(5));
    });

    //todo fix
    it('Als gebruiker kan ik zoeken met de zoekfunctionaliteit maar als er niets gevonden werd zijn er geen opties', async () => {
        const map = await vlMapPage.getMap();
        const search = await map.getSearch();
        await assert.eventually.isTrue(map.hasZoom(2));

        await search.open();
        await search.search('Foobar');

        await assert.eventually.isTrue(search.hasNoResults());
    });

    it('Als gebruiker zie ik dat de kaart gezoomd is nadat ik de zoekfunctionaliteit gebruik waarbij die pas achteraf gekoppeld werd met de kaart', async () => {
        const map = await vlMapPage.getBindMap();
        const search = await vlMapPage.getBindMapSearch();
        await assert.eventually.isTrue(map.hasZoom(2));

        await vlMapPage.clickBindMapButton();
        await search.open();
        await search.search('Tems');
        await search.selectByIndex(0);

        await assert.eventually.equal(search.getSelectedValue(), 'Temse');
        await assert.eventually.isTrue(map.hasZoom(5));
    });
});
