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
