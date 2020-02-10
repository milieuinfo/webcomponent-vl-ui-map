var acd = acd || {};
acd.ol = acd.ol || {};
acd.ol.MapWithActions = function (options) {
  var self = this;
  this.actions = [];

  options = options || {};
  var enableRotation = !options.disableRotation;
  var enableMouseWheelZoom = !options.disableMouseWheelZoom;
  var interactions = ol.interaction.defaults({altShiftDragRotate: enableRotation, pinchRotate: enableRotation, mouseWheelZoom: enableMouseWheelZoom});
  if(options && options.interactions){
    options.interactions.forEach(function(interaction) {interactions.push(interaction);});
  }
  options.interactions = interactions;
  ol.Map.call(this, options);

  options.actions.forEach(function (action) {
    self.addAction(action);
  });

  self.activateDefaultAction();

  if (!options.disableEscapeKey) {
    function activateFirstActionOnEscapeKey(e) {
      if (e && e.keyCode && e.keyCode == 27) {
        self.activateDefaultAction();
      }
    }

    document.body.removeEventListener('keydown',
        activateFirstActionOnEscapeKey);
    document.body.addEventListener('keydown', activateFirstActionOnEscapeKey);
  }
};

acd.ol.MapWithActions.prototype = Object.create(ol.Map.prototype);

acd.ol.MapWithActions.prototype.activateAction = function (action) {
  if (this.currentAction) {
    if (this.currentAction == action) {
      return false;
    }

    this.currentAction.deactivate();
    clearTimeout(this.timeout);
  }

  this.currentAction = action;

  // delay the activation of the action with 300ms because ol has a timeout of 251ms to detect a double click event
  // when we don't use a delay some click and select events of the previous action will be triggered on the new action
  this.timeout = setTimeout(function () {
    action.activate();
  }, acd.ol.MapWithActions.prototype.CLICK_COUNT_TIMEOUT);
};

acd.ol.MapWithActions.prototype.addAction = function (action) {
  var self = this;
  this.actions.push(action);
  action.map = this;
  action.interactions.forEach(function (interaction) {
    self.addInteraction(interaction);
  });
};

acd.ol.MapWithActions.prototype.removeAction = function (action) {
  var self = this;
  if (this.currentAction == action) {
    self.activateDefaultAction();
  }
  action.interactions.forEach(function (interaction) {
    self.removeInteraction(interaction);
  });
  this.actions.splice(this.actions.indexOf(action), 1);
};

acd.ol.MapWithActions.prototype.activateDefaultAction = function () {
  if (this.actions.length > 0 && this.actions[0]) {
    if (this.currentAction == this.actions[0]) {
      this.currentAction.deactivate();
      this.currentAction = undefined;
    }
    this.activateAction(this.actions[0]);
  }
};

acd.ol.MapWithActions.prototype.CLICK_COUNT_TIMEOUT = 300;
//enhances the ol.mapwithactions.js with additional custom functions (zooming and layer switcher) and an overviewmap 
acd.ol.CustomMap = function (options) {
	var self  = this;
	
	this.projection = options.projection;
	
	this.geoJSONFormat = new ol.format.GeoJSON({
		defaultDataProjection: options.projection
	});
	
	options.layers = [
		options.customLayers.baseLayerGroup,
		options.customLayers.overlayGroup
	];
	
	this.custom = options.custom || {};

	if (options.customLayers.overviewMapLayers && options.customLayers.overviewMapLayers.length > 0) {
		this.createOverviewMapControl(options);
	}
	
	options.controls = options.controls || [
		new ol.control.Zoom(),
		new ol.control.Rotate(),
		new ol.control.ZoomSlider(),
		new ol.control.ScaleLine({
			minWidth: 128
		})
	];
	
	this.baseLayers = options.customLayers.baseLayerGroup.getLayers().getArray();
	
	acd.ol.MapWithActions.call(this, options);
	
	function getTarget() {
		if (typeof self.getTarget() === 'string' || self.getTarget() instanceof String) {
			return document.querySelector$('#' + self.getTarget());
		} else {
			return self.getTarget();
		}
	}
	
	// add the overlay container with zoom buttons, scale, overviewmap, ... to it's parent, otherwise it inherits the relative positioning and will be rendered left under the project tree
	if (this.getTargetElement()) {
		getTarget().parentNode.appendChild(this.getTargetElement().querySelector('.ol-overlaycontainer'));
		getTarget().parentNode.appendChild(this.getTargetElement().querySelector('.ol-overlaycontainer-stopevent'));
	}
	
	this.maxZoomViewToExtent = options.maxZoomViewToExtent || 16;
};

