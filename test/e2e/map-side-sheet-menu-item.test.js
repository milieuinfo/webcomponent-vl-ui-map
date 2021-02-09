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
    const menu = await sideSheet.getMenu();
    const menuItem = await menu.getMenuItem(1);
    await assert.eventually.equal(menuItem.getTitle(), 'Terug naar resultaten');
  });

  it('als gebruiker zie ik dat er inhoud binnen de menu item kan zitten', async () => {
    const map = await vlMapPage.getMap();
    const sideSheet = await map.getSideSheet();
    const menu = await sideSheet.getMenu();
    const menuItem = await menu.getMenuItem(1);
    const slotElements = await menuItem.getMessagesSlotElements();
    await assert.eventually.equal(slotElements[0].getText(), 'Gelieve een resultaat aan te maken');
  });
});
