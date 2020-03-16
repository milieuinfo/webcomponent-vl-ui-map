
const { assert, driver } = require('vl-ui-core').Test.Setup;
const VlMapOverviewMapPage = require('./pages/vl-map-overview-map.page');

 describe('vl-map-overview-map', async () => {
     const vlMapPage = new VlMapOverviewMapPage(driver);

     before(() => {
         return vlMapPage.load();
     });

     it('Als gebruiker zie ik dat de overviewmap wordt gerenderd', async () => {
         const map = await vlMapPage.getMap();

         await assert.eventually.isDefined(map.getOverviewMap());
     });

     it('Als gebruiker kan ik kan tussen de basiskaartlagen switchen', async () => {
         const map = await vlMapPage.getMap();
         await assert.eventually.equal(map.getActiveBaseLayerTitle(), 'GRB basis laag grijs');

         await map.toggleBaseLayer();

         await assert.eventually.equal(map.getActiveBaseLayerTitle(), 'GRB basis laag');
     });
 });

