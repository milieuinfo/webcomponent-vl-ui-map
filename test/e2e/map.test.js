
const { assert, driver } = require('vl-ui-core').Test;
const VlMapPage = require('./pages/vl-map.page');

describe('vl-map', async () => {
    const vlMapPage = new VlMapPage(driver);

    before(() => {
        return vlMapPage.load();
    });

});
