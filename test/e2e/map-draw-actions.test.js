const {assert, getDriver} = require('vl-ui-core').Test.Setup;
const VlMapDrawActionsPage = require('./pages/vl-map-draw-actions.page');

describe('vl-map-draw-action', async () => {
  let vlMapPage;

  before(() => {
    vlMapPage = new VlMapDrawActionsPage(getDriver());
    return vlMapPage.load();
  });

  it('als gebruiker kan ik punten tekenen op een kaart', async () => {
    const map = await vlMapPage.getMapWithDrawPointAction();
    const action = await vlMapPage.getDrawPointAction();
    const layers = await map.getLayers();
    assert.isNotEmpty(layers);
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

  it('als gebruiker kan ik lijnen tekenen op een kaart', async () => {
    const map = await vlMapPage.getMapWithDrawLineAction();
    const action = await vlMapPage.getDrawLineAction();
    const layers = await map.getLayers();
    assert.isNotEmpty(layers);
    const layer = layers[0];

    let features = await layer.getFeatures();
    assert.lengthOf(features, 0);

    await action.draw();
    features = await layer.getFeatures();
    assert.lengthOf(features, 1);

    await action.draw({x: 50, y: 50}, {x: 100, y: 100});
    features = await layer.getFeatures();
    assert.lengthOf(features, 2);
  });

  it('als gebruiker kan ik polygonen tekenen op een kaart', async () => {
    const map = await vlMapPage.getMapWithDrawPolygonAction();
    const action = await vlMapPage.getDrawPolygonAction();
    const layers = await map.getLayers();
    assert.isNotEmpty(layers);
    const layer = layers[0];

    let features = await layer.getFeatures();
    assert.lengthOf(features, 0);

    await action.draw();
    features = await layer.getFeatures();
    assert.lengthOf(features, 1);

    await action.draw({x: 30, y: 30}, {x: 30, y: 60}, {x: 60, y: 60}, {x: 60, y: 30});
    features = await layer.getFeatures();
    assert.lengthOf(features, 2);
  });

  it('als gebruiker kan ik punten tekenen op een kaart', async () => {
    const map = await vlMapPage.getMapWithDrawPointSnapAction();
    await map.scrollIntoView();
    const action = await vlMapPage.getDrawPointSnapAction();
    const layers = await map.getLayers();
    assert.isNotEmpty(layers);
    const layer = layers[0];

    const search = await map.getSearch();
    await search.open();
    await search.zoomTo('Hellegatstraat, Puurs-Sint-Amands');

    await action.drawOnCoordinate({x: 147341, y: 197991});
    let features = await layer.getFeatureCoordinates();
    assert.lengthOf(features, 1);
    assert.closeTo(features[0][0], 147341, 5);
    assert.closeTo(features[0][1], 197991, 5);

    await action.drawOnCoordinate({x: 147441, y: 197991});
    features = await layer.getFeatureCoordinates();
    assert.lengthOf(features, 2);
    assert.closeTo(features[1][0], 147361, 5);
    assert.closeTo(features[1][1], 197968, 5);
  });
});

