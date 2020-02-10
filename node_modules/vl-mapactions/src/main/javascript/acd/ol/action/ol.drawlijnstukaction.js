acd.ol.action.DrawLijnstukAction = function(layer, onDraw, options) {
	var options = options || {};
	options.maxPoints = 2;
	acd.ol.action.DrawAction.call(this, layer, 'LineString', onDraw, options);
};
acd.ol.action.DrawLijnstukAction.prototype = Object.create(acd.ol.action.DrawAction.prototype);
