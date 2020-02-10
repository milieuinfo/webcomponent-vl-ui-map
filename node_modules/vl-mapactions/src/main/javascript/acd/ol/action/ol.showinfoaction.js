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