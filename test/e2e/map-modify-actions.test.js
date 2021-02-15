const {assert, getDriver} = require('vl-ui-core').Test.Setup;
const VlMapModifyActionsPage = require('./pages/vl-map-modify-actions.page');

describe('vl-map-modify-action', async () => {
  let vlMapPage;
  const willebroek = [150390.63, 193371.12];

  before(() => {
    vlMapPage = new VlMapModifyActionsPage(getDriver());
    return vlMapPage.load();
  });

  it('als gebruiker kan ik een polygoon aanpassen op een kaart', async () => {
    const action = await vlMapPage.getModifyPolygonAction();

    const layer = await action.getLayer();
    await getDriver().wait(async () => (await layer.getNumberOfFeatures()) === 1);
    const geometry = (await layer.getFeature(1)).geometry;
    const gent = geometry.coordinates[0][0];

    await action.movePointByCoordinates(gent, willebroek);

    await getDriver().wait(async () => (await layer.getNumberOfFeatures()) === 1);
    assert.lengthOf(await layer.getFeatures(), 1);

    const modifiedGeometry = (await layer.getFeature(1)).geometry;
    assert.include(modifiedGeometry, {type: 'Polygon'});
    assert.notDeepEqual(modifiedGeometry, geometry);
  });

  it('als gebruiker kan ik een punt aanpassen op een kaart', async () => {
    const action = await vlMapPage.getModifyPointAction();

    const layer = await action.getLayer();
    await getDriver().wait(async () => (await layer.getNumberOfFeatures()) === 2);
    const geometry1 = (await layer.getFeature(1)).geometry;
    const mechelen = geometry1.coordinates;
    const feature2 = await layer.getFeature(2);

    await action.movePointByCoordinates(mechelen, willebroek);

    await getDriver().wait(async () => (await layer.getNumberOfFeatures()) === 2);
    assert.lengthOf(await layer.getFeatures(), 2);

    const modifiedGeometry = (await layer.getFeature(1)).geometry;
    assert.include(modifiedGeometry, {type: 'Point'});
    assert.notDeepEqual(modifiedGeometry, geometry1);
    assert.deepEqual(await layer.getFeature(2), feature2);
  });

  it('als gebruiker kan ik een lijn aanpassen op een kaart', async () => {
    const action = await vlMapPage.getModifyLineAction();

    const layer = await action.getLayer();
    await getDriver().wait(async () => (await layer.getNumberOfFeatures()) === 1);
    const geometry = (await layer.getFeature(1)).geometry;
    const antwerpen = geometry.coordinates[1];

    await action.movePointByCoordinates(antwerpen, willebroek);

    await getDriver().wait(async () => (await layer.getNumberOfFeatures()) === 1);
    assert.lengthOf(await layer.getFeatures(), 1);

    const modifiedGeometry = (await layer.getFeature(1)).geometry;
    assert.include(modifiedGeometry, {type: 'LineString'});
    assert.notDeepEqual(modifiedGeometry, geometry);
  });

  it('als gebruiker zie ik dat de aanpas actie actief staat', async () => {
    const action = await vlMapPage.getModifyPointAction();
    await assert.eventually.isTrue(action.isActive());
  });
});
