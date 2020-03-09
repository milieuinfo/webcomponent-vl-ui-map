
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

//     it('ik kan de escape functionaliteit uitschakelen', async () => {
//         // Uitgebreidere demo nodig want de kaart moet functionaliteit bevatten zodat we 
//         // kunnen controleren of de ESC-key effectief niets doet.
//         assert.isTrue(false);
//     });
    
//     it('ik kan de rotatie functionaliteit uitschakelen', async () => {
//         // rotatie functionaliteit moet toegevoegd worden
//         assert.isTrue(false);
//     });

//     xit('ik kan de mouse wheel zoom functionaiteit uitschakelen', async () => {
//         // Selenium ondersteunt het scrollen via de mouse wheel niet
//     });

// });

describe('vl-map-overview-map', async () => {
    const vlMapPage = new VlMapOverviewMapPage(driver);

    before(async () => {
        return vlMapPage.load();
    });

    it('de overviewmap wordt gerendert', async () => {
        const map = await vlMapPage.getMap();
        await assert.eventually.isTrue(map.hasOverviewMap());
    });

    it('ik kan tussen de kaartlagen switchen', async () => {
        const map = await vlMapPage.getMap();
        const bla = await map.getActiveLayer();
        console.log(bla);
    });
});

// describe('vl-map-circle-style', async() => {
//     const vlMapPage = new VlMapCircleStylePage(driver);

//     before(async () => {
//         return vlMapPage.load();
//     });

//     it('ik kan een feature met standaard circle stijl definieren', async () => {

//     });

//     it('ik kan een feature met aangepaste circle stijl definieren', async () => {

//     });

//     it('ik kan een geclusterde features definieren', async () => {

//     });
// })
