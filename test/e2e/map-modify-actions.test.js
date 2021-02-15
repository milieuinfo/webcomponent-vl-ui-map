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

    const polygonFeature = await layer.getFeature(1);
    const polygonCoordinates = polygonFeature.geometry.coordinates;
    assert.lengthOf(polygonCoordinates, 1);

    const points = polygonCoordinates[0];
    assert.lengthOf(points, 4);

    const gent = points[0];
    const mechelen = points[1];
    const antwerpen = points[2];
    const leuven = points[3];

    await action.movePointByCoordinates(gent, willebroek);

    await getDriver().wait(async () => (await layer.getNumberOfFeatures()) === 1);
    assert.lengthOf(await layer.getFeatures(), 1);

    const modifiedPolygonFeature = await layer.getFeature(1);
    const modifiedPolygonCoordinates = modifiedPolygonFeature.geometry.coordinates;
    assert.lengthOf(modifiedPolygonCoordinates, 1);

    const modifiedPoints = modifiedPolygonCoordinates[0];
    assert.lengthOf(modifiedPoints, 4);

    const modifiedPoint = modifiedPoints[0];
    assert.lengthOf(modifiedPoint, 2);
    assert.notSameOrderedMembers(modifiedPoint, gent);

    const unmodifiedPoint2 = modifiedPoints[1];
    assert.lengthOf(unmodifiedPoint2, 2);
    assert.sameOrderedMembers(unmodifiedPoint2, mechelen);

    const unmodifiedPoint3 = modifiedPoints[2];
    assert.lengthOf(unmodifiedPoint3, 2);
    assert.sameOrderedMembers(unmodifiedPoint3, antwerpen);

    const unmodifiedPoint4 = modifiedPoints[3];
    assert.lengthOf(unmodifiedPoint4, 2);
    assert.sameOrderedMembers(unmodifiedPoint4, leuven);
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

    const modifiedPoint1Feature = await layer.getFeature(1);
    const modifiedCoordinates = modifiedPoint1Feature.geometry.coordinates;
    assert.lengthOf(modifiedCoordinates, 2);
    assert.notSameOrderedMembers(modifiedCoordinates, mechelen);

    const unmodifiedPoint2Feature = await layer.getFeature(2);
    const unmodifiedCoordinates = unmodifiedPoint2Feature.geometry.coordinates;
    assert.lengthOf(unmodifiedCoordinates, 2);
    assert.sameOrderedMembers(unmodifiedCoordinates, antwerpen);
  });

  it('als gebruiker kan ik een lijn aanpassen op een kaart', async () => {
    const action = await vlMapPage.getModifyLineAction();

    const layer = await action.getLayer();
    await getDriver().wait(async () => (await layer.getNumberOfFeatures()) === 1);

    const lineFeature = await layer.getFeature(1);
    const lineCoordinates = lineFeature.geometry.coordinates;
    assert.lengthOf(lineCoordinates, 2);

    const mechelen = lineCoordinates[0];
    const antwerpen = lineCoordinates[1];

    await action.movePointByCoordinates(antwerpen, willebroek);

    await getDriver().wait(async () => (await layer.getNumberOfFeatures()) === 1);
    assert.lengthOf(await layer.getFeatures(), 1);

    const modifiedLineFeature = await layer.getFeature(1);
    const modifiedLineCoordinates = modifiedLineFeature.geometry.coordinates;
    assert.lengthOf(modifiedLineCoordinates, 2);

    const unmodifiedPoint = modifiedLineCoordinates[0];
    assert.lengthOf(unmodifiedPoint, 2);
    assert.sameOrderedMembers(unmodifiedPoint, mechelen);

    const modifiedPoint = modifiedLineCoordinates[1];
    assert.lengthOf(modifiedPoint, 2);
    assert.notSameOrderedMembers(modifiedPoint, antwerpen);
  });

  it('als gebruiker zie ik dat de aanpas actie actief staat', async () => {
    const action = await vlMapPage.getModifyPointAction();
    await assert.eventually.isTrue(action.isActive());
  });
});
