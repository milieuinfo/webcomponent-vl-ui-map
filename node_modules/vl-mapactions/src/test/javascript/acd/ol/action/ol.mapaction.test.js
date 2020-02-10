describe('map action', function() {
	function createFakeInteraction() {
		var active = true;
		return {
			getActive: function() {
				return active;
			},
			setActive: function(_active) {
				active = _active;
			}
		}
	}
	
	it('kan een interactie toevoegen die niet actief staat', function() {
		var mapAction = new acd.ol.action.MapAction([createFakeInteraction(), createFakeInteraction()]);
		var extraInteractie = createFakeInteraction();
		
		mapAction.addInteraction(extraInteractie);
		
		expect(mapAction.interactions.length).toBe(3);
		expect(extraInteractie.getActive()).toBe(false);
	});
	
	it('zet alle interacties default op inactief', function() {
		var mapAction = new acd.ol.action.MapAction([createFakeInteraction(), createFakeInteraction()]);
		
		mapAction.interactions.forEach(function(interaction) {
			expect(interaction.getActive()).toBe(false);
		});
	});
	
	it('kan de interacties actief zetten', function() {
		var mapAction = new acd.ol.action.MapAction([createFakeInteraction(), createFakeInteraction()]);
		
		mapAction.activate();
		
		mapAction.interactions.forEach(function(interaction) {
			expect(interaction.getActive()).toBe(true);
		});
	});
	
	it('kan de interacties terug deactief zetten', function() {
		var mapAction = new acd.ol.action.MapAction([createFakeInteraction(), createFakeInteraction()]);
		
		mapAction.activate();
		mapAction.deactivate();
		
		mapAction.interactions.forEach(function(interaction) {
			expect(interaction.getActive()).toBe(false);
		});
	});
});