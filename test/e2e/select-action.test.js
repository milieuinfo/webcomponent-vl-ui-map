const {assert, driver} = require('vl-ui-core').Test.Setup;
const VlMapSelectActionPage = require('./pages/vl-map-select-action.page');

describe('vl-map-select-action', async () => {
  const vlMapPage = new VlMapSelectActionPage(driver);

  before(async () => {
    return vlMapPage.load();
  });

  it('Als gebruiker kan ik het verschil zien tussen een select action met cluster en zonder', async () => {
    const clusteredSelectAction = await vlMapPage.getClusteredSelectAction();
    const selectAction = await vlMapPage.getSelectAction();

    await assert.eventually.isTrue(clusteredSelectAction.isClustered());
    await assert.eventually.isFalse(selectAction.isClustered());
  });

  it('Als gebruiker zie ik dat de select actie actief staat', async () => {
    const selectAction = await vlMapPage.getSelectAction();

    await assert.eventually.isTrue(selectAction.isActive());
  });

  it('Als gebruiker kan ik een feature selecteren', async () => {
    await vlMapPage.clickPointFeature(1);

    await assert.eventually.equal(vlMapPage.getLogText(), 'Feature met id 1 werd geselecteerd!');
  });
});
