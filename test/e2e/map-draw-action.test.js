const {assert, driver} = require('vl-ui-core').Test.Setup;
const VlMapDrawActionPage = require('./pages/vl-map-draw-action.page');

describe('vl-map-draw-action', async () => {
  const vlMapPage = new VlMapDrawActionPage(driver);

  before(() => {
    return vlMapPage.load();
  });

  it('als gebruiker kan ik punten tekenen op een kaart', async () => {
    const map = await vlMapPage.getMapWithDrawAction();
    const action = await vlMapPage.getDrawAction();
    const layers = await map.getLayers();
    const layer = layers[0];
    let features = await layer.getFeatures();
    assert.lengthOf(features, 0);
    await action.draw();
    features = await layer.getFeatures();
    assert.lengthOf(features, 1);
    await action.draw({x: 100, y: 100});
    features = await layer.getFeatures();
    assert.lengthOf(features, 2);
  });
});
