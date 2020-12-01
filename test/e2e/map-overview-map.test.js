
const {assert, getDriver} = require('vl-ui-core').Test.Setup;
const VlMapOverviewMapPage = require('./pages/vl-map-overview-map.page');

describe('vl-map-overview-map', async () => {
  let vlMapPage;

  before(() => {
    vlMapPage = new VlMapOverviewMapPage(getDriver());
    return vlMapPage.load();
  });

  it('als gebruiker zie ik dat de overviewmap wordt gerenderd', async () => {
    const map = await vlMapPage.getMap();

    await assert.eventually.isDefined(map.getOverviewMap());
  });

  it('als gebruiker kan ik kan tussen de basiskaartlagen switchen', async () => {
    const map = await vlMapPage.getMap();
    await assert.eventually.equal(map.getActiveBaseLayerTitle(), 'GRB basis laag grijs');
    const overviewMap = await map.getOverviewMap();

    for (const layerName of ['GRB basis laag', 'GRB ortho laag', 'GRB basis laag grijs']) {
      await overviewMap.toggleBaseLayer();
      await assert.eventually.equal(map.getActiveBaseLayerTitle(), layerName);
    }
  });
});

