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