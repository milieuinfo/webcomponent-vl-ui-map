describe('modify and translate action', function() {
	var fakeInteraction = getFakeInteraction();
	var source = new ol.source.Vector();
	var layer = createLayer(source);
	var callback = jasmine.createSpy('callback functie');
	var filter = function(feature) {};
	
	it('roept de callback functie op nadat er een translate werd uitgevoerd en cleart ook de selectie interactie', function() {
		var callback = jasmine.createSpy('callback functie');
		var modifyAndTranslateAction = new acd.ol.action.ModifyAndTranslateAction({}, callback);
		var feature = new ol.Feature({geometry: new ol.geom.Point([0, 0])});
		modifyAndTranslateAction.selectInteraction.getFeatures().push(feature);
		
		modifyAndTranslateAction.translateInteraction.dispatchEvent({type: 'translateend', features: [feature]});
		
		expect(callback).toHaveBeenCalledWith(feature, jasmine.any(Function));
		expect(modifyAndTranslateAction.selectInteraction.getFeatures().getLength()).toBe(0);
	});
	
	it('kan snapping aanzetten via opties door de modify action correct aan te roepen', function() {
		spyOn(acd.ol.action, 'ModifyAction').and.callThrough();
		
		var options = {
			snapping: true
		};
		
		var drawAction = new acd.ol.action.ModifyAndTranslateAction(layer, callback, options);
		expect(acd.ol.action.ModifyAction).toHaveBeenCalled();
		expect(acd.ol.action.ModifyAction.calls.argsFor(0)).toContain(options);
	});
});