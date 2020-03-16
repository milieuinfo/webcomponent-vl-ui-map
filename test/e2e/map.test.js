const { assert, driver } = require('vl-ui-core').Test.Setup;
const VlMapPage = require('./pages/vl-map.page');

describe('vl-map', async () => {
	const vlMapPage = new VlMapPage(driver);

	before(() => {
		return vlMapPage.load();
	});

	it('Als gebruiker kan ik verschillende basis kaartlagen definieren voor een map', async () => {
		const map = await vlMapPage.getKaartMetVerschillendeGrbKaartlagen();
		await assert.eventually.isTrue(map.isDisplayed());
		const baseLayers = await map.getBaseLayers();
		const baseLayerNames = await Promise.all(baseLayers.map(baseLayer => baseLayer.getTitle()));
		assert.include(baseLayerNames, 'GRB basis laag grijs');
		assert.include(baseLayerNames, 'GRB basis laag');
		assert.include(baseLayerNames, 'GRB ortho laag');
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
});
