const {assert, getDriver} = require('vl-ui-core').Test.Setup;
const VlMapDeleteActionPage = require('./pages/vl-map-delete-action.page');

describe('vl-map-delete-action', async () => {
  let vlMapPage;
  let driver;

  before(() => {
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
		  const aantalFeatures = await layer.getAantalFeatures();
		  return aantalFeatures == 3;
	  });
	  await deleteAction.removeFeature(1);
	  await driver.wait(async () => {
		  const aantalFeatures = await layer.getAantalFeatures();
		  return aantalFeatures == 2;
	  });
	  await deleteAction.removeFeature(2);
	  await driver.wait(async () => {
		  const aantalFeatures = await layer.getAantalFeatures();
		  return aantalFeatures == 1;
	  });
	  await new Promise(r => setTimeout(r, 2000));
	  await deleteAction.removeFeature(3);
	  await driver.wait(async () => {
		  const aantalFeatures = await layer.getAantalFeatures();
		  return aantalFeatures == 0;
	  });
  });
  
  
});
