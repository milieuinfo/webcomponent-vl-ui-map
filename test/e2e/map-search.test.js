const {assert, getDriver} = require('vl-ui-core').Test.Setup;
const VlMapSearchPage = require('./pages/vl-map-search.page');

describe('vl-map-search', async () => {
  let vlMapPage;

  before(() => {
    vlMapPage = new VlMapSearchPage(getDriver());
    return vlMapPage.load();
  });

  it('als gebruiker kan ik zien dat het zoeken beschikbaar is', async () => {
    const map = await vlMapPage.getMap();
    await assert.eventually.isTrue(map.hasSearch());
  });

  it('als gebruiker kan ik zoeken met de zoekfunctionaliteit', async () => {
    const map = await vlMapPage.getMap();
    const search = await map.getSearch();
    await search.open();
    await search.search('Tems');
    await assert.eventually.isFalse(search.hasNoResults());
  });

  it('als gebruiker kan ik de zoekfunctionaliteit gebruiken en zal de kaart zoomen', async () => {
    const map = await vlMapPage.getMap();
    const search = await map.getSearch();
    await assert.eventually.isTrue(map.hasZoom(2));
    await search.open();
    await search.zoomTo('Tems');
    await assert.eventually.isTrue(map.hasZoom(5));
  });

  it('als gebruiker kan ik zoeken met de zoekfunctionaliteit maar als er niets gevonden werd zijn er geen opties', async () => {
    const map = await vlMapPage.getMap();
    const search = await map.getSearch();

    await search.open();
    await search.search('Foobar');

    await assert.eventually.isTrue(search.hasNoResults());
  });

  it('als gebruiker zie ik dat de kaart gezoomd is nadat ik de zoekfunctionaliteit gebruik waarbij die pas achteraf gekoppeld werd met de kaart', async () => {
    const map = await vlMapPage.getBindMap();
    const search = await vlMapPage.getBindMapSearch();
    await assert.eventually.isTrue(map.hasZoom(2));

    await vlMapPage.clickBindMapButton();
    await search.zoomTo('Tems');

    await assert.eventually.equal(search.getSelectedValue(), 'Temse');
    await assert.eventually.isTrue(map.hasZoom(5));
  });

  it('als gebruiker kan ik zoeken op Lambert coördinaat en zal de kaart zoomen', async () => {
    const map = await vlMapPage.getMap();
    const search = await map.getSearch();

    await search.open();
    await search.zoomTo('104719.27, 192387.25');

    await assert.eventually.isTrue(map.hasZoom(10));
  });

  it('als gebruiker kan ik zoeken op Lambert coördinaat, een voorgestelde locatie kiezen en zal de kaart zoomen', async () => {
    const map = await vlMapPage.getMap();
    const search = await map.getSearch();

    await search.open();
    await search.search('104719.27, 192387.25');
    await search.selectByIndex(1);

    await assert.eventually.isTrue(map.hasZoom(14));
  });
});