acd.ol.CustomMap.prototype = Object.create(acd.ol.MapWithActions.prototype);

acd.ol.CustomMap.prototype.createOverviewMapControl = function(options) {
	var self = this;
	
	this.overviewMapLayers = options.customLayers.overviewMapLayers;
	this.overviewMapControl = new ol.control.OverviewMap({
		layers: this.overviewMapLayers,
		collapsed: false,
		view: new ol.View({
			projection: this.projection
		})
	});
	
	this.overviewMapControl.element.addEventListener('click', function() {toggleBaseLayer();}, false);
	var overlayElement = this.overviewMapControl.element.getElementsByClassName('ol-overlay-container')[0];
	if (overlayElement) {
		overlayElement.addEventListener('click', function() {toggleBaseLayer();}, false);
	}
	
	if (options.view) {
		options.controls.push(this.overviewMapControl);
	}
	
	this.custom.toggleBaseLayer = toggleBaseLayer;
	
	function toggleBaseLayer(baseLayer) {
		function getNextLayerAfterVisibleLayer(layers) {
			var currentIndex = 0;
			self.baseLayers.forEach(function (layer, index) {
				if (layer.getVisible()) {
					currentIndex = index;
				}
			});
			return layers[(currentIndex + 1) >= layers.length ? 0 : currentIndex + 1];
		}
		if (!baseLayer) {
			baseLayer = getNextLayerAfterVisibleLayer(self.baseLayers);
		}
		self.baseLayers.forEach(function (layer) {
			layer.setVisible(layer == baseLayer);
		});
		var overviewMapLayers = self.overviewMapControl.getOverviewMap().getLayers().getArray();
		var nextVisibleOverviewMapLayer = getNextLayerAfterVisibleLayer(overviewMapLayers);
		overviewMapLayers.forEach(function (layer) {
			layer.setVisible(layer == nextVisibleOverviewMapLayer);
		});
		self.render();
		self.overviewMapControl.getOverviewMap().render();
	}
}

acd.ol.CustomMap.prototype.addBaseLayerAndOverlayMapLayer = function(baseLayer, overlayMapLayer) {
	var self = this;

	baseLayer.setVisible(self.baseLayers.length == 0);
	self.baseLayers.push(baseLayer);
	
	if (this.overviewMapControl) {
		this.overviewMapControl.getOverviewMap().getLayers().getArray().push(overlayMapLayer);
	}
	else {
		this.createOverviewMapControl(	{
											customLayers: {
												overviewMapLayers: [overlayMapLayer]
											}
										});
	}
	overlayMapLayer.setVisible(this.overviewMapControl.getOverviewMap().getLayers().getArray().length == 2);
}

acd.ol.CustomMap.prototype.getBaseLayers = function() {
	return this.getLayerGroup().getLayers().getArray()[0].getLayers().getArray();
}
acd.ol.CustomMap.prototype.getOverlayLayers = function() {
	return this.getLayerGroup().getLayers().getArray()[1].getLayers().getArray();
}

acd.ol.CustomMap.prototype.initializeView = function(boundingBox, maxZoom) {
	if (!this.getView().getZoom()) {
		var view = new ol.View({
			extent: this.projection.getExtent(),
			projection: this.projection,
			maxZoom: 16,
			minZoom: 2,
			center: [140860.69299028325, 190532.7165957574],
			zoom: 2
		});
		this.zoomViewToExtent(view, boundingBox, maxZoom);
		this.setView(view);
		if (this.overviewMapControl) {
			this.addControl(this.overviewMapControl); // control needs to be added after view initialization
		}
	}
};

acd.ol.CustomMap.prototype.zoomToExtent = function(boundingBox, maxZoom) {
	this.zoomViewToExtent(this.getView(), boundingBox, maxZoom);
};

acd.ol.CustomMap.prototype.zoomViewToExtent = function(view, boundingBox, maxZoom) {
	if (boundingBox) {
		view.fit(boundingBox, this.getSize());
	}
	
	if (maxZoom || this.maxZoomViewToExtent) {
		if (view.getZoom() > (maxZoom || this.maxZoomViewToExtent)) {
			view.setZoom(maxZoom || this.maxZoomViewToExtent);
		}
	}
};

acd.ol.CustomMap.prototype.zoomToGeometry = function(geometry, maxZoom) {
	var geoJson = {
		type: 'FeatureCollection',
		features: [{
			type: 'Feature',
			geometry: geometry
		}]
	};
	this.zoomToExtent(this.geoJSONFormat.readFeatures(geoJson)[0].getGeometry().getExtent(), maxZoom);
};

acd.ol.CustomMap.prototype.showInfo = function(info, coordinate) {
	var close = document.createElement("div");
	close.setAttribute('class', 'close');
	close.onclick = function() {
		event.currentTarget.parentNode.remove();
	};
	
	var element = document.createElement('div');
	element.innerHTML = "<span class='content'>" + info + "</span><div class='arrow'></div>";
	element.setAttribute('class', 'info-tooltip');
	element.appendChild(close);
	
	var tooltip = new ol.Overlay({
		offset: [0, -5],
		positioning: 'bottom-center',
		element: element
	});
	
	this.addOverlay(tooltip);
	tooltip.setPosition(coordinate);
	element.parentNode.style.position = 'fixed'; // because the overlay has absolute positioning and otherwise the left side panel could influence the overlay elements
};
acd.ol.action = acd.ol.action || {};
acd.ol.action.MapAction = function(interactions) {
	var self = this;
	if (!Array.isArray(interactions)) {
		interactions = [interactions];
	}
	this.interactions = [];
	
	interactions.forEach(function(interaction) {
		self.addInteraction(interaction);
	});
};

acd.ol.action.MapAction.prototype.addInteraction = function(interaction) {
	interaction.setActive(false);
	this.interactions.push(interaction);
};

acd.ol.action.MapAction.prototype.activate = function() {
	this.interactions.forEach(function(interaction) {
		interaction.setActive(true);
	});
};

acd.ol.action.MapAction.prototype.deactivate = function() {
	this.interactions.forEach(function(interaction) {
		interaction.setActive(false);
	});
};

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
acd.ol.action.DeleteAction = function(layer, onDelete, options) {
	var self = this;
	
	var defaultStyle = new ol.style.Style({
		fill: new ol.style.Fill({
			color: 'rgba(217, 83, 79, 0.6)'
		}),
		stroke: new ol.style.Stroke({
			color: '#d9534f',
			width: 5
		}),
		image: new ol.style.Circle({
			radius: 4,
			stroke: new ol.style.Stroke({
				color: '#d9534f',
				width: 5
			}),
			fill: new ol.style.Fill({
				color: 'rgba(217, 83, 79, 0.6)'
			})
		})
	});
	
	var style = options ? options.style || defaultStyle : defaultStyle;
	
	function removeFeature(feature) {
		if (feature && layer.getSource().getFeatureById(feature.getId()) === feature) {
			layer.getSource().removeFeature(feature);
		}
	}
	
	acd.ol.action.BoxSelectAction.call(
		this,
		layer,
		function(features) {
			if (onDelete && onDelete != null) {
				onDelete(features, function success(feature) {
					removeFeature(feature);
					self.clearFeatures();
				}, function cancel() {
					self.clearFeatures();
				});
			} else {
				features.forEach(function(feature) {
					removeFeature(feature);
				});
				self.clearFeatures();
			}
		}, {
			style: style
		}
	);
};

acd.ol.action.DeleteAction.prototype = Object.create(acd.ol.action.BoxSelectAction.prototype);
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


acd.ol.action.DrawLijnstukAction = function(layer, onDraw, options) {
	var options = options || {};
	options.maxPoints = 2;
	acd.ol.action.DrawAction.call(this, layer, 'LineString', onDraw, options);
};
acd.ol.action.DrawLijnstukAction.prototype = Object.create(acd.ol.action.DrawAction.prototype);

