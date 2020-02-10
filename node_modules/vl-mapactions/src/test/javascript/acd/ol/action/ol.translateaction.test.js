describe('translate action', function() {
	it('roept de callback functie op nadat er een translate werd uitgevoerd en cleart ook de selectie interactie', function() {
		var callback = jasmine.createSpy('callback functie');
		var translateAction = new acd.ol.action.TranslateAction({}, callback);
		var feature = new ol.Feature();
		translateAction.selectInteraction.getFeatures().push(feature);
		
		translateAction.translateInteraction.dispatchEvent({type: 'translateend', features: [feature]});
		
		expect(callback).toHaveBeenCalledWith(feature, jasmine.any(Function));
		expect(translateAction.selectInteraction.getFeatures().getLength()).toBe(0);
	});
	
	it('na het deactiveren wordt de selectie verwijderd', function() {
		var translateAction = new acd.ol.action.TranslateAction({});
		var feature = new ol.Feature();
		translateAction.selectInteraction.getFeatures().push(feature);
		
		translateAction.deactivate();
		
		expect(translateAction.selectInteraction.getFeatures().getLength()).toBe(0);
	});
	
	it('bij de Translate interaction constructor moet ook de laag meegegeven worden zodat na het selecteren steeds de feature op de laag verplaatst zal worden en geen features op een andere laag', function() {
		var layer = {id: 'layer1'};
		
		var constructor = jasmine.createSpy('constructor');
		constructor.setActive = function() {};
		constructor.on = function() {};
		
		var spy = spyOn(window.ol.interaction, 'Translate').and.returnValue(constructor);
		new acd.ol.action.TranslateAction(layer, {});
		
		expect(spy).toHaveBeenCalledWith(jasmine.objectContaining({
			features: jasmine.any(Object),
			layers: [layer]
		}));
	});
});