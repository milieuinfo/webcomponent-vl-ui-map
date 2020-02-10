describe('draw action', function() {

	var source = new ol.source.Vector();
	
	var layer = {
		getSource: function() {
			return source;
		}
	};
	
	var callback = jasmine.createSpy('callback functie');
	
	it('geeft de snapping configuratie door aan de draw action', function() {
		spyOn(acd.ol.action, 'DrawAction').and.callThrough();
		
		var snapping = {
			layer: {}
		};
		
		var drawAction = new acd.ol.action.DrawRectangleAction(layer, callback, snapping);
		expect(acd.ol.action.DrawAction).toHaveBeenCalled();
		expect(acd.ol.action.DrawAction.calls.argsFor(0)).toContain(snapping);
	});
	
	it('geeft de juiste configuratie mee aan de draw interaction', function() {
		spyOn(ol.interaction, 'Draw').and.callFake(function(){
			return {
				setActive: function() {
				},
				on: function() {
				}
			};
		});

		var drawAction = new acd.ol.action.DrawRectangleAction(layer, callback);
		expect(ol.interaction.Draw).toHaveBeenCalled();
		expect(ol.interaction.Draw.calls.argsFor(0)[0].maxPoints).toBe(2);
		expect(ol.interaction.Draw.calls.argsFor(0)[0].type).toBe('LineString');
		expect(ol.interaction.Draw.calls.argsFor(0)[0].source).toBe(source);

		var geometryFunction = ol.interaction.Draw.calls.argsFor(0)[0].geometryFunction;
		
		var geometry = geometryFunction([[0, 0], [1, 2]], null);
		expect(geometry.getCoordinates()[0][0]).toEqual([0, 0]);
		expect(geometry.getCoordinates()[0][1]).toEqual([0, 2]);
		expect(geometry.getCoordinates()[0][2]).toEqual([1, 2]);
		expect(geometry.getCoordinates()[0][3]).toEqual([1, 0]);
		expect(geometry.getCoordinates()[0][4]).toEqual([0, 0]);
	});
	
});