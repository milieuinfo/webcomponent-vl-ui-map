const {assert, getDriver} = require('vl-ui-core').Test.Setup;
const VlMapModifyActionsPage = require('./pages/vl-map-modify-actions.page');

describe('vl-map-modify-action', async () => {
  let vlMapPage;
  const willebroek = [150390.63, 193371.12];

  before(() => {
    vlMapPage = new VlMapModifyActionsPage(getDriver());
    return vlMapPage.load();
  });

  it('als gebruiker zie ik dat de aanpas actie actief staat', async () => {
    const action = await vlMapPage.getModifyPointAction();
    await assert.eventually.isTrue(action.isActive());
  });

  it('als gebruiker kan ik een punt aanpassen op een kaart', async () => {
    const action = await vlMapPage.getModifyPointAction();

    const featuresLayer = await action.getFeaturesLayer();
    await getDriver().wait(async () => (await featuresLayer.getNumberOfFeatures()) === 2);
    const geometry1 = (await featuresLayer.getFeature(1)).geometry;
    const mechelen = geometry1.coordinates;
    const feature2 = await featuresLayer.getFeature(2);

    await action.movePointByCoordinates(mechelen, willebroek);

    await getDriver().wait(async () => (await featuresLayer.getNumberOfFeatures()) === 2);
    await getDriver().wait(async () => ((await featuresLayer.getFeature(1)).geometry !== geometry1), 10000);
    
    const modifiedGeometry = (await featuresLayer.getFeature(1)).geometry;
    assert.include(modifiedGeometry, {type: 'Point'});
    assert.notDeepEqual(modifiedGeometry, geometry1);
    assert.deepEqual(await featuresLayer.getFeature(2), feature2);
  });

  it('als gebruiker kan ik een lijn aanpassen op een kaart', async () => {
    const action = await vlMapPage.getModifyLineAction();

    const featuresLayer = await action.getFeaturesLayer();
    await getDriver().wait(async () => (await featuresLayer.getNumberOfFeatures()) === 1);
    const geometry = (await featuresLayer.getFeature(1)).geometry;
    const antwerpen = geometry.coordinates[1];

    await action.movePointByCoordinates(antwerpen, willebroek);

    await getDriver().wait(async () => (await featuresLayer.getNumberOfFeatures()) === 1);
    await getDriver().wait(async () => ((await featuresLayer.getFeature(1)).geometry !== geometry), 10000);
    
    const modifiedGeometry = (await featuresLayer.getFeature(1)).geometry;
    assert.include(modifiedGeometry, {type: 'LineString'});
    assert.notDeepEqual(modifiedGeometry, geometry);
  });

  it('als gebruiker kan ik een polygoon aanpassen op een kaart', async () => {
    const action = await vlMapPage.getModifyPolygonAction();

    const featuresLayer = await action.getFeaturesLayer();
    await getDriver().wait(async () => (await featuresLayer.getNumberOfFeatures()) === 1);
    const geometry = (await featuresLayer.getFeature(1)).geometry;
    const gent = geometry.coordinates[0][0];

    await action.movePointByCoordinates(gent, willebroek);

    await getDriver().wait(async () => (await featuresLayer.getNumberOfFeatures()) === 1);
    await getDriver().wait(async () => ((await featuresLayer.getFeature(1)).geometry !== geometry), 10000);
    
    const modifiedGeometry = (await featuresLayer.getFeature(1)).geometry;
    assert.include(modifiedGeometry, {type: 'Polygon'});
    assert.notDeepEqual(modifiedGeometry, geometry);
  });
});
