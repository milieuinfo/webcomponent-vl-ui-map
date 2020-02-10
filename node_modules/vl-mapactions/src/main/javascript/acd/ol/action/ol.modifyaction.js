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