acd.ol.interaction.SnapInteraction = function(layer) {
	var source = layer ? layer.getSource() : null;
	
	ol.interaction.Snap.call(this, {
		source: source,
		pixelTolerance: 7
	});
}

acd.ol.interaction.SnapInteraction.prototype = Object.create(ol.interaction.Snap.prototype);