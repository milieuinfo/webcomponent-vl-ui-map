describe('draw action', function() {

	var fakeInteraction = getFakeInteraction();
	var source = new ol.source.Vector();
	var layer = createLayer(source);
	var callback = jasmine.createSpy('callback functie');
	
	var addOverlay;
	var removeOverlay;
	var unByKey;
	
	afterEach(function() {
		callback.calls.reset();
		addOverlay = undefined;
		removeOverlay = undefined;
		unByKey = undefined;
	});
	
	it('kan opties meegeven aan draw interaction', function() {
		spyOn(acd.ol.action, 'MapAction').and.callThrough();
		spyOn(ol.interaction, 'Draw').and.returnValue(fakeInteraction);
		
		var drawAction = new acd.ol.action.DrawAction(layer, 'LineString', callback, {maxPoints: 2});
		expect(ol.interaction.Draw).toHaveBeenCalled();
		var arguments = ol.interaction.Draw.calls.argsFor(0);
		expect(arguments[0].maxPoints).toBe(2);
		expect(arguments[0].source).toBe(source);
		expect(arguments[0].type).toBe('LineString');
		
		expect(acd.ol.action.MapAction).toHaveBeenCalled();
		expect(acd.ol.action.MapAction.calls.argsFor(0)).toContain([fakeInteraction]);
	});
	
	it('kan snapping aanzetten via opties met als standaard snapping layer de draw action layer', function() {
		var fakeDrawInteraction = getFakeInteraction();
		var fakeSnapInteraction = getFakeInteraction();
		
		spyOn(ol.interaction, 'Draw').and.returnValue(fakeDrawInteraction);
		spyOn(acd.ol.interaction, 'SnapInteraction').and.returnValue(fakeSnapInteraction);
		
		var options = {
			maxPoints: 2
		};
		
		var drawAction = new acd.ol.action.DrawAction(layer, 'LineString', callback, options);
		expect(acd.ol.interaction.SnapInteraction).not.toHaveBeenCalled();
		
		acd.ol.interaction.SnapInteraction.calls.reset();
		options.snapping = false;
		var drawAction = new acd.ol.action.DrawAction(layer, 'LineString', callback, options);
		expect(acd.ol.interaction.SnapInteraction).not.toHaveBeenCalled();

		acd.ol.interaction.SnapInteraction.calls.reset();
		spyOn(acd.ol.action, 'MapAction').and.callThrough();
		options.snapping = true;
		var drawAction = new acd.ol.action.DrawAction(layer, 'LineString', callback, options);
		expect(acd.ol.interaction.SnapInteraction).toHaveBeenCalledWith(layer);

		expect(acd.ol.action.MapAction).toHaveBeenCalled();
		expect(acd.ol.action.MapAction.calls.argsFor(0)).toContain([fakeDrawInteraction, fakeSnapInteraction]);

		var otherLayer = createLayer();
		acd.ol.interaction.SnapInteraction.calls.reset();
		acd.ol.action.MapAction.calls.reset();
		options.snapping = {
			layer: otherLayer
		};
		var drawAction = new acd.ol.action.DrawAction(layer, 'LineString', callback, options);
		expect(acd.ol.interaction.SnapInteraction).toHaveBeenCalledWith(otherLayer);

		expect(acd.ol.action.MapAction).toHaveBeenCalled();
		expect(acd.ol.action.MapAction.calls.argsFor(0)).toContain([fakeDrawInteraction, fakeSnapInteraction]);
	});
	
	it('roept de callback functie aan na het tekenen', function() {
		var drawAction = new acd.ol.action.DrawAction(layer, 'Polygon', callback);
		var sketchFeature = new ol.Feature();
		
		drawAction.drawInteraction.dispatchEvent({type: 'drawend', feature: sketchFeature});
		expect(callback).toHaveBeenCalledWith(sketchFeature, jasmine.any(Function));
	});
	
	it('kan na het tekenen de feature terug verwijderen via de cancel draw functie', function() {
		var callback = function(feature, cancelDraw) {
			cancelDraw();
		};
		var drawAction = new acd.ol.action.DrawAction(layer, 'Polygon', callback);
		var sketchFeature = new ol.Feature();
		
		drawAction.drawInteraction.dispatchEvent({type: 'drawend', feature: sketchFeature});
		source.addFeature(sketchFeature);
		expect(source.getFeatures().length).toBe(0);
	});
	
	it('kan na het tekenen asynchroon de feature terug verwijderen via de cancel draw functie', function() {
		var callback = function(feature, cancelDraw) {
			source.addFeature(feature);
			cancelDraw();
		};
		var drawAction = new acd.ol.action.DrawAction(layer, 'Polygon', callback);
		var sketchFeature = new ol.Feature();
		
		drawAction.drawInteraction.dispatchEvent({type: 'drawend', feature: sketchFeature});
		expect(source.getFeatures().length).toBe(0);
	});
	
	it('Als het tekenen gestart is en er met de muis verschoven wordt zal er een tooltip verschijnen als de optie measure op true staat', function() {
		var options = {
			measure: true
		};
		
		var drawAction = createDrawActionWithMap('Polygon', options);
		var sketchFeature = new ol.Feature({geometry: new ol.geom.Polygon([[[0, 0], [0, 1], [1, 1]]])});
		drawAction.drawInteraction.dispatchEvent({type: 'drawstart', feature: sketchFeature});
		expect(addOverlay).toHaveBeenCalled();
		var tooltip = addOverlay.calls.argsFor(0)[0];
		drawAction.pointermove();
		expect(tooltip.getElement().textContent).toBe("1.00 m");
		expect(tooltip.getOffset()).toEqual([-15, 10]);

		addOverlay.calls.reset();
		
		var drawAction = createDrawActionWithMap('LineString', options);
		var sketchFeature = new ol.Feature({geometry: new ol.geom.LineString([[0, 0], [1, 1]])});
		drawAction.drawInteraction.dispatchEvent({type: 'drawstart', feature: sketchFeature});
		expect(addOverlay).toHaveBeenCalled();
		var tooltip = addOverlay.calls.argsFor(0)[0];
		drawAction.pointermove();
		expect(tooltip.getElement().textContent).toBe("1.41 m");
		expect(tooltip.getOffset()).toEqual([-15, 10]);
	});

	it('Als het tekenen gestart is en er met de muis verschoven wordt zal er een tooltip verschijnen als de optie measure een object is met de offset van de tooltip in', function() {
		var options = {
			measure: {
				tooltip: {
					offset: [ 0, 0 ]
				}
			}
		};

		var drawAction = createDrawActionWithMap('Polygon', options);
		var sketchFeature = new ol.Feature({geometry: new ol.geom.Polygon([[[0, 0], [0, 1], [1, 1]]])});
		drawAction.drawInteraction.dispatchEvent({type: 'drawstart', feature: sketchFeature});
		expect(addOverlay).toHaveBeenCalled();
		var tooltip = addOverlay.calls.argsFor(0)[0];
		drawAction.pointermove();
		expect(tooltip.getElement().textContent).toBe("1.00 m");
		expect(tooltip.getOffset()).toEqual([0, 0]);

		addOverlay.calls.reset();

		var drawAction = createDrawActionWithMap('LineString', options);
		var sketchFeature = new ol.Feature({geometry: new ol.geom.LineString([[0, 0], [1, 1]])});
		drawAction.drawInteraction.dispatchEvent({type: 'drawstart', feature: sketchFeature});
		expect(addOverlay).toHaveBeenCalled();
		var tooltip = addOverlay.calls.argsFor(0)[0];
		drawAction.pointermove();
		expect(tooltip.getElement().textContent).toBe("1.41 m");
		expect(tooltip.getOffset()).toEqual([0, 0]);
	});
	
	it('Als het tekenen gestart en er met de muis verschoven wordt zal er geen tooltip verschijnen als de optie measure op false staat', function() {
		var drawAction = createDrawActionWithMap('Polygon');
		
		var sketchFeature = new ol.Feature({geometry: new ol.geom.Polygon([[[0, 0], [0, 1], [1, 1]]])});
		drawAction.drawInteraction.dispatchEvent({type: 'drawstart', feature: sketchFeature});
		expect(addOverlay).not.toHaveBeenCalled();
	});
	
	it('Bij het stoppen worden de tooltips (en listener) verwijderd', function() {
		var options = {
			measure: true
		};
		
		var drawAction = createDrawActionWithMap('Polygon', options);
		var sketchFeature = new ol.Feature({geometry: new ol.geom.Polygon([[[0, 0], [0, 1], [1, 1], [0, 0]]])});
		drawAction.drawInteraction.dispatchEvent({type: 'drawstart', feature: sketchFeature});
		drawAction.drawInteraction.dispatchEvent({type: 'drawend', feature: sketchFeature});
		expect(removeOverlay).toHaveBeenCalled();
		expect(unByKey).toHaveBeenCalled();
	});
	
	it('Bij het deactiveren worden de tooltips en listener verwijderd', function() {
		var options = {
			measure: true
		};
		var drawAction = createDrawActionWithMap('Polygon', options);
		
		var sketchFeature = new ol.Feature({geometry: new ol.geom.Polygon([[[0, 0], [0, 1], [1, 1], [0, 0]]])});
		drawAction.drawInteraction.dispatchEvent({type: 'drawstart', feature: sketchFeature});
		drawAction.deactivate();
		expect(removeOverlay).toHaveBeenCalled();
		expect(unByKey).toHaveBeenCalled();	
	});
	
	function setMeasureSpies() {
		addOverlay = jasmine.createSpy('addOverlay');
		removeOverlay = jasmine.createSpy('removeOverlay');
		unByKey = jasmine.createSpy('unByKey');
	}
	
	function createDrawActionWithMap(type, options) {
		setMeasureSpies();
		var drawAction = new acd.ol.action.DrawAction(layer, type, callback, options);
		drawAction.map = {
			addOverlay: addOverlay,
			removeOverlay: removeOverlay,
			on: function(type, callback) {
				drawAction[type] = callback;
			},
			unByKey: unByKey
		};
		return drawAction;
	}
	
});