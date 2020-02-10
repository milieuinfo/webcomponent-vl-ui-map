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
