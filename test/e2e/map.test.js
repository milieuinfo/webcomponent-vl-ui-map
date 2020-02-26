
const { assert, driver } = require('vl-ui-core').Test.Setup;
const VlMapPage = require('./pages/vl-map.page');

describe('vl-map', async () => {
    const vlMapPage = new VlMapPage(driver);

    before(() => {
        return vlMapPage.load();
    });

    it("Dummy test om browsers te sluiten", () => {
    	assert.isTrue(true);
    });
});
