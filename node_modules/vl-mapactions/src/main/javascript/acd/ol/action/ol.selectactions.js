acd.ol.action.SelectActions = function(layerConfiguraties, onSelect, options) {
	var self = this;
	
	this.layers = layerConfiguraties.map(function(layerConfiguratie) {
		return layerConfiguratie.layer;
	});
	
	this.style = function(feature) {
		var style = getLayerStyle(self.getLayer(feature));
		return style && typeof style === "function" ? style(feature) : style;
	};
	
	this.hoverStyle = function(feature) {
		var style = getLayerHoverStyle(self.getLayer(feature));
		return style && typeof style === "function" ? style(feature) : style;
	};
	
	this.filter = function(feature, layer) {
		var layerFilter = false;
		self.layers.forEach(function(_layer) {
			if (_layer == layer) {
				layerFilter = true;
			}
		});
		if (options && options.filter) {
			return layerFilter && options.filter(feature);
		}
		return layerFilter;
	};
	
	acd.ol.action.SelectAction.call(
		this, this.layers, onSelect, {
			filter: this.filter,
			style: this.style,
			hoverStyle: this.hoverStyle
		}
	);
	
	this.getLayer = function(feature) {
		var layer = undefined;
		self.layers.forEach(function(_layer) {
			if (_layer.getSource().getFeatures().indexOf(feature) !== -1) {
				layer = _layer;
			}
		});
		return layer;
	};
	
	function getLayerStyle(layer, type) {
		var layerConfiguratie = layerConfiguraties.filter(function(layerConfiguratie) {
			return layerConfiguratie.layer === layer;
		})[0];
		return layerConfiguratie ? layerConfiguratie[type || 'style'] : null;
	}
	
	function getLayerHoverStyle(layer) {
		return getLayerStyle(layer, 'hoverStyle') || getLayerStyle(layer);
	}
};

acd.ol.action.SelectActions.prototype = Object.create(acd.ol.action.SelectAction.prototype);

acd.ol.action.SelectActions.prototype.markFeatureWithId = function(id, layer) {
	if (layer) {
		acd.ol.action.SelectAction.prototype.markFeatureWithId.call(this, id, layer);
	} else {
		var self = this;
		this.layers.forEach(function(layer) {
			acd.ol.action.SelectAction.prototype.markFeatureWithId.call(self, id, layer);
		});
		//todo refactor! : this is wrong: what if multiple features have same id but different layer?
	}
};