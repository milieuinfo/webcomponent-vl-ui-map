acd.ol.action.ModifyAndTranslateAction = function(layer, onModify, options) {
	var self = this;
	
	acd.ol.action.ModifyAction.call(
		this, layer, onModify, options
	);
	
	this.translateInteraction = new ol.interaction.Translate({
		features: this.selectInteraction.getFeatures()
	});
	
	this.addInteraction(this.translateInteraction);
	
	this.translateInteraction.on('translateend', function(event) {
		event.features.forEach(function(feature) {
			onModify(feature, function cancelTranslate(feature) {
				feature.getGeometry().setCoordinates(feature.get("entity").geometry.coordinates);
			});
			self.selectInteraction.getFeatures().clear();
		});
	});
};

acd.ol.action.ModifyAndTranslateAction.prototype = Object.create(acd.ol.action.ModifyAction.prototype);