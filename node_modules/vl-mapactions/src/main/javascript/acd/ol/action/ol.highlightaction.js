acd.ol.action.HighlightAction = function(layer, options) {
	this.layer = layer;
	this.style = options ? options.style : null;
	
	this.getFeatureById = function(features, id) {
		for (var i = 0; i < features.length; i++) {
			if (features[i].getId() === id) {
				return features[i];
			}
		}
	}
	
	this.getClusterByFeatureId = function(clusters, id) {
		for (var i = 0; i < clusters.length; i++) {
			var features = clusters[i].get('features');
			if (features && this.getFeatureById(features, id)) {
				return clusters[i];
			}
		}
	}
	
	this.highlightInteraction = new ol.interaction.Select({
		layers: [layer],
		condition: ol.events.condition.pointerMove,
		style: this.style
	});
	
	acd.ol.action.MapAction.call(this, [this.highlightInteraction]);
};

acd.ol.action.HighlightAction.prototype = Object.create(acd.ol.action.MapAction.prototype);

acd.ol.action.HighlightAction.prototype.deactivate = function() {
	this.dehighlightAllFeatures();
	acd.ol.action.MapAction.prototype.deactivate.call(this);
};

acd.ol.action.HighlightAction.prototype.highlightFeatureWithId = function(id) {
	if (id) {
		var feature = this.layer.getSource().getFeatureById(id) || this.getClusterByFeatureId(this.layer.getSource().getFeatures(), id);
		if (feature) {
			if (this.highlightInteraction.getFeatures().getArray().indexOf(feature) == -1) {
				this.highlightInteraction.getFeatures().push(feature);
			}
		}
	}
};

acd.ol.action.HighlightAction.prototype.isHighlighted = function(feature) {
	var highlighted = false;
	this.highlightInteraction.getFeatures().forEach(function(highlightedFeature) {
		if (highlightedFeature === feature) {
			highlighted = true;
		}
	});
	return highlighted;
};

acd.ol.action.HighlightAction.prototype.dehighlightAllFeatures = function() {
	this.highlightInteraction.getFeatures().clear();
};