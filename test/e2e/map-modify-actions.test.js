const {assert, getDriver} = require('vl-ui-core').Test.Setup;
const VlMapModifyActionsPage = require('./pages/vl-map-modify-actions.page');

describe('vl-map-modify-action', async () => {
  let vlMapPage;

  before(() => {
    vlMapPage = new VlMapModifyActionsPage(getDriver());
    return vlMapPage.load();
  });
  
  it('als gebruiker kan ik een lijn aanpassen op een kaart', async () => {
    const map = await vlMapPage.getMapWithModifyLineAction();
    await map.scrollIntoView();
    //const action = await vlMapPage.getModifyLineAction();
    
    const layers = await map.getLayers();
    const layer = layers[0];
    let features = await layer.getFeatures();
    assert.lengthOf(features, 1);
    
    let lineFeature = await layer.getFeature(1);
    const lines = lineFeature.geometry.coordinates;
    assert.lengthOf(lines, 2);
    
    const point1 = lines[0];
    assert.lengthOf(point1, 2);
    
    const point2 = lines[1];
    assert.lengthOf(point2, 2);
    
    const toWillebroek = [150390.63,193371.12];
    await map.movePointByCoordinates(point1, toWillebroek);
    
    const test = true;
  });

  it('als gebruiker kan ik een punt aanpassen op een kaart', async () => {
    const map = await vlMapPage.getMapWithModifyPointAction();
    await map.scrollIntoView();
    //const action = await vlMapPage.getModifyPointAction();
    
    const layers = await map.getLayers();
    const layer = layers[0];
    let features = await layer.getFeatures();
    assert.lengthOf(features, 2);
  
    const pointFeature1 = await layer.getFeature(1);
    const fromMechelen = pointFeature1.geometry.coordinates;
    assert.lengthOf(fromMechelen, 2);
  
    const pointFeature2 = await layer.getFeature(2);
    const fromAntwerpen = pointFeature2.geometry.coordinates;
    assert.lengthOf(fromAntwerpen, 2);
    
    const toWillebroek = [150390.63,193371.12];
    await map.movePointByCoordinates(fromMechelen, toWillebroek);
    
    features = await layer.getFeatures();
    assert.lengthOf(features, 2);
    
    const modifiedPointFeature = await layer.getFeature(1);
    const modifiedCoordinates = modifiedPointFeature.geometry.coordinates;
    assert.lengthOf(modifiedCoordinates, 2);
    assert.sameOrderedMembers(modifiedCoordinates, [149948.69299028325, 194016.7165957574]);
    assert.notSameOrderedMembers(modifiedCoordinates, fromMechelen);
  
    const unmodifiedPointFeature = await layer.getFeature(2);
    const unmodifiedCoordinates = unmodifiedPointFeature.geometry.coordinates;
    assert.lengthOf(unmodifiedCoordinates, 2);
    assert.sameOrderedMembers(unmodifiedCoordinates, fromAntwerpen);
  });

  

  it('als gebruiker kan ik een polygoon aanpassen op een kaart', async () => {
    const map = await vlMapPage.getMapWithModifyPolygonAction();
    await map.scrollIntoView();
    //const action = await vlMapPage.getModifyPolygonAction();
    
    const layers = await map.getLayers();
    const layer = layers[0];
    let features = await layer.getFeatures();
    assert.lengthOf(features, 1);
  
    let polygonFeature = await layer.getFeature(1);
    const polygons = polygonFeature.geometry.coordinates;
    assert.lengthOf(polygons, 1);
  
    const polygon = polygons[0];
    assert.lengthOf(polygon, 4);
  
    const fromGent = polygon[0];
    assert.lengthOf(fromGent, 2);
  
    const point2 = polygon[1];
    assert.lengthOf(point2, 2);
    
    const point3 = polygon[1];
    assert.lengthOf(point3, 2);
  
    const point4 = polygon[1];
    assert.lengthOf(point4, 2);
  
    const toWillebroek = [150390.63,193371.12];
    await map.movePointByCoordinates(fromGent, toWillebroek);
  });
  
});
