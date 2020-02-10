describe('delete action', function() {	
	it('indien er geen delete stijl gedefinieerd is zal de standaard stijl gebruikt worden', function() {
		var deleteAction = new acd.ol.action.DeleteAction({});
		expect(deleteAction.style).toBeDefined();
	});

	it('de delete stijl kan bepaald worden', function() {
		var style = new ol.style.Style();
		var deleteAction = new acd.ol.action.DeleteAction({}, null, {
			style: style
		});
		expect(deleteAction.style).toBe(style);
	});
	
	it('bij het oproepen van de callback zal na een success de selectie weggehaald worden', function() {
		var teVerwijderenFeature = new ol.Feature();
		teVerwijderenFeature.setId(1);
		var layer = new ol.layer.Vector({source: new ol.source.Vector({features: [teVerwijderenFeature]})});
		var callback = function(features, success, cancel) {
			success(teVerwijderenFeature);
		};
		var deleteAction = new acd.ol.action.DeleteAction(layer, callback);
		
		deleteAction.selectInteraction.getFeatures().push(teVerwijderenFeature);
		deleteAction.selectInteraction.dispatchEvent('select');
		
		expect(deleteAction.selectInteraction.getFeatures().getLength()).toBe(0);
	});
	
	it('bij het oproepen van de callback zal na een cancel de selectie weggehaald worden', function() {
		var teVerwijderenFeature = new ol.Feature();
		teVerwijderenFeature.setId(1);
		var layer = new ol.layer.Vector({source: new ol.source.Vector({features: [teVerwijderenFeature]})});
		var callback = function(features, success, cancel) {
			cancel();
		};
		var deleteAction = new acd.ol.action.DeleteAction(layer, callback);
		
		deleteAction.selectInteraction.getFeatures().push(teVerwijderenFeature);
		deleteAction.selectInteraction.dispatchEvent('select');
		
		expect(deleteAction.selectInteraction.getFeatures().getLength()).toBe(0);
	});
	
	it('bij het oproepen van de callback zal na de success de geselecteerde feature(s) weggehaald worden', function() {
		var teVerwijderenFeature = new ol.Feature();
		teVerwijderenFeature.setId(1);
		var layer = new ol.layer.Vector({source: new ol.source.Vector({features: [teVerwijderenFeature]})});
		var callback = function(features, success, cancel) {
			success(teVerwijderenFeature);
		};
		var deleteAction = new acd.ol.action.DeleteAction(layer, callback);
		
		deleteAction.selectInteraction.getFeatures().push(teVerwijderenFeature);
		deleteAction.selectInteraction.dispatchEvent('select');
		
		expect(layer.getSource().getFeatures().length).toBe(0);
	});
	
	it('bij het oproepen van de callback zal na een cancel de geselecteerde feature(s) niet weggehaald worden', function() {
		var teVerwijderenFeature = new ol.Feature();
		teVerwijderenFeature.setId(1);
		var layer = new ol.layer.Vector({source: new ol.source.Vector({features: [teVerwijderenFeature]})});
		var callback = function(features, success, cancel) {
			cancel();
		};
		var deleteAction = new acd.ol.action.DeleteAction(layer, callback);
		
		deleteAction.selectInteraction.getFeatures().push(teVerwijderenFeature);
		deleteAction.selectInteraction.dispatchEvent('select');
		
		expect(layer.getSource().getFeatures().length).toBe(1);
	});

	it('als er geen callback is meegegeven kunnen worden de features onmiddellijk verwijderd', function() {
		var teVerwijderenFeature = new ol.Feature();
		teVerwijderenFeature.setId(1);
		var layer = new ol.layer.Vector({source: new ol.source.Vector({features: [teVerwijderenFeature]})});
		var deleteAction = new acd.ol.action.DeleteAction(layer);
		
		deleteAction.selectInteraction.getFeatures().push(teVerwijderenFeature);
		deleteAction.selectInteraction.dispatchEvent('select');
		
		expect(layer.getSource().getFeatures().length).toBe(0);
		expect(deleteAction.selectInteraction.getFeatures().getLength()).toBe(0);
	});
});