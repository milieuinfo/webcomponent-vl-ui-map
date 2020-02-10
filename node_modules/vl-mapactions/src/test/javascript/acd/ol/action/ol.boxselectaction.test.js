describe('box select action', function() {
	var intersectingFeature, callback;
	
	function createBoxSelectAction() {
		callback = jasmine.createSpy('callback functie');
		var action = new acd.ol.action.BoxSelectAction({
			getSource: function() {
				return {
					getFeatures: function() {
						return [];
					},
					forEachFeatureIntersectingExtent: function(extent, fn) {
						intersectingFeature = new ol.Feature();
						fn(intersectingFeature);
					}
				}
			}
		}, callback);
		spyOn(action.dragBoxInteraction, 'getGeometry').and.returnValue({getExtent: function(){}});
		return action;
	}
	
	it('kan op actief gezet worden, zodat de selectie, hover en dragbox interacties op actief gezet worden', function() {
		var boxSelectAction = createBoxSelectAction();
		boxSelectAction.map = {
			on: jasmine.createSpy(),
			un: jasmine.createSpy()
		};
		expect(boxSelectAction.hoverInteraction.getActive()).toBe(false);
		expect(boxSelectAction.selectInteraction.getActive()).toBe(false);
		expect(boxSelectAction.dragBoxInteraction.getActive()).toBe(false);
		
		boxSelectAction.activate();
		
		expect(boxSelectAction.hoverInteraction.getActive()).toBe(true);
		expect(boxSelectAction.selectInteraction.getActive()).toBe(true);
		expect(boxSelectAction.dragBoxInteraction.getActive()).toBe(true);
	});
	
	it('kan terug op deactief gezet worden, zodat de selectie, hover en dragbox interacties op deactief gezet worden', function() {
		var boxSelectAction = createBoxSelectAction();
		boxSelectAction.map = {
			on: jasmine.createSpy(),
			un: jasmine.createSpy()
		};
		boxSelectAction.activate();
		
		boxSelectAction.deactivate();
		
		expect(boxSelectAction.hoverInteraction.getActive()).toBe(false);
		expect(boxSelectAction.selectInteraction.getActive()).toBe(false);
		expect(boxSelectAction.dragBoxInteraction.getActive()).toBe(false);
	});
	
	it('zal de callback functie nog niet gebeurd zijn na het actief maken van de box selectie', function() {
		var boxSelectAction = createBoxSelectAction();
		boxSelectAction.map = {
			on: jasmine.createSpy(),
			un: jasmine.createSpy()
		};
		
		boxSelectAction.activate();
		
		expect(callback).not.toHaveBeenCalled();
	});
	
	it('zal bij het slepen van de box selectie, de features van de layer toevoegen aan de hover interactie', function() {
		var boxSelectAction = createBoxSelectAction();
		
		boxSelectAction.dragBoxInteraction.dispatchEvent('boxdrag');
		
		expect(boxSelectAction.hoverInteraction.getFeatures().getArray()).toContain(intersectingFeature);
	});
	
	it('zal bij het einde van de box selectie als er geen features intersecten, geen callbcak functie oproepen', function() {
		var boxSelectAction = createBoxSelectAction();
		
		boxSelectAction.dragBoxInteraction.dispatchEvent('boxend');
		
		expect(callback).not.toHaveBeenCalled();
	});
	
	it('zal bij het einde van de box selectie, de features toegevoegd hebben aan de selectie interactie, en de callback functie oproepen van de interactie met de intersecting feature', function() {
		var boxSelectAction = createBoxSelectAction();
		
		boxSelectAction.dragBoxInteraction.dispatchEvent('boxdrag');
		boxSelectAction.dragBoxInteraction.dispatchEvent('boxend');
		
		expect(boxSelectAction.hoverInteraction.getFeatures().getArray()).toContain(intersectingFeature);
		expect(callback).toHaveBeenCalledWith([intersectingFeature]);
	});
	
	it('zal bij het maken van een selectie door een klik, de callback functie aanroepen van de interactie', function() {
		var boxSelectAction = createBoxSelectAction();
		var selectedFeature = new ol.Feature();
		boxSelectAction.selectInteraction.getFeatures().push(selectedFeature);
		
		boxSelectAction.selectInteraction.dispatchEvent('select');
		
		expect(callback).toHaveBeenCalledWith([selectedFeature]);
	});
});