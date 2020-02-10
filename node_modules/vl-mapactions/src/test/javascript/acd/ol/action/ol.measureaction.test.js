'use strict';

describe('measure action', function() {
	var measureAction, layer,  addOverlay, removeOverlay, unByKey, handler, moveMouse, source;
	
	beforeEach(function setUp() {
		source = new ol.source.Vector({features: []});
		layer = new ol.layer.Vector({source: source});
		
		measureAction = new acd.ol.action.MeasureAction(layer);
		addOverlay = jasmine.createSpy('addOverlay');
		removeOverlay = jasmine.createSpy('removeOverlay');
		unByKey = jasmine.createSpy('unByKey');
		handler = 'handler';
		measureAction.map = {
			addOverlay: addOverlay,
			removeOverlay: removeOverlay,
			on: function(type, callback) {
				moveMouse = callback;
				return handler;
			},
			unByKey: unByKey
		};
	});
	
	it('geeft de snapping configuratie door aan de draw action', function() {
		spyOn(acd.ol.action, 'DrawAction').and.callThrough();
		
		var snapping = {
			layer: {}
		};
		
		var drawAction = new acd.ol.action.MeasureAction(layer, snapping);
		expect(acd.ol.action.DrawAction).toHaveBeenCalled();
		expect(acd.ol.action.DrawAction.calls.argsFor(0)).toContain(snapping);
	});
	
	it('Als het tekenen gestart en er met de muis verschoven wordt zal er een tooltip verschijnen', function() {
		var sketchFeature = new ol.Feature({geometry: new ol.geom.LineString([[0, 0], [1, 1]])});
		
		measureAction.drawInteraction.dispatchEvent({type: 'drawstart', feature: sketchFeature});
		
		expect(addOverlay).toHaveBeenCalled();
	});
	
	it('bij het deactiveren worden de tooltips niet verwijderd, maar de listeners wel verwijderd', function() {
		var sketchFeature = new ol.Feature({geometry: new ol.geom.LineString([[0, 0], [1, 1]])});
		measureAction.drawInteraction.dispatchEvent({type: 'drawstart', feature: sketchFeature});
		measureAction.drawInteraction.dispatchEvent({type: 'drawend', feature: sketchFeature});
		source.addFeature(sketchFeature);
		measureAction.deactivate();
		
		expect(unByKey).toHaveBeenCalledWith(handler);
		expect(removeOverlay).not.toHaveBeenCalled();
	});

	it('bij het deactiveren worden de tooltips van features die nog niet volledig getekend waren wel van de kaart verwijderd', function() {
		var sketchFeature = new ol.Feature({geometry: new ol.geom.LineString([[0, 0], [1, 1]])});
		measureAction.drawInteraction.dispatchEvent({type: 'drawstart', feature: sketchFeature});
		measureAction.drawInteraction.dispatchEvent({type: 'drawend', feature: sketchFeature});
		var tooltip = measureAction.getTooltipFor(sketchFeature.getId());
		
		measureAction.deactivate();
		
		expect(removeOverlay).toHaveBeenCalledWith(tooltip);
	});
	
	it('wanneer een feature wordt verwijderd van de layer zal de bijhorende tooltip ook verwijderd worden', function() {
		var sketchFeature = new ol.Feature({id: 1, geometry: new ol.geom.LineString([[0, 0], [1, 1]])});
		
		measureAction.drawInteraction.dispatchEvent({type: 'drawstart', feature: sketchFeature});
		
		measureAction.drawInteraction.dispatchEvent({type: 'drawend', feature: sketchFeature});
		expect(addOverlay).toHaveBeenCalled();
		
		var tooltip = measureAction.getTooltipFor(sketchFeature.getId());
		expect(tooltip).toBeDefined();
		
		source.dispatchEvent({type: "removefeature", feature: sketchFeature});
		expect(removeOverlay).toHaveBeenCalledWith(tooltip);
	});
	
});