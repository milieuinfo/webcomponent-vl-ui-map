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