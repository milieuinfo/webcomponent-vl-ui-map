acd.ol.action.TranslateAction = function(layer, onTranslate) {
	var self = this;
	this.selectInteraction = new ol.interaction.Select({
		layers: [layer],
		style: layer.selectionStyle
	});
	this.translateInteraction = new ol.interaction.Translate({
		features: this.selectInteraction.getFeatures(),
		layers: [layer]
	});
	
	acd.ol.action.MapAction.call(this, [this.selectInteraction, this.translateInteraction]);
	
	this.translateInteraction.on('translateend', function(event) {
		event.features.forEach(function(feature) {
			onTranslate(feature, function cancelTranslate(feature) {
                feature.getGeometry().setCoordinates(feature.get("entity").geometry.coordinates);
            });
			self.selectInteraction.getFeatures().clear();
		});
	});
};

acd.ol.action.TranslateAction.prototype = Object.create(acd.ol.action.MapAction.prototype);

acd.ol.action.TranslateAction.prototype.deactivate = function() {
	this.selectInteraction.getFeatures().clear();
	acd.ol.action.MapAction.prototype.deactivate.call(this);
};