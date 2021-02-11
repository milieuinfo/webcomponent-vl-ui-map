const {assert, getDriver} = require('vl-ui-core').Test.Setup;
const VlMapModifyActionsPage = require('./pages/vl-map-modify-actions.page');

describe('vl-map-modify-action', async () => {
  let vlMapPage;

  before(() => {
    vlMapPage = new VlMapModifyActionsPage(getDriver());
    return vlMapPage.load();
  });

  it('als gebruiker kan ik een polygoon aanpassen op een kaart', async () => {
    const map = await vlMapPage.getMapWithModifyPolygonAction();
    await map.scrollIntoView();
    // const action = await vlMapPage.getModifyPolygonAction();

    const layers = await map.getLayers();
    const layer = layers[0];
    let features = await layer.getFeatures();
    assert.lengthOf(features, 1);

    const polygonFeature = await layer.getFeature(1);
    const polygonCoordinates = polygonFeature.geometry.coordinates;
    assert.lengthOf(polygonCoordinates, 1);

    const points = polygonCoordinates[0];
    assert.lengthOf(points, 4);

    const gent = points[0];
    assert.lengthOf(gent, 2);

    const mechelen = points[1];
    assert.lengthOf(mechelen, 2);

    const antwerpen = points[2];
    assert.lengthOf(antwerpen, 2);

    const leuven = points[3];
    assert.lengthOf(leuven, 2);

    const willebroek = [150390.63, 193371.12];
    await map.movePointByCoordinates(gent, willebroek);

    features = await layer.getFeatures();
    assert.lengthOf(features, 1);

    const modifiedPolygonFeature = await layer.getFeature(1);
    const modifiedPolygonCoordinates = modifiedPolygonFeature.geometry.coordinates;
    assert.lengthOf(modifiedPolygonCoordinates, 1);

    const modifiedPoints = modifiedPolygonCoordinates[0];
    assert.lengthOf(modifiedPoints, 4);

    const modifiedPoint = modifiedPoints[0];
    assert.lengthOf(modifiedPoint, 2);
    assert.sameOrderedMembers(modifiedPoint, [149948.69299028325, 193760.7165957574]);
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
    const map = await vlMapPage.getMapWithModifyPointAction();
    await map.scrollIntoView();
    // const action = await vlMapPage.getModifyPointAction();

    const layers = await map.getLayers();
    const layer = layers[0];
    let features = await layer.getFeatures();
    assert.lengthOf(features, 2);

    const point1Feature = await layer.getFeature(1);
    const mechelen = point1Feature.geometry.coordinates;
    assert.lengthOf(mechelen, 2);

    const point2Feature = await layer.getFeature(2);
    const antwerpen = point2Feature.geometry.coordinates;
    assert.lengthOf(antwerpen, 2);

    const willebroek = [150390.63, 193371.12];
    await map.movePointByCoordinates(mechelen, willebroek);

    features = await layer.getFeatures();
    assert.lengthOf(features, 2);

    const modifiedPoint1Feature = await layer.getFeature(1);
    const modifiedCoordinates = modifiedPoint1Feature.geometry.coordinates;
    assert.lengthOf(modifiedCoordinates, 2);
    assert.sameOrderedMembers(modifiedCoordinates, [149948.69299028325, 193760.7165957574]);
    assert.notSameOrderedMembers(modifiedCoordinates, mechelen);

    const unmodifiedPoint2Feature = await layer.getFeature(2);
    const unmodifiedCoordinates = unmodifiedPoint2Feature.geometry.coordinates;
    assert.lengthOf(unmodifiedCoordinates, 2);
    assert.sameOrderedMembers(unmodifiedCoordinates, antwerpen);
  });

  it('als gebruiker kan ik een lijn aanpassen op een kaart', async () => {
    const map = await vlMapPage.getMapWithModifyLineAction();
    await map.scrollIntoView();
    // const action = await vlMapPage.getModifyLineAction();

    const layers = await map.getLayers();
    const layer = layers[0];
    let features = await layer.getFeatures();
    assert.lengthOf(features, 1);

    const lineFeature = await layer.getFeature(1);
    const lineCoordinates = lineFeature.geometry.coordinates;
    assert.lengthOf(lineCoordinates, 2);

    const mechelen = lineCoordinates[0];
    assert.lengthOf(mechelen, 2);

    const antwerpen = lineCoordinates[1];
    assert.lengthOf(antwerpen, 2);

    const willebroek = [150390.63, 193371.12];
    await map.movePointByCoordinates(antwerpen, willebroek);

    features = await layer.getFeatures();
    assert.lengthOf(features, 1);

    const modifiedLineFeature = await layer.getFeature(1);
    const modifiedLineCoordinates = modifiedLineFeature.geometry.coordinates;
    assert.lengthOf(modifiedLineCoordinates, 2);

    const unmodifiedPoint = modifiedLineCoordinates[0];
    assert.lengthOf(unmodifiedPoint, 2);
    assert.sameOrderedMembers(unmodifiedPoint, mechelen);

    const modifiedPoint = modifiedLineCoordinates[1];
    assert.lengthOf(modifiedPoint, 2);
    assert.sameOrderedMembers(modifiedPoint, [149948.69299028325, 193760.7165957574]);
    assert.notSameOrderedMembers(modifiedPoint, antwerpen);
  });
});
