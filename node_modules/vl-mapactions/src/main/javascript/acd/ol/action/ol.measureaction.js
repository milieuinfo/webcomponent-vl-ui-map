acd.ol.action.MeasureAction = function(layer, options) {
	var self = this;
	var featureCounter = 0;

	this.layer = layer;
	this.measureTooltips = [];
	this.measurePointermoveHandler = undefined;
	
	function showMeasureTooltip(feature, tooltip, tooltipElement) {
		var length = feature.getGeometry().getLength().toFixed(2);
		tooltipElement.textContent = length + " m";
		tooltip.setElement(tooltipElement);
		tooltip.setPosition(feature.getGeometry().getLastCoordinate());
	}
	
	acd.ol.action.DrawAction.call(this, layer, 'LineString', function() {
		self.map.unByKey(self.measurePointermoveHandler);
	}, options);
	
	this.drawInteraction.on('drawstart', function(event) {
		var id = featureCounter++;
		var measureFeature = event.feature;
		measureFeature.setId(id);
		var tooltipElement = document.createElement('div');
		tooltipElement.setAttribute('class', 'measure-tooltip');
		var tooltip = new ol.Overlay({
			offset: [-15, 10],
			positioning: 'bottom-center'
		});
		self.map.addOverlay(tooltip);
		self.measureTooltips[id] = tooltip;
		self.measurePointermoveHandler = self.map.on('pointermove', function() { 
			showMeasureTooltip(measureFeature, tooltip, tooltipElement);
		});
	});

	function removeTooltip(id) {
		self.map.removeOverlay(self.measureTooltips[id]);
		self.measureTooltips[id] = null;
	}
	
	this.layer.getSource().on("removefeature", function(event) {
		removeTooltip(event.feature.getId());
	});
	
	this.cleanUp = function() {
		this.map.unByKey(this.measurePointermoveHandler);
		var tooltipsToRemove = [];
		self.measureTooltips.forEach(function(value, index){
			if (self.layer.getSource().getFeatureById(index) == undefined) {
				tooltipsToRemove.push(index);
			}
		});
		tooltipsToRemove.forEach(function(id){
			removeTooltip(id);
		});
	};
	
	this.getTooltipFor = function(id) {
		return this.measureTooltips[id];
	};
};

acd.ol.action.MeasureAction.prototype = Object.create(acd.ol.action.DrawAction.prototype);

acd.ol.action.MeasureAction.prototype.deactivate = function() {
	this.cleanUp();
	acd.ol.action.MapAction.prototype.deactivate.call(this);
};
