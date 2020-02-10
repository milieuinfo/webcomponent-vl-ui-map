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