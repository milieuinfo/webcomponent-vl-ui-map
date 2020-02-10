function createLayer(source) {
	return {
		getSource: function() {
			return source;
		}
	};
}

function getFakeInteraction() {
	return {
		setActive: function() {},
		on: function() {}
	};
}