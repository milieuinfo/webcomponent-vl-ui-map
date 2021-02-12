const {assert, getDriver} = require('vl-ui-core').Test.Setup;
const VlMapDeleteActionPage = require('./pages/vl-map-delete-action.page');

describe('vl-map-delete-action', async () => {
  let vlMapPage;
  let driver;

  beforeEach(() => {
    driver = getDriver();
    vlMapPage = new VlMapDeleteActionPage(getDriver());
    return vlMapPage.load();
  });

  it('als gebruiker zie ik dat de delete actie actief staat', async () => {
    const deleteAction = await vlMapPage.getDeleteAction();
    await assert.eventually.isTrue(deleteAction.isActive());
  });

  it('kan features deleten door er op te klikken', async () => {
    const deleteAction = await vlMapPage.getDeleteAction();
    const layer = await deleteAction.getLayer();
    await driver.wait(async () => {
      const aantalFeatures = await layer.getNumberOfFeatures();
      return aantalFeatures == 3;
    });
    await deleteAction.removeFeature(1);
    await driver.wait(async () => {
      const aantalFeatures = await layer.getNumberOfFeatures();
      return aantalFeatures == 2;
    });
    await deleteAction.removeFeature(2);
    await driver.wait(async () => {
      const aantalFeatures = await layer.getNumberOfFeatures();
      return aantalFeatures == 1;
    });
    await deleteAction.removeFeature(3);
    await driver.wait(async () => {
      const aantalFeatures = await layer.getNumberOfFeatures();
      return aantalFeatures == 0;
    });
  });

  it('kan features deleten door rechthoek te trekken over alle features die weg mogen', async () => {
    const deleteAction = await vlMapPage.getDeleteAction();
    const layer = await deleteAction.getLayer();
    await driver.wait(async () => {
      const aantalFeatures = await layer.getNumberOfFeatures();
      return aantalFeatures == 3;
    });
    await deleteAction.removeAllInRectangle([80000, 210000], [145000, 170000]);
    await driver.wait(async () => {
      const aantalFeatures = await layer.getNumberOfFeatures();
      return aantalFeatures == 0;
    });
  });
});
