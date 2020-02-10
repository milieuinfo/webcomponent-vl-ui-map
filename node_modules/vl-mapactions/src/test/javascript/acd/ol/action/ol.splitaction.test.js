describe('split action', function() {
	var mapAddActionSpy = jasmine.createSpy();
	var callbackSpy = jasmine.createSpy();
	var optionsSpy = {
		filter: jasmine.createSpy()
	};
	var feature = new ol.Feature({id: 1});
	
	var layer = {
		getSource: function() {
			return {
				getFeatures: function() {
					return [];
				},
				getFeatureById: function(id) {
					return (id == 1) ? feature : null;
				}
			};
		}
	};
	
	function createSplitAction() {
		var splitAction = new acd.ol.action.SplitAction(layer, callbackSpy, optionsSpy);
		splitAction.map = {
			addAction: mapAddActionSpy,
			on: jasmine.createSpy(),
			un: jasmine.createSpy()
		};
		return splitAction;
	}
	
	beforeEach(function() {
		jasmine.clock().install();
	});
	
	afterEach(function() {
		jasmine.clock().uninstall();
	});
	
	it('zal bij het activeren een select en draw actie toevoegen aan de map en de select interacties activeren', function() {
		var splitAction = createSplitAction();
		expect(splitAction.interactions).toEqual([]);
		expect(splitAction.selectAction.interactions).not.toEqual([]);
		splitAction.selectAction.interactions.forEach(function(interaction) {
			expect(interaction.getActive()).toBe(false);
		});
		expect(splitAction.drawAction.interactions).not.toEqual([]);
		splitAction.drawAction.interactions.forEach(function(interaction) {
			expect(interaction.getActive()).toBe(false);
		});
		
		expect(mapAddActionSpy).not.toHaveBeenCalled();
		splitAction.activate();
		expect(mapAddActionSpy).toHaveBeenCalled();
		expect(mapAddActionSpy.calls.count()).toEqual(2);
		expect(mapAddActionSpy.calls.argsFor(0)).toEqual([splitAction.selectAction]);
		expect(mapAddActionSpy.calls.argsFor(1)).toEqual([splitAction.drawAction]);
		expect(splitAction.interactions).toEqual([]);
		splitAction.selectAction.interactions.forEach(function(interaction) {
			expect(interaction.getActive()).toBe(true);
		});
		splitAction.drawAction.interactions.forEach(function(interaction) {
			expect(interaction.getActive()).toBe(false);
		});
	});
	
	it('zal bij het deactiveren zowel de select als draw actie deactiveren', function() {
		var splitAction = createSplitAction();
		var deactivateSpy = spyOn(acd.ol.action.MapAction.prototype.deactivate, 'call');
		splitAction.deactivate();
		expect(deactivateSpy).toHaveBeenCalled();
		expect(deactivateSpy.calls.count()).toEqual(2);
		expect(deactivateSpy.calls.argsFor(0)).toEqual([splitAction.selectAction]);
		expect(deactivateSpy.calls.argsFor(1)).toEqual([splitAction.drawAction]);
	});
	
	it('zal een select action aanmaken met de correcte argumenten', function() {
		var selectActionSpy = spyOn(acd.ol.action, 'SelectAction');
		var drawActionSpy = spyOn(acd.ol.action, 'DrawAction');
		var splitAction = createSplitAction();
		expect(selectActionSpy).toHaveBeenCalledWith(layer, jasmine.any(Function), optionsSpy);
		expect(drawActionSpy).toHaveBeenCalledWith(layer, 'LineString', jasmine.any(Function), optionsSpy);
	});
	
	it('zal na het selecteren de select action deactiveren en de draw action activeren', function() {
		var splitAction = createSplitAction();
		
		spyOn(splitAction.selectAction, 'deactivate');
		spyOn(acd.ol.action.MapAction.prototype.activate, 'call');
		spyOn(acd.ol.action, 'SelectAction').and.callThrough();
		splitAction.selectAction.selectInteraction.getFeatures().push(feature);
		splitAction.selectAction.selectInteraction.dispatchEvent({type: 'select'});
		expect(splitAction.selectAction.deactivate).toHaveBeenCalled();
		expect(acd.ol.action.MapAction.prototype.activate.call).toHaveBeenCalledWith(splitAction.drawAction);
	});
	
	it('zal na het selecteren en tekenen zal de split callback uitgevoerd worden met de geselecteerde feature en de opgsplitste features', function() {
		var splitAction = createSplitAction();
		
		var selectedFeature = {
			getGeometry: function() {
				var multiPolygon = new ol.geom.MultiPolygon();
				multiPolygon.appendPolygon(new ol.geom.Polygon([[[0, 0], [0, 10], [10, 10], [0, 0]]]));
				return multiPolygon;
			}
		};
		
		var drawnFeature = {
			getGeometry: function() {
				return new ol.geom.LineString([[0, 5], [10, 5]]);
			}
		};
		
		spyOn(acd.ol.action, 'DrawAction').and.callFake(function(layer, type, callback) {
			callback();
		});
		
		splitAction.selectAction.selectedFeature = selectedFeature;
		splitAction.drawAction.drawInteraction.dispatchEvent({type: 'drawend', feature: drawnFeature});
		expect(callbackSpy).toHaveBeenCalledWith(selectedFeature, jasmine.any(Object));
		var features = callbackSpy.calls.argsFor(0)[1];
		expect(features.length).toBe(2);
		expect(features[0].getGeometry().getCoordinates()).toEqual([[[[0, 0], [0, 5], [5, 5], [0, 0]]]]);
		expect(features[1].getGeometry().getCoordinates()).toEqual([[[[0, 5], [0, 10], [10, 10], [5, 5], [0, 5]]]]);
	});
	
	it('zal na het selecteren en tekenen de laatst geselecteerde feature deselecteren, de map action deactiveren en de select action activeren', function() {
		var splitAction = createSplitAction();
		
		spyOn(splitAction.selectAction, 'clearFeatures');
		spyOn(splitAction.selectAction, 'activate');
		spyOn(splitAction.drawAction, 'deactivate');
		
		var selectedFeature = {
			getGeometry: function() {
				var multiPolygon = new ol.geom.MultiPolygon();
				multiPolygon.appendPolygon(new ol.geom.Polygon([[[0, 0], [0, 10], [10, 10], [0, 0]]]));
				return multiPolygon;
			}
		};
		
		var drawnFeature = {
			getGeometry: function() {
				return new ol.geom.LineString([[0, 5], [10, 5]]);
			}
		};
		
		spyOn(acd.ol.action, 'DrawAction').and.callFake(function(layer, type, callback) {
			callback();
			expect(splitAction.selectAction.clearFeatures).toHaveBeenCalled();
			
			jasmine.clock().tick();
			
			splitAction.selectAction.selectedFeature = selectedFeature;
			splitAction.drawAction.drawInteraction.dispatchEvent({type: 'drawend', feature: drawnFeature});
			expect(splitAction.drawAction.deactivate).toHaveBeenCalled();
			expect(splitAction.selectAction.activate).toHaveBeenCalled();
		});
	});
});