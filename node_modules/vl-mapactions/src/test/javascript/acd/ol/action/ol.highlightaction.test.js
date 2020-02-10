describe('highlight action', function() {
	it('kan de highlight stijl definiëren', function() {
		var style = new ol.style.Style();
		
		var highlightAction = new acd.ol.action.HighlightAction({}, {
			style: style
		});
		
		expect(highlightAction.style).toBe(style);
	});
	
	it('kan de selectie en hover stijl niet bepalen als die niet gedefinieerd is', function() {
		var highlightAction = new acd.ol.action.HighlightAction({});
		expect(highlightAction.style).toBeNull();
	});
	
	it('kan features highlighten en dehighlighten', function() {
		var feature1 = new ol.Feature();
		var feature2 = new ol.Feature();
		feature1.setId(1);
		feature2.setId(2);
		
		var highlightAction = new acd.ol.action.HighlightAction({
			getSource: function() {
				return {
					getFeatureById: function(id) {
						return id == 1 ? feature1: feature2;
					}
				}
			}
		});
		
		highlightAction.highlightFeatureWithId(1);
		expect(highlightAction.isHighlighted(feature1)).toBe(true);
		expect(highlightAction.highlightInteraction.getFeatures().getLength()).toBe(1);
		highlightAction.highlightFeatureWithId(2);
		expect(highlightAction.isHighlighted(feature2)).toBe(true);
		expect(highlightAction.highlightInteraction.getFeatures().getLength()).toBe(2);
		highlightAction.dehighlightAllFeatures();
		expect(highlightAction.highlightInteraction.getFeatures().getLength()).toBe(0);
		expect(highlightAction.isHighlighted(feature1)).toBe(false);
		expect(highlightAction.isHighlighted(feature2)).toBe(false);
	});

	it('kan clusters highlighten en dehighlighten', function() {
		var feature1 = new ol.Feature();
		feature1.setId(1);
		var feature2 = new ol.Feature();
		feature2.setId(2);
		var feature3 = new ol.Feature();
		feature3.setId(3);
		var features = [feature1, feature2, feature3];
		var cluster1 = new ol.Feature();
		var cluster2 = new ol.Feature();
		cluster1.set('features', [feature1, feature2]);
		cluster2.set('features', [feature3]);
		var layer = new ol.layer.Vector({
			source: new ol.source.Vector({
				features: [cluster1, cluster2]
			})
		});
		var highlightAction = new acd.ol.action.HighlightAction(layer);
		
		highlightAction.highlightFeatureWithId(1);
		expect(highlightAction.isHighlighted(cluster1)).toBe(true);
		expect(highlightAction.isHighlighted(cluster2)).toBe(false);
		expect(highlightAction.highlightInteraction.getFeatures().getLength()).toBe(1);
		highlightAction.highlightFeatureWithId(2);
		expect(highlightAction.isHighlighted(cluster1)).toBe(true);
		expect(highlightAction.isHighlighted(cluster2)).toBe(false);
		highlightAction.dehighlightAllFeatures();
		expect(highlightAction.isHighlighted(cluster1)).toBe(false);
		expect(highlightAction.isHighlighted(cluster2)).toBe(false);
	});

	it('kan de highlight stijl niet bepalen als die niet gedefinieerd is', function() {
		var feature = new ol.Feature({id: 1});
		var highlightAction = new acd.ol.action.HighlightAction({});
		expect(highlightAction.style).toBeNull();
	});
	
	it('zal bij een deactivate de highlight features clearen', function() {
		var highlightAction = new acd.ol.action.HighlightAction({});
		var feature = new ol.Feature({id: 1});
		
		highlightAction.highlightInteraction.getFeatures().push(feature);
		highlightAction.deactivate();
		
		expect(highlightAction.highlightInteraction.getFeatures().getLength()).toBe(0);
	});
});