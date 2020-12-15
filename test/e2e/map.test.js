const {assert, getDriver} = require('vl-ui-core').Test.Setup;
const VlMapPage = require('./pages/vl-map.page');

describe('vl-map', async () => {
  let vlMapPage;

  before(() => {
    vlMapPage = new VlMapPage(getDriver());
    return vlMapPage.load();
  });

  it('als gebruiker kan ik verschillende basis kaartlagen definieren voor een map', async () => {
    const map = await vlMapPage.getMap();
    await assert.eventually.isTrue(map.isDisplayed());
    const baseLayers = await map.getBaseLayers();
    await assert.eventually.equal(baseLayers[0].getTitle(), 'GRB basis laag grijs');
    await assert.eventually.equal(baseLayers[1].getTitle(), 'GRB basis laag');
    await assert.eventually.equal(baseLayers[2].getTitle(), 'GRB ortho laag');
  });

  it('als gebruiker kan ik de url en type van een grb baselayer bevragen', async () => {
    const baseLayerGrb = await vlMapPage.getBaseLayerGrb();

    await assert.eventually.equal(baseLayerGrb.getUrl(), 'https://tile.informatievlaanderen.be/ws/raadpleegdiensten/wmts');
    await assert.eventually.equal(baseLayerGrb.getType(), 'wmts');
  });

  it('als gebruiker zie ik het verschil tussen een grijze grb baselayer en de gewone grb baselayer aan de layer en title', async () => {
    const baseLayerGrbGray = await vlMapPage.getBaseLayerGrbGray();
    const baseLayerGrb = await vlMapPage.getBaseLayerGrb();

    await assert.eventually.equal(baseLayerGrbGray.getLayer(), 'grb_bsk_grijs');
    await assert.eventually.equal(baseLayerGrbGray.getTitle(), 'GRB basis laag grijs');
    await assert.eventually.equal(baseLayerGrb.getLayer(), 'grb_bsk');
    await assert.eventually.equal(baseLayerGrb.getTitle(), 'GRB basis laag');
  });

  it('als gebruiker zie ik het verschil tussen een map waar de escape key enabled en disabled is', async () => {
    const mapEscapeEnabled = await vlMapPage.getMap();
    const mapEscapeDisabled = await vlMapPage.getMapWithoutEscape();

    await assert.eventually.isFalse(mapEscapeEnabled.isEscapeKeyDisabled());
    await assert.eventually.isTrue(mapEscapeDisabled.isEscapeKeyDisabled());
  });

  it('als gebruiker zie ik het verschil tussen een map waar de rotation enabled en disabled is', async () => {
    const mapRotationEnabled = await vlMapPage.getMap();
    const mapRotationDisabled = await vlMapPage.getMapWithoutRotation();

    await assert.eventually.isFalse(mapRotationEnabled.isRotationDisabled());
    await assert.eventually.isTrue(mapRotationDisabled.isRotationDisabled());
  });

  it('als gebruiker zie ik het verschil tussen een map waar de mouse wheel zoom enabled en disabled is', async () => {
    const mapMouseWheelZoomEnabled = await vlMapPage.getMap();
    const mapMouseWheelZoomDisabled = await vlMapPage.getMapWithoutMouseZoom();

    await assert.eventually.isFalse(mapMouseWheelZoomEnabled.isMouseWheelZoomDisabled());
    await assert.eventually.isTrue(mapMouseWheelZoomDisabled.isMouseWheelZoomDisabled());
  });

  it('als gebruiker kan ik de kaart zoomen', async () => {
    const map = await vlMapPage.getMap();
    await assert.eventually.isTrue(map.hasZoom(2));

    await map.zoomIn();
    await assert.eventually.isTrue(map.hasZoom(3));

    await map.zoomOut();
    await assert.eventually.isTrue(map.hasZoom(2));
  });

  it('als gebruiker kan ik een schaal raadplegen', async () => {
    const map = await vlMapPage.getMap();
    await assert.eventually.equal(map.getScale(), '50 km');
  });

  it('als gebruiker kan ik een kaart fullscreen aan- en uitzetten', async () => {
    const map = await vlMapPage.getMap();
    const mapWithFullscreenAllowed = await vlMapPage.getMapWithFullscreenAllowed();
    await assert.eventually.isFalse(map.isFullscreenAllowed());
    await assert.eventually.isTrue(mapWithFullscreenAllowed.isFullscreenAllowed());
    await mapWithFullscreenAllowed.toggleFullscreen();
    await mapWithFullscreenAllowed.toggleFullscreen();
  });
});
