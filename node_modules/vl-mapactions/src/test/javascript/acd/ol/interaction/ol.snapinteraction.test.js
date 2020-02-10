describe('snapinteraction interaction', function() {

	var source = new ol.source.Vector();
	var layer = createLayer(source);

	it('bij het aanmaken van een acd snap interactie zal de openlayers snap interactie constructor correct opgeroepen worden', function() {
		spyOn(ol.interaction, 'Snap').and.callThrough();
		var snapInteraction = new acd.ol.interaction.SnapInteraction(layer);
		expect(ol.interaction.Snap).toHaveBeenCalledWith({
			source: source,
			pixelTolerance: jasmine.any(Number)
		});
	});
	
});