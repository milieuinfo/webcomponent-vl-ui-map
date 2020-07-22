const {assert, driver} = require('vl-ui-core').Test.Setup;
const VlMapPage = require('./pages/vl-map.page');

describe('vl-map', async () => {
  const vlMapPage = new VlMapPage(driver);

  before(async () => {
    return vlMapPage.load();
  });

  it('Als gebruiker kan ik verschillende basis kaartlagen definieren voor een map', async () => {
    const map = await vlMapPage.getKaartMetVerschillendeGrbKaartlagen();
    await assert.eventually.isTrue(map.isDisplayed());
    const baseLayers = await map.getBaseLayers();
    await assert.eventually.equal(baseLayers[0].getTitle(), 'GRB basis laag grijs');
    await assert.eventually.equal(baseLayers[1].getTitle(), 'GRB basis laag');
    await assert.eventually.equal(baseLayers[2].getTitle(), 'GRB ortho laag');
  });

  it('Als gebruiker kan ik de url en type van een grb baselayer bevragen', async () => {
    const baseLayerGrb = await vlMapPage.getBaseLayerGrb();

    await assert.eventually.equal(baseLayerGrb.getUrl(), 'https://tile.informatievlaanderen.be/ws/raadpleegdiensten/wmts');
    await assert.eventually.equal(baseLayerGrb.getType(), 'wmts');
  });

  it('Als gebruiker zie ik het verschil tussen een grijze grb baselayer en de gewone grb baselayer aan de layer en title', async () => {
    const baseLayerGrbGray = await vlMapPage.getBaseLayerGrbGray();
    const baseLayerGrb = await vlMapPage.getBaseLayerGrb();

    await assert.eventually.equal(baseLayerGrbGray.getLayer(), 'grb_bsk_grijs');
    await assert.eventually.equal(baseLayerGrbGray.getTitle(), 'GRB basis laag grijs');
    await assert.eventually.equal(baseLayerGrb.getLayer(), 'grb_bsk');
    await assert.eventually.equal(baseLayerGrb.getTitle(), 'GRB basis laag');
  });

  it('Als gebruiker zie ik het verschil tussen een map waar de escape key enabled en disabled is', async () => {
    const mapEscapeEnabled = await vlMapPage.getKaartMetVerschillendeGrbKaartlagen();
    const mapEscapeDisabled = await vlMapPage.getKaartZonderEscapeFunctionaliteit();

    await assert.eventually.isFalse(mapEscapeEnabled.isEscapeKeyDisabled());
    await assert.eventually.isTrue(mapEscapeDisabled.isEscapeKeyDisabled());
  });

  it('Als gebruiker zie ik het verschil tussen een map waar de rotation enabled en disabled is', async () => {
    const mapRotationEnabled = await vlMapPage.getKaartMetVerschillendeGrbKaartlagen();
    const mapRotationDisabled = await vlMapPage.getKaartZonderRotateFunctionaliteit();

    await assert.eventually.isFalse(mapRotationEnabled.isRotationDisabled());
    await assert.eventually.isTrue(mapRotationDisabled.isRotationDisabled());
  });

  it('Als gebruiker zie ik het verschil tussen een map waar de mouse wheel zoom enabled en disabled is', async () => {
    const mapMouseWheelZoomEnabled = await vlMapPage.getKaartMetVerschillendeGrbKaartlagen();
    const mapMouseWheelZoomDisabled = await vlMapPage.getMapZonderMouseWheelZoomFunctionaliteit();

    await assert.eventually.isFalse(mapMouseWheelZoomEnabled.isMouseWheelZoomDisabled());
    await assert.eventually.isTrue(mapMouseWheelZoomDisabled.isMouseWheelZoomDisabled());
  });

  it('Als gebruiker kan ik de kaart zoomen', async () => {
    const map = await vlMapPage.getKaartMetVerschillendeGrbKaartlagen();
    await assert.eventually.isTrue(map.hasZoom(2));

    await map.zoomIn();
    await map.zoomIn();

    await assert.eventually.isTrue(map.hasZoom(4));

    await map.zoomOut();

    await assert.eventually.isTrue(map.hasZoom(3));
  });
});
