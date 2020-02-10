describe('modify action', function() {
	var fakeInteraction = getFakeInteraction();
	var source = new ol.source.Vector();
	var layer = createLayer(source);
	var callback = jasmine.createSpy('callback functie');
	var filter = function(feature) {};
	
	it('roept de callback functie op nadat er een modify werd uitgevoerd', function() {
		var callback = jasmine.createSpy('callback functie');
		var modifyAction = new acd.ol.action.ModifyAction({}, callback);
		var feature = new ol.Feature({
			geometry: new ol.geom.Point([0, 0])
		});
		
		modifyAction.selectInteraction.getFeatures().push(feature);
		modifyAction.modifyInteraction.dispatchEvent({type: 'modifyend', features: [feature]});
		expect(callback).toHaveBeenCalledWith(feature, jasmine.any(Function));
	});
	
	it('na het deactiveren wordt de selectie verwijderd', function() {
		var modifyAction = new acd.ol.action.ModifyAction({});
		modifyAction.map = {
			on: jasmine.createSpy(),
			un: jasmine.createSpy()
		};
		var feature = new ol.Feature({
			geometry: new ol.geom.Point([0, 0])
		});

		modifyAction.selectInteraction.getFeatures().push(feature);
		modifyAction.deactivate();
		expect(modifyAction.selectInteraction.getFeatures().getLength()).toBe(0);
	});
	
	it('de feature filter zal doorgegeven worden aan de select action', function() {
		var spy = spyOn(window.acd.ol.action.SelectAction, 'call').and.callThrough();
		var layers = {};
		var options = {
			filter: filter
		};
		var modifyAction = new acd.ol.action.ModifyAction(layers, null, options);
		expect(spy).toHaveBeenCalledWith(jasmine.any(Object), layers, null, options);
	});
	
	it('kan snapping aanzetten via opties met als standaard snapping layer de modify action layer', function() {
		var options = {
			filter: filter
		};
		var fakeModifyInteraction = getFakeInteraction();
		var fakeSnapInteraction = getFakeInteraction();
		
		spyOn(ol.interaction, 'Modify').and.returnValue(fakeModifyInteraction);
		spyOn(acd.ol.interaction, 'SnapInteraction').and.returnValue(fakeSnapInteraction);
		
		var modifyAction = new acd.ol.action.ModifyAction(layer, callback, options);
		expect(acd.ol.interaction.SnapInteraction).not.toHaveBeenCalled();
		
		acd.ol.interaction.SnapInteraction.calls.reset();
		options.snapping = false;
		var modifyAction = new acd.ol.action.ModifyAction(layer, callback, options);
		expect(acd.ol.interaction.SnapInteraction).not.toHaveBeenCalled();

		acd.ol.interaction.SnapInteraction.calls.reset();
		spyOn(acd.ol.action.MapAction.prototype, 'addInteraction').and.callThrough();
		options.snapping = true;
		var modifyAction = new acd.ol.action.ModifyAction(layer, callback, options);
		expect(acd.ol.interaction.SnapInteraction).toHaveBeenCalledWith(layer);

		expect(acd.ol.action.MapAction.prototype.addInteraction).toHaveBeenCalled();
		expect(acd.ol.action.MapAction.prototype.addInteraction.calls.argsFor(3)).toContain(fakeModifyInteraction);
		expect(acd.ol.action.MapAction.prototype.addInteraction.calls.argsFor(4)).toContain(fakeSnapInteraction);

		var otherLayer = createLayer();
		acd.ol.interaction.SnapInteraction.calls.reset();
		acd.ol.action.MapAction.prototype.addInteraction.calls.reset();
		options.snapping = {
			layer: otherLayer
		};
		var modifyAction = new acd.ol.action.ModifyAction(layer, callback, options);
		expect(acd.ol.action.MapAction.prototype.addInteraction).toHaveBeenCalled();
		expect(acd.ol.action.MapAction.prototype.addInteraction.calls.argsFor(3)).toContain(fakeModifyInteraction);
		expect(acd.ol.action.MapAction.prototype.addInteraction.calls.argsFor(4)).toContain(fakeSnapInteraction);
	});
});