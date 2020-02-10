describe('draw action', function() {

	var source = new ol.source.Vector();
	
	var layer = {
		getSource: function() {
			return source;
		}
	};
	
	var callback = jasmine.createSpy('callback functie');
	
	it('geeft de options door aan de draw action', function() {
		spyOn(acd.ol.action, 'DrawAction').and.callThrough();
		
		var options = {
			snapping: {
				layer: {
					getSource: function() {}
				}
			},
			measure: true
		};
		
		var drawAction = new acd.ol.action.DrawLijnstukAction(layer, callback, options);
		expect(acd.ol.action.DrawAction).toHaveBeenCalled();
		expect(acd.ol.action.DrawAction.calls.argsFor(0)).toContain(options);
	});
	
	it('geeft de juiste configuratie mee aan de draw interaction', function() {
		spyOn(ol.interaction, 'Draw').and.callFake(function() {
			return {
				setActive: function() {
				},
				on: function() {
				}
			};
		});

		var drawAction = new acd.ol.action.DrawLijnstukAction(layer, callback);
		expect(ol.interaction.Draw).toHaveBeenCalled();
		expect(ol.interaction.Draw.calls.argsFor(0)[0].maxPoints).toBe(2);
		expect(ol.interaction.Draw.calls.argsFor(0)[0].type).toBe('LineString');
		expect(ol.interaction.Draw.calls.argsFor(0)[0].source).toBe(source);
	});
	
});