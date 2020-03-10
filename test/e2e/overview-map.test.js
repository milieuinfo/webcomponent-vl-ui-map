
const { assert, driver } = require('vl-ui-core').Test.Setup;
const VlMapOverviewMapPage = require('./pages/vl-map-overview-map.page');

 describe('vl-map-overview-map', async () => {
     const vlMapPage = new VlMapOverviewMapPage(driver);
     before(async () => {
         return vlMapPage.load();
     });
     it('de overviewmap wordt gerendert', async () => {
         const map = await vlMapPage.getMap();
         await assert.eventually.isDefined(map.getOverviewMap());
     });
     it('ik kan tussen de kaartlagen switchen', async () => {
         const map = await vlMapPage.getMap();
         const layerName = await map.getActiveLayer();
         await map.toggleLayer();
         const layerNameAfterUpdate = await map.getActiveLayer();
         assert.notEqual(layerName, layerNameAfterUpdate);
     });
 });