acd.ol.action.DrawRectangleAction = function(layer, onDraw, options) {
	var options = options || {};
	options.maxPoints = 2;
	options.geometryFunction = function(coordinates, geometry) {
		if (!geometry) {
			geometry = new ol.geom.Polygon(null);
		}
		var start = coordinates[0];
		var end = coordinates[1];
		geometry.setCoordinates([
			[start, [start[0], end[1]], end, [end[0], start[1]], start]
		]);
		return geometry;
	};
	
	acd.ol.action.DrawAction.call(this, layer, 'LineString', onDraw, options);
};
acd.ol.action.DrawRectangleAction.prototype = Object.create(acd.ol.action.DrawAction.prototype);

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

acd.ol.action.ModifyAction = function(layer, onModify, options) {
	var self = this;
	var filter = options ? options.filter : null;
	
	acd.ol.action.SelectAction.call(
		this, layer, null, {
			filter: filter
		}
	);
	
	this.modifyInteraction = new ol.interaction.Modify({
		features: this.selectInteraction.getFeatures()
	});
	
	this.addInteraction(this.modifyInteraction);
	
	if (options && options.snapping) {
		this.addInteraction(new acd.ol.interaction.SnapInteraction(options.snapping.layer || layer));
	}
	
	this.modifyInteraction.on('modifystart', function(event) {
		self.currentGeometryBeingModified = event.features.getArray()[0].getGeometry().clone();
	});
	
	this.modifyInteraction.on('modifyend', function(event) {
		event.features.forEach(function(feature) {
			onModify(feature, function cancelModify(feature) {
				feature.setGeometry(self.currentGeometryBeingModified);
			});
		});
	});
};

acd.ol.action.ModifyAction.prototype = Object.create(acd.ol.action.SelectAction.prototype);
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
acd.ol.action.ShowInfoAction = function(layer, infoPromise, loadingMessage, tooltipOptions) {
	var self = this;
	self.layer = layer;
	self.tooltips = new acd.ol.action.Tooltips(layer, infoPromise, loadingMessage);

	acd.ol.action.DrawAction.call(this, layer, 'Point', function(feature){
		self.tooltips.showTooltip(self.map, feature, feature.getGeometry().getCoordinates(), tooltipOptions);
	});
};

acd.ol.action.ShowInfoAction.prototype = Object.create(acd.ol.action.DrawAction.prototype);

acd.ol.action.ShowInfoAction.prototype.clear = function() {
	var self = this;
	self.tooltips.clear(self.map);
	self.layer.getSource().clear();
};

acd.ol.action.ShowInfoAction.prototype.deactivate = function() {
	this.clear();
	acd.ol.action.MapAction.prototype.deactivate.call(this);
};
acd.ol.action.ShowInfoSelectAction = function(layer, infoPromise, loadingMessage, doneLoading, tooltipOptions) {
	var self = this;

	this.tooltips = new acd.ol.action.Tooltips(layer, infoPromise, loadingMessage, doneLoading);
	this.layer = layer;
	
	acd.ol.action.SelectAction.call(this, layer, function(feature, event) {
		if (feature) {
			var coordinate = feature.getGeometry().getClosestPoint(event.mapBrowserEvent.coordinate);
			self.tooltips.showTooltip(self.map, feature, coordinate, tooltipOptions);
		}
	});
};

acd.ol.action.ShowInfoSelectAction.prototype = Object.create(acd.ol.action.SelectAction.prototype);

acd.ol.action.ShowInfoSelectAction.prototype.clear = function() {
	var self = this;
	self.tooltips.clear(self.map);
};

acd.ol.action.ShowInfoSelectAction.prototype.deactivate = function() {
	this.clear();
	this.layer.setVisible(this.visible);
	acd.ol.action.SelectAction.prototype.deactivate.call(this);
};

acd.ol.action.ShowInfoSelectAction.prototype.activate = function() {
	this.visible = this.layer.getVisible();
	this.layer.setVisible(true);
	acd.ol.action.SelectAction.prototype.activate.call(this);
};
acd.ol.action.SplitAction = function(layer, onSplit, options) {
	var self = this;
	var reader = new jsts.io.OL3Parser();
	
	this.interactions = [];
	
	this.selectAction = new acd.ol.action.SelectAction(layer, function onSelect(feature) {
		if (feature) {
			self.selectAction.deactivate();
			acd.ol.action.MapAction.prototype.activate.call(self.drawAction);
		}
	}, options);
	
	this.drawAction = new acd.ol.action.DrawAction(layer, 'LineString', function onDraw(drawnFeature) {
		var selectedFeature = self.selectAction.selectedFeature;
		var selectedGeometry = reader.read(selectedFeature.getGeometry().getPolygons()[0]);
		var drawnGeometry = reader.read(drawnFeature.getGeometry());
		var union = selectedGeometry.getExteriorRing().union(drawnGeometry);
		var polygonizer = new jsts.operation.polygonize.Polygonizer();
		polygonizer.add(union);
		
		var result = [];
		var polygons = polygonizer.getPolygons();
		for (var i = polygons.iterator(); i.hasNext();) {
		    var multiPolygon = new ol.geom.MultiPolygon();
		    multiPolygon.appendPolygon(reader.write(i.next()));
		    result.push(new ol.Feature({
		    	geometry: multiPolygon
		    }));
		}
		
		if (onSplit) {
			onSplit(selectedFeature, result);
		}
		
		self.selectAction.clearFeatures();
		
		setTimeout(function() {
			acd.ol.action.MapAction.prototype.deactivate.call(self.drawAction);
			acd.ol.action.MapAction.prototype.activate.call(self.selectAction);
		});
	}, options);
};

acd.ol.action.SplitAction.prototype = Object.create(acd.ol.action.SelectAction.prototype);

acd.ol.action.SplitAction.prototype.activate = function() {
	this.map.addAction(this.selectAction);
	this.map.addAction(this.drawAction);
	this.selectAction.activate();
};

acd.ol.action.SplitAction.prototype.deactivate = function() {
	this.selectAction.deactivate();
	this.drawAction.deactivate();
};
acd.ol.action.Tooltips = function(layer, infoPromise, loadingMessage, doneLoading) {
	var self = this;
	self.layer = layer;
	layer.tooltips = [];

	this.showTooltip = function(map, feature, coordinates, options) {
        options = options || {};

        var element = document.createElement('div');
		element.innerHTML = "<span class='content'></span><div class='arrow'></div>";
		element.setAttribute('class', 'info-tooltip');

		var tooltip = new ol.Overlay({
			offset: options.offset || [0, -10],
			positioning: 'bottom-center',
			insertFirst: false
		});
		
		tooltip.setElement(element);
		map.addOverlay(tooltip);
		layer.tooltips.push(tooltip);

		function showInfoContent(content) {
			element.childNodes[0].innerHTML = content;
			tooltip.setPosition(coordinates);
			tooltip.setElement(element);
			element.parentNode.style.position = 'fixed'; // because the overlay has absolute positioning and otherwise the left side panel could influence the overlay elements
		}
		
		var delay = 100; // Maximum time we wait on the promise to be resolved before rendering a loading element
		var resolveDelay = 0; // Minimum time the loading element will be displayed to prevent flashy text
		var loading = setTimeout(function() {
			resolveDelay = 500; // Set the minimum delay time the loading element will be visible
			showInfoContent("<span class='icon'></span> " + (loadingMessage ? loadingMessage : "Info berekenen  ..."));
		}, delay);
		
		infoPromise(feature, coordinates).then(function(result) {
			setTimeout(function() {
				clearTimeout(loading);
				showInfoContent(result);
                map.render(); // re-render the map so changes in the size of the tooltip (due to different content) don't result in a badly placed tooltip
                if (doneLoading) {
					doneLoading(feature, coordinates);
				}
			}, resolveDelay);
		});
	};
	
	this.clear = function(map) {
		self.layer.tooltips.forEach(function(tooltip) {
			map.removeOverlay(tooltip);
		});
	}
};
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
acd.ol.interaction = {};
acd.ol.interaction.SnapInteraction = function(layer) {
	var source = layer ? layer.getSource() : null;
	
	ol.interaction.Snap.call(this, {
		source: source,
		pixelTolerance: 7
	});
}

acd.ol.interaction.SnapInteraction.prototype = Object.create(ol.interaction.Snap.prototype);