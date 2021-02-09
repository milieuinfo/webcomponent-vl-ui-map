const {assert, getDriver} = require('vl-ui-core').Test.Setup;
const VlMapSideSheetMenuItem = require('./pages/vl-map-side-sheet-menu-item.page');

describe('vl-map-side-sheet-menu-item', async () => {
  let vlMapPage;

  before(() => {
    vlMapPage = new VlMapSideSheetMenuItem(getDriver());
    return vlMapPage.load();
  });

  it('als gebruiker zie ik dat de titel een waarde heeft', async () => {
    const map = await vlMapPage.getMap();
    const sideSheet = await map.getSideSheet();
    const menuItem = await sideSheet.getMenuItem();
    await assert.eventually.equal(menuItem.getTitle(), 'Terug naar resultaten');
  });
});
