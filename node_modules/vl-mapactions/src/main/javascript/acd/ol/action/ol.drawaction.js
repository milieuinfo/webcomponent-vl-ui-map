acd.ol.action.DrawAction = function(layer, type, onDraw, options) {
	var self = this;

	var interactions = [];
	var drawOptions = options || {};
	drawOptions.source = layer.getSource();
	drawOptions.type = type;

	this.measurePointermoveHandler = undefined;
	var tooltip = undefined;
	
	this.drawInteraction = new ol.interaction.Draw(drawOptions);
	interactions.push(this.drawInteraction);

	if (drawOptions.snapping) {
		interactions.push(new acd.ol.interaction.SnapInteraction(drawOptions.snapping.layer || layer));
	}

	function showMeasureTooltip(feature, tooltip, tooltipElement) {
		var length = getLengthOfLastSegment(feature.getGeometry());
		if (length != 0) {
			tooltipElement.textContent = length + " m";
			tooltip.setElement(tooltipElement);
			tooltip.setPosition(feature.getGeometry().getLastCoordinate());
		}
	}
	
	function getLengthOfLastSegment(geometry) {
		if (geometry && geometry instanceof ol.geom.LineString) {
			return new ol.geom.LineString(getCoordinatesOfLastSegment(geometry)).getLength().toFixed(2);
		} else if (geometry && geometry instanceof ol.geom.Polygon) {
			return new ol.geom.LineString(getCoordinatesOfLastSegment(geometry.getLinearRing(0))).getLength().toFixed(2);
		}
		return 0;
	}
	
	function getCoordinatesOfLastSegment(geometry) {
		var size = geometry.getCoordinates().length;
		return geometry.getCoordinates().slice(size-2);
	}
	
	function removeTooltip() {
		if (tooltip) {
			self.map.removeOverlay(tooltip);
			tooltip = undefined;
		}
	}

	this.drawInteraction.on('drawstart', function(event) {
		if (drawOptions.measure) {
			var feature = event.feature;

			drawOptions.measure = typeof drawOptions.measure === 'object' ? drawOptions.measure : {};
			drawOptions.measure.tooltip = drawOptions.measure.tooltip || {};

			var tooltipElement = document.createElement('div');
			tooltipElement.setAttribute('class', 'measure-tooltip');

			tooltip = new ol.Overlay({
				offset: drawOptions.measure.tooltip.offset || [-15, 10],
				positioning: 'bottom-center'
			});

			self.map.addOverlay(tooltip);

			self.measurePointermoveHandler = self.map.on('pointermove', function() {
				showMeasureTooltip(feature, tooltip, tooltipElement );
			});
		}
	});

	this.cleanUp = function() {
		unLoadHandlerAndRemoveTooltip();
	};
	
	function unLoadHandlerAndRemoveTooltip() {
		if (drawOptions.measure) {
			self.map.unByKey(self.measurePointermoveHandler);
			removeTooltip();
		}
	}
	
	acd.ol.action.MapAction.call(this, interactions);
	
	this.drawInteraction.on('drawend', function (event) {
		var feature = event.feature;
		onDraw(feature, function cancelDraw() {
			try {
				layer.getSource().removeFeature(feature); // when the features was not yet added to the source we'll add a listener in the catch block
			} catch(exception) {
				var listener = layer.getSource().on('addfeature', function(event) {
					layer.getSource().removeFeature(event.feature);
					layer.getSource().unByKey(listener);
				});
			}
		});
		unLoadHandlerAndRemoveTooltip();
	});
		
};

acd.ol.action.DrawAction.prototype = Object.create(acd.ol.action.MapAction.prototype);
acd.ol.action.DrawAction.prototype.deactivate = function() {
	this.cleanUp();
	acd.ol.action.MapAction.prototype.deactivate.call(this);
};

