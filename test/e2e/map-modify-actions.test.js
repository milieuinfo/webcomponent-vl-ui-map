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
    const points = (await layer.getFeature(1)).geometry.coordinates[0];
    const gent = points[0];
    const mechelen = points[1];
    const antwerpen = points[2];
    const leuven = points[3];

    await action.movePointByCoordinates(gent, willebroek);

    await getDriver().wait(async () => (await layer.getNumberOfFeatures()) === 1);
    assert.lengthOf(await layer.getFeatures(), 1);

    const modifiedGeometry = (await layer.getFeature(1)).geometry;
    assert.include(modifiedGeometry, {type: 'Polygon'});
    assert.includeDeepMembers(modifiedGeometry.coordinates[0], [mechelen, antwerpen, leuven]);
    assert.notIncludeDeepMembers(modifiedGeometry.coordinates[0], [gent]);
  });

  it('als gebruiker kan ik een punt aanpassen op een kaart', async () => {
    const action = await vlMapPage.getModifyPointAction();

    const layer = await action.getLayer();
    await getDriver().wait(async () => (await layer.getNumberOfFeatures()) === 2);
    const mechelen = (await layer.getFeature(1)).geometry.coordinates;
    const antwerpen = (await layer.getFeature(2)).geometry.coordinates;

    await action.movePointByCoordinates(mechelen, willebroek);

    await getDriver().wait(async () => (await layer.getNumberOfFeatures()) === 2);
    assert.lengthOf(await layer.getFeatures(), 2);

    const modifiedGeometry = (await layer.getFeature(1)).geometry;
    assert.include(modifiedGeometry, {type: 'Point'});
    assert.notIncludeDeepMembers(modifiedGeometry.coordinates, mechelen);

    assert.deepOwnInclude((await layer.getFeature(2)).geometry, {type: 'Point', coordinates: antwerpen});
  });

  it('als gebruiker kan ik een lijn aanpassen op een kaart', async () => {
    const action = await vlMapPage.getModifyLineAction();

    const layer = await action.getLayer();
    await getDriver().wait(async () => (await layer.getNumberOfFeatures()) === 1);
    const lineCoordinates = (await layer.getFeature(1)).geometry.coordinates;
    const mechelen = lineCoordinates[0];
    const antwerpen = lineCoordinates[1];

    await action.movePointByCoordinates(antwerpen, willebroek);

    await getDriver().wait(async () => (await layer.getNumberOfFeatures()) === 1);
    assert.lengthOf(await layer.getFeatures(), 1);

    const modifiedGeometry = (await layer.getFeature(1)).geometry;
    assert.include(modifiedGeometry, {type: 'LineString'});
    assert.includeDeepMembers(modifiedGeometry.coordinates[0], mechelen);
    assert.notIncludeDeepMembers(modifiedGeometry.coordinates[0], antwerpen);
  });

  it('als gebruiker zie ik dat de aanpas actie actief staat', async () => {
    const action = await vlMapPage.getModifyPointAction();
    await assert.eventually.isTrue(action.isActive());
  });
});
