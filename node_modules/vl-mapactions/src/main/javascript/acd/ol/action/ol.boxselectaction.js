acd.ol.action.BoxSelectAction = function(layer, onSelect, options) {
	var self = this;
	
	acd.ol.action.SelectAction.call(
		this, layer, function(feature) {
			if (feature) {
				onSelect([feature]);
			}
		}, options
	);
	
	this.dragBoxInteraction = new ol.interaction.DragBox({
		style: new ol.style.Style({
			stroke: new ol.style.Stroke({
				color: [0, 0, 255, 1]
			})
		})
	});
	
	this.addInteraction(this.dragBoxInteraction);
	
	this.dragBoxInteraction.on('boxdrag', function() {
		var boxExtent = self.dragBoxInteraction.getGeometry().getExtent();
		self.hoverInteraction.getFeatures().clear();
		layer.getSource().forEachFeatureIntersectingExtent(boxExtent, function(feature) {
			self.hoverInteraction.getFeatures().push(feature);
		});
	});
	
	this.dragBoxInteraction.on('boxend', function() {
		if (self.hoverInteraction.getFeatures().getLength() > 0) {
			onSelect(self.hoverInteraction.getFeatures().getArray().slice(0)); // copy of the current array to prevent issues in IE
		}
	});
};

acd.ol.action.BoxSelectAction.prototype = Object.create(acd.ol.action.SelectAction.prototype);