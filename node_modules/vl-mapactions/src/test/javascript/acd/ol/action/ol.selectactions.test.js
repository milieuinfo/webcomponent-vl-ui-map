describe('select actions', function() {
	it('select actions is een select action', function() {
		var selectActions = new acd.ol.action.SelectActions([{}], null, {});
		expect(selectActions instanceof acd.ol.action.SelectAction).toBe(true);
	});

	it('select actions propageert de juiste argumenten door naar de select action', function() {
		spyOn(acd.ol.action, 'SelectAction');
		
		var feature1 = new ol.Feature();
		var feature2 = new ol.Feature();
		
		var layer1 = new ol.layer.Vector({
			source: new ol.source.Vector({
				features: [feature1]
			})
		});
		
		var layer2 = new ol.layer.Vector({
			source: new ol.source.Vector({
				features: [feature2]
			})
		});
		
		var style1 = new ol.style.Style();
		var style2 = new ol.style.Style();
		var hoverStyle1 = new ol.style.Style();
		var hoverStyle2 = new ol.style.Style();
		
		var layerConfiguraties = [{
			layer: layer1,
			style: style1,
			hoverStyle: hoverStyle1
		}, {
			layer: layer2,
			style: style2,
			hoverStyle: hoverStyle2
		}];
		
		var onSelect = jasmine.createSpy('onSelect');
		var filter = jasmine.createSpy('filter');
		var options = {
			filter: filter
		};
		
		var selectActions = new acd.ol.action.SelectActions(layerConfiguraties, onSelect, options);
		expect(acd.ol.action.SelectAction).toHaveBeenCalledWith([layer1, layer2], onSelect, jasmine.any(Object));
		var styleFunctie = acd.ol.action.SelectAction.calls.argsFor(0)[2].style;
		var hoverStyleFunctie = acd.ol.action.SelectAction.calls.argsFor(0)[2].style;
		expect(styleFunctie(feature1)).toEqual(style1);
		expect(styleFunctie(feature2)).toEqual(style2);
		expect(hoverStyleFunctie(feature1)).toEqual(hoverStyle1);
		expect(hoverStyleFunctie(feature2)).toEqual(hoverStyle2);
	});
	
	it('kan de selectie en hover stijl per kaartlaag definiëren', function() {
		var selectieStyle1 = function() { return new ol.style.Style(); };
		var selectieStyle2 = function() { new ol.style.Style(); };
		var hoverStyle1 = function() { return new ol.style.Style(); };
		var hoverStyle2 = function() { return new ol.style.Style(); };
		var feature1 = new ol.Feature();
		var feature2 = new ol.Feature();
		
		var layerConfiguraties = [{
			layer: new ol.layer.Vector({
				source: new ol.source.Vector({
					features: [feature1]
				})
			}),
			style: selectieStyle1,
			hoverStyle: hoverStyle1
		}, {
			layer: new ol.layer.Vector({
				source: new ol.source.Vector({
					features: [feature2]
				})
			}),
			style: selectieStyle2,
			hoverStyle: hoverStyle2
		}];
		
		var selectActions = new acd.ol.action.SelectActions(layerConfiguraties, null, {});
		expect(selectActions.style(feature1)).toEqual(selectieStyle1(feature1));
		expect(selectActions.style(feature2)).toEqual(selectieStyle2(feature2));
		expect(selectActions.hoverStyle(feature1)).toEqual(hoverStyle1(feature1));
		expect(selectActions.hoverStyle(feature2)).toEqual(hoverStyle2(feature2));
	});
	
	it('zal per kaartlaag terugvallen op de selectie stijl indien er geen hover stijl gedefinieerd is', function() {
		var selectieStyle1 = function() { return new ol.style.Style(); };
		var selectieStyle2 = function() { new ol.style.Style(); };
		var feature1 = new ol.Feature();
		var feature2 = new ol.Feature();
		
		var layerConfiguraties = [{
			layer: new ol.layer.Vector({
				source: new ol.source.Vector({
					features: [feature1]
				})
			}),
			style: selectieStyle1
		}, {
			layer: new ol.layer.Vector({
				source: new ol.source.Vector({
					features: [feature2]
				})
			}),
			style: selectieStyle2
		}];
		
		var selectActions = new acd.ol.action.SelectActions(layerConfiguraties, null, {});
		expect(selectActions.hoverStyle(feature1)).toEqual(selectieStyle1(feature1));
		expect(selectActions.hoverStyle(feature2)).toEqual(selectieStyle2(feature2));
	});

	it('kan de selectie en hover stijl niet bepalen als die niet gedefinieerd is', function() {
		var feature = new ol.Feature();
		
		var layerConfiguraties = [{
			layer: new ol.layer.Vector({
				source: new ol.source.Vector({
					features: [feature]
				})
			})
		}];
		
		var selectActions = new acd.ol.action.SelectActions(layerConfiguraties);
		expect(selectActions.style(feature)).toBeUndefined();
		expect(selectActions.hoverStyle(feature)).toBeUndefined();
	});

	it('kan de selectie en hover stijl niet bepalen als de layer niet gekend is', function() {
		var feature = new ol.Feature();
		var selectActions = new acd.ol.action.SelectActions([]);
		expect(selectActions.style(feature)).toBeNull();
		expect(selectActions.hoverStyle(feature)).toBeNull();
	});
	
	it('kan features markeren en demarkeren', function() {
		var feature1 = new ol.Feature();
		var feature2 = new ol.Feature();
		var feature3 = new ol.Feature();
		feature1.setId(1);
		feature2.setId(2);
		feature3.setId(3);
		
		var selectActions = new acd.ol.action.SelectActions([{
			layer: new ol.layer.Vector({
				source: new ol.source.Vector({
					features: [feature1, feature2]
				})
			})
		}, {
			layer: new ol.layer.Vector({
				source: new ol.source.Vector({
					features: [feature3]
				})
			})
		}]);
		
		selectActions.markFeatureWithId(1);
		expect(selectActions.isMarked(feature1)).toBe(true);
		expect(selectActions.markInteraction.getFeatures().getLength()).toBe(1);
		selectActions.markFeatureWithId(2);
		expect(selectActions.isMarked(feature2)).toBe(true);
		expect(selectActions.markInteraction.getFeatures().getLength()).toBe(2);
		selectActions.markFeatureWithId(3);
		expect(selectActions.isMarked(feature3)).toBe(true);
		expect(selectActions.markInteraction.getFeatures().getLength()).toBe(3);
		selectActions.demarkAllFeatures();
		expect(selectActions.markInteraction.getFeatures().getLength()).toBe(0);
		expect(selectActions.isMarked(feature1)).toBe(false);
		expect(selectActions.isMarked(feature2)).toBe(false);
	});

	it('kan clusters markeren en demarkeren', function() {
		var feature1 = new ol.Feature();
		var feature2 = new ol.Feature();
		var feature3 = new ol.Feature();
		var feature4 = new ol.Feature();
		feature1.setId(1);
		feature2.setId(2);
		feature3.setId(3);
		feature4.setId(4);
		var features = [feature1, feature2, feature3];
		var cluster1 = new ol.Feature();
		var cluster2 = new ol.Feature();
		var cluster3 = new ol.Feature();
		cluster1.set('features', [feature1, feature2]);
		cluster2.set('features', [feature3]);
		cluster3.set('features', [feature4]);
		var layer1 = new ol.layer.Vector({
			source: new ol.source.Vector({
				features: [cluster1, cluster2]
			})
		});
		var layer2 = new ol.layer.Vector({
			source: new ol.source.Vector({
				features: [cluster3]
			})
		});
		var selectActions = new acd.ol.action.SelectActions([{
			layer: layer1
		}, {
			layer: layer2
		}]);
		
		selectActions.markFeatureWithId(1);
		expect(selectActions.isMarked(cluster1)).toBe(true);
		expect(selectActions.isMarked(cluster2)).toBe(false);
		expect(selectActions.isMarked(cluster3)).toBe(false);
		expect(selectActions.markInteraction.getFeatures().getLength()).toBe(1);
		selectActions.markFeatureWithId(2);
		expect(selectActions.isMarked(cluster1)).toBe(true);
		expect(selectActions.isMarked(cluster2)).toBe(false);
		expect(selectActions.isMarked(cluster3)).toBe(false);
		selectActions.markFeatureWithId(4);
		expect(selectActions.isMarked(cluster1)).toBe(true);
		expect(selectActions.isMarked(cluster2)).toBe(false);
		expect(selectActions.isMarked(cluster3)).toBe(true);
		selectActions.demarkAllFeatures();
		expect(selectActions.isMarked(cluster1)).toBe(false);
		expect(selectActions.isMarked(cluster2)).toBe(false);
		expect(selectActions.isMarked(cluster3)).toBe(false);
	});
});