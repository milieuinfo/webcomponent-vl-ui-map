const { VlElement } = require('vl-ui-core').Test;

class VlMapBaseLayer extends VlElement {
	
	async getName() {
		const tagName = await this.getTagName();
		return tagName.substring("vl-map-baselayer-".length);
	}
}

module.exports = VlMapBaseLayer;
