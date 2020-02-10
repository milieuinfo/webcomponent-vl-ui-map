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