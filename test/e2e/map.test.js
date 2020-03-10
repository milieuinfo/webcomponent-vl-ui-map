
const { assert, driver } = require('vl-ui-core').Test.Setup;
const VlMapPage = require('./pages/vl-map.page');
const VlMapCircleStylePage = require('./pages/vl-map-circle-style.page');
const VlMapOverviewMapPage = require('./pages/vl-map-overview-map.page');

// describe('vl-map', async () => {
//     const vlMapPage = new VlMapPage(driver);

//     before(async () => {
//         return vlMapPage.load();
//     });

//     it('de map wordt gerendered', async () => {
//         const map = await vlMapPage.getKaartMetVerschillendeGrbKaartlagen();
//         await assert.eventually.isTrue(map.isDisplayed());
//     });

//     it('ik kan verschillende kaartlagen definieren', async () => {
//         const map = await vlMapPage.getKaartMetVerschillendeGrbKaartlagen();
//         const lagen = await map.getKaartlagen();
        
//         assert.include(lagen, 'vl-map-baselayer-grb-gray');
//         assert.include(lagen, 'vl-map-baselayer-grb');
//         assert.include(lagen, 'vl-map-baselayer-grb-ortho');
//     });

//     xit('ik kan de escape functionaliteit uitschakelen', async () => {
//         // Uitgebreidere demo nodig want de kaart moet functionaliteit bevatten zodat we 
//         // kunnen controleren of de ESC-key effectief niets doet.
//     });
    
//     xit('ik kan de rotatie functionaliteit uitschakelen', async () => {
//         // rotatie functionaliteit moet toegevoegd worden
//     });

//     xit('ik kan de mouse wheel zoom functionaiteit uitschakelen', async () => {
//         // Selenium ondersteunt het scrollen via de mouse wheel niet
//     });

// });

// describe('vl-map-overview-map', async () => {
//     const vlMapPage = new VlMapOverviewMapPage(driver);

//     before(async () => {
//         return vlMapPage.load();
//     });

//     it('de overviewmap wordt gerendert', async () => {
//         const map = await vlMapPage.getMap();
//         await assert.eventually.isDefined(map.getOverviewMap());
//     });

//     it('ik kan tussen de kaartlagen switchen', async () => {
//         const map = await vlMapPage.getMap();
//         const layerName = await map.getActiveLayer();
        
//         await map.toggleLayer();
        
//         const layerNameAfterUpdate = await map.getActiveLayer();
//         assert.notEqual(layerName, layerNameAfterUpdate);
//     });
// });

describe('vl-map-circle-style', async() => {
    const vlMapPage = new VlMapCircleStylePage(driver);

    before(async () => {
        return vlMapPage.load();
    });

    it('ik kan een feature met standaard circle stijl definieren', async () => {
        const map = await vlMapPage.getStandaardCircleStyleMap();
        const features = await map.getFeatures();
    });

    it('ik kan een feature met aangepaste circle stijl definieren', async () => {

    });

    it('ik kan een geclusterde features definieren', async () => {

    });
})
