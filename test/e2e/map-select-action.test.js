const {assert, getDriver} = require('vl-ui-core').Test.Setup;
const VlMapSelectActionPage = require('./pages/vl-map-select-action.page');

describe('vl-map-select-action', async () => {
  let vlMapPage;

  before(() => {
    vlMapPage = new VlMapSelectActionPage(getDriver());
    return vlMapPage.load();
  });

  it('als gebruiker kan ik het verschil zien tussen een select action met cluster en zonder', async () => {
    const clusteredSelectAction = await vlMapPage.getClusteredSelectAction();
    const selectAction = await vlMapPage.getSelectAction();
    await assert.eventually.isTrue(clusteredSelectAction.isClustered());
    await assert.eventually.isFalse(selectAction.isClustered());
  });

  it('als gebruiker zie ik dat de select actie actief staat', async () => {
    const selectAction = await vlMapPage.getSelectAction();
    await assert.eventually.isTrue(selectAction.isActive());
  });

  it('als gebruiker kan ik een feature selecteren', async () => {
    await vlMapPage.clickPointFeature(1);
    await assert.eventually.equal(vlMapPage.getLogText(), 'Feature met id 1 werd geselecteerd!');
  });
});
