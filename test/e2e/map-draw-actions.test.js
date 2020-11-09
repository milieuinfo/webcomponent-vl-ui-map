const {assert, driver} = require('vl-ui-core').Test.Setup;
const VlMapDrawActionsPage = require('./pages/vl-map-draw-actions.page');

describe('vl-map-draw-action', async () => {
  const vlMapPage = new VlMapDrawActionsPage(driver);

  before(() => {
    return vlMapPage.load();
  });

  it('als gebruiker kan ik punten tekenen op een kaart', async () => {
    const map = await vlMapPage.getMapWithDrawPointAction();
    const action = await vlMapPage.getDrawPointAction();
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