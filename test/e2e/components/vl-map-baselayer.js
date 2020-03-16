const { VlElement } = require('vl-ui-core').Test;

class VlMapBaseLayer extends VlElement {
	
	async getType() {
        return this.getAttribute('type');
	}

	async getUrl() {
        return this.getAttribute('url');
	}

	async getLayer() {
        return this.getAttribute('layer');
	}

	async getTitle() {
        return this.getAttribute('title');
	}
}

module.exports = VlMapBaseLayer;
