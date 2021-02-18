const {assert, getDriver} = require('vl-ui-core').Test.Setup;
const VlMapDeleteActionPage = require('./pages/vl-map-delete-action.page');

describe('vl-map-delete-action', async () => {
  let vlMapPage;

  beforeEach(() => {
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
    await assert.eventually.equal(layer.getNumberOfFeatures(), 3);
    await deleteAction.removeFeature(1);
    await assert.eventually.equal(layer.getNumberOfFeatures(), 2);
    await deleteAction.removeFeature(2);
    await assert.eventually.equal(layer.getNumberOfFeatures(), 1);
    await deleteAction.removeFeature(3);
    await assert.eventually.equal(layer.getNumberOfFeatures(), 0);
  });

  it('kan features deleten door rechthoek te trekken over alle features die weg mogen', async () => {
    const deleteAction = await vlMapPage.getDeleteAction();
    const layer = await deleteAction.getLayer();
    await assert.eventually.equal(layer.getNumberOfFeatures(), 3);
    await deleteAction.removeAllInRectangle([80000, 210000], [230000, 170000]);
    await assert.eventually.equal(layer.getNumberOfFeatures(), 0);
  });
});
