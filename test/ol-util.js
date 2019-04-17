class OpenLayersUtil {
	static createDummyLayer(id, source) {
		return {
			id: id,
			addEventListener: () => {},
			getSource: () => {
				return source || OpenLayersUtil.createDummySource()
			}
		};
	}
	
	static createDummyLayerGroup(id) {
		return {
			id: id,
			getLayers: () => {
				return {
					getArray: () => {}
				}
			},
			addEventListener: () => {}
		};
	}
	
	static createDummySource(features) {
		return {
			addEventListener: () => {},
			getExtent: () => {},
			getFeatures: () => {
				return features;
			},
			clear: () => {},
			addFeatures: () => {}
		}
	}
}