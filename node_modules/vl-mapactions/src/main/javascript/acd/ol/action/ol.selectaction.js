acd.ol.action.SelectAction = function(layer, onSelect, options) {
	var self = this;
	
	this.cluster = options && options.cluster;
	this.filter = options && options.filter ? options.filter : function() { return true; };
	this.layer = layer;
	this.style = options ? options.style : null;
	this.hoverStyle = options ? options.hoverStyle || this.style : this.style;
	
	this.selectInteractionFilter = function(feature, layer) {
		self.selectInteraction.getFeatures().clear();
		return self.filter(feature, layer);
	};
	
	this.hoverInteractionFilter = function(feature, layer) {
		return self.filter(feature, layer) && !isSelected(feature);
	};
	
	this.getClusterWithFeatureId = function(clusters, id) {
		for (var i = 0; i < clusters.length; i++) {
			var features = clusters[i].get('features');
			if (features && getFeatureById(features, id)) {
				return clusters[i];
			}
		}
	};
	
	this.hoverInteraction = new ol.interaction.Select({
		filter: this.hoverInteractionFilter,
		condition: ol.events.condition.pointerMove,
		style: this.hoverStyle
	});
	
	this.markInteraction = new ol.interaction.Select({
		style: this.style,
	});
	
	this.selectInteraction = new ol.interaction.Select({
		filter: this.selectInteractionFilter
	});
	
	acd.ol.action.MapAction.call(this, [this.markInteraction, this.selectInteraction, this.hoverInteraction]);
	
	this.hoverInteraction.on('select', function() {
		var element = self.map.getTargetElement();
		if (self.hoverInteraction.getFeatures().getLength() > 0) {
			element.style.cursor = 'pointer';
		} else {
			element.style.cursor = '';
		}
	});
	
	this.selectedFeature = null;
	
	this.getLayer = function() {
		return layer;
	};
	
	this.selectInteraction.on('select', function(event) {
		self.markInteraction.getFeatures().clear();
		if (self.selectInteraction.getFeatures().getLength() > 0) {
			var selectedFeature = null;
			if (self.selectInteraction.getFeatures().getLength() == 1) {
				self.selectedFeature = self.selectInteraction.getFeatures().getArray()[0];
			} else {
				self.selectedFeature = nextFeature(self.selectInteraction.getFeatures());
			}
			if (onSelect) {
				onSelect(self.selectedFeature, event, self.getLayer(selectedFeature));
			}
		} else {
			self.selectedFeature = null;
			if (onSelect) {
				onSelect();
			}
		}
	});

	this.fixClusterBehavior = function() {
		if (self.selectedFeature) {
			var features = self.selectedFeature.get('features') || [self.selectedFeature];
			self.selectInteraction.getFeatures().clear();
			self.markInteraction.getFeatures().clear();
			if (features) {
				features.forEach(function(feature) {
					if (feature.getId()) {
						self.markFeatureWithId(feature.getId());
					}
				}, self);
			}
		}
	};
	
	function isSelected(feature) {
		return self.selectInteraction.getFeatures().getArray().indexOf(feature) !== -1;
	}
	
	function nextFeature(features) {
		var index = features.getArray().indexOf(self.selectedFeature);
		var next = index + 1;
		if (next > features.getLength() - 1) {
			next = 0;
		}
		return features.getArray()[next];
	};
	
	function getFeatureById(features, id) {
		for (var i = 0; i < features.length; i++) {
			if (features[i].getId() === id) {
				return features[i];
			}
		}
	}
};

acd.ol.action.SelectAction.prototype = Object.create(acd.ol.action.MapAction.prototype);

acd.ol.action.SelectAction.prototype.clearFeatures = function() {
	this.selectInteraction.getFeatures().clear();
	this.markInteraction.getFeatures().clear();
	this.hoverInteraction.getFeatures().clear();
};

acd.ol.action.SelectAction.prototype.activate = function() {
	if (this.cluster && this.map) {
		this.map.on('moveend', this.fixClusterBehavior);
		this.selectInteraction.on('select', this.fixClusterBehavior);
	}
	acd.ol.action.MapAction.prototype.activate.call(this);
};

acd.ol.action.SelectAction.prototype.deactivate = function() {
	if (this.cluster && this.map) {
		this.map.un('moveend', this.fixClusterBehavior);
		this.selectInteraction.un('select', this.fixClusterBehavior);
	}
	this.clearFeatures();
	acd.ol.action.MapAction.prototype.deactivate.call(this);
};

acd.ol.action.SelectAction.prototype.selectFeature = function(feature) {
	this.selectInteraction.getFeatures().push(feature);
	this.selectInteraction.dispatchEvent({
		type: 'select',
		feature: feature
	});
};

acd.ol.action.SelectAction.prototype.getSelectedFeatures = function() {
	return this.selectInteraction.getFeatures();
};

acd.ol.action.SelectAction.prototype.vergeetLaatstGeselecteerdeFeature = function() {
	this.selectedFeature = null;
};

acd.ol.action.SelectAction.prototype.markFeatureWithId = function(id, layer) {
	layer = layer || this.layer;
	var feature = layer.getSource().getFeatureById(id) || this.getClusterWithFeatureId(layer.getSource().getFeatures(), id);
	if (feature) {
		if (this.markInteraction.getFeatures().getArray().indexOf(feature) == -1) {
			this.markInteraction.getFeatures().push(feature);
		}
	}
};

acd.ol.action.SelectAction.prototype.isMarked = function(feature) {
	var marked = false;
	this.markInteraction.getFeatures().forEach(function(selectedFeature) {
		if (selectedFeature === feature) {
			marked = true;
		}
	});
	return marked;
};

acd.ol.action.SelectAction.prototype.demarkAllFeatures = function() {
	this.markInteraction.getFeatures().clear();
};