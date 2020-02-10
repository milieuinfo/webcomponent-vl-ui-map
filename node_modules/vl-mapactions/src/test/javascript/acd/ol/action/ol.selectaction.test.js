describe('select action', function() {
	it('kan de selectie en hover stijl definiëren', function() {
		var selectieStyle = new ol.style.Style();
		var hoverStyle = new ol.style.Style();
		
		var selectAction = new acd.ol.action.SelectAction({}, null, {
			style: selectieStyle,
			hoverStyle: hoverStyle
		});
		
		expect(selectAction.style).toBe(selectieStyle);
		expect(selectAction.hoverStyle).toBe(hoverStyle);
	});
	
	it('zal terugvallen op de selectie stijl indien er geen hover stijl gedefinieerd is', function() {
		var style = new ol.style.Style();
		var selectAction = new acd.ol.action.SelectAction({}, null, {
			style: style
		});
		
		expect(selectAction.hoverStyle).toBe(style);
	});

	it('kan de selectie en hover stijl niet bepalen als die niet gedefinieerd is', function() {
		var selectAction = new acd.ol.action.SelectAction({});
		expect(selectAction.style).toBeNull();
		expect(selectAction.hoverStyle).toBeNull();
	});
	
	it('kan features markeren en demarkeren', function() {
		var feature1 = new ol.Feature();
		var feature2 = new ol.Feature();
		feature1.setId(1);
		feature2.setId(2);
		
		var selectAction = new acd.ol.action.SelectAction({
			getSource: function() {
				return {
					getFeatureById: function(id) {
						return id == 1 ? feature1: feature2;
					}
				}
			}
		});
		
		selectAction.markFeatureWithId(1);
		expect(selectAction.isMarked(feature1)).toBe(true);
		expect(selectAction.markInteraction.getFeatures().getLength()).toBe(1);
		selectAction.markFeatureWithId(2);
		expect(selectAction.isMarked(feature2)).toBe(true);
		expect(selectAction.markInteraction.getFeatures().getLength()).toBe(2);
		selectAction.demarkAllFeatures();
		expect(selectAction.markInteraction.getFeatures().getLength()).toBe(0);
		expect(selectAction.isMarked(feature1)).toBe(false);
		expect(selectAction.isMarked(feature2)).toBe(false);
	});

	it('kan clusters markeren en demarkeren', function() {
		var feature1 = new ol.Feature();
		feature1.setId(1);
		var feature2 = new ol.Feature();
		feature2.setId(2);
		var feature3 = new ol.Feature();
		feature3.setId(3);
		var cluster1 = new ol.Feature();
		var cluster2 = new ol.Feature();
		cluster1.set('features', [feature1, feature2]);
		cluster2.set('features', [feature3]);
		var layer = new ol.layer.Vector({
			source: new ol.source.Vector({
				features: [cluster1, cluster2]
			})
		});
		var selectAction = new acd.ol.action.SelectAction(layer);
		
		selectAction.markFeatureWithId(1);
		expect(selectAction.isMarked(cluster1)).toBe(true);
		expect(selectAction.isMarked(cluster2)).toBe(false);
		expect(selectAction.markInteraction.getFeatures().getLength()).toBe(1);
		selectAction.markFeatureWithId(2);
		expect(selectAction.isMarked(cluster1)).toBe(true);
		expect(selectAction.isMarked(cluster2)).toBe(false);
		selectAction.demarkAllFeatures();
		expect(selectAction.isMarked(cluster1)).toBe(false);
		expect(selectAction.isMarked(cluster2)).toBe(false);
	});
	
	it('zal de onselect functie oproepen als een feature geselecteerd wordt', function() {
		var layer = {
			id: 'layer1',
			getSource: function() {
				return {
					getFeatures: function() {
						return [feature];
					}
				}
			}
		};
		var onSelect = jasmine.createSpy('onSelect');
		var feature = new ol.Feature({id: 1});
		var selectAction = new acd.ol.action.SelectAction(layer, onSelect);
		
		selectAction.selectInteraction.getFeatures().push(feature);
		var event = {type: 'select'};
		selectAction.selectInteraction.dispatchEvent(event);
		
		expect(onSelect.calls.count()).toBe(1);
		var argsForCall = onSelect.calls.argsFor(0);
		expect(argsForCall.length).toBe(3);
		expect(argsForCall[0]).toBe(feature);
		expect(argsForCall[1].type).toBe('select');
		expect(argsForCall[2]).toBe(layer);
	});
	
	it('als er meer dan 1 feature geselecteerd is, zal er bij elke klik afwisselend de volgende geselecteerd worden', function() {
		var onSelect = jasmine.createSpy('onSelect');
		var feature = new ol.Feature({id: 1});
		var feature2 = new ol.Feature({id: 2});
		var feature3 = new ol.Feature({id: 3});
		var selectAction = new acd.ol.action.SelectAction([{
    	   id: 'layer1',
    	   getSource: function() {
    		   return {
    			   getFeatures: function() {
    				   return [feature, feature2, feature3];
    			   }
    		   }
    	   }
        }], onSelect);
		
		selectAction.selectInteraction.getFeatures().push(feature);
		selectAction.selectInteraction.getFeatures().push(feature2);
		selectAction.selectInteraction.getFeatures().push(feature3);

		selectAction.selectInteraction.dispatchEvent({type: 'select'});
		expect(onSelect.calls.argsFor(0)[0]).toBe(feature);
		selectAction.selectInteraction.dispatchEvent({type: 'select'});
		expect(onSelect.calls.argsFor(1)[0]).toBe(feature2);
		selectAction.selectInteraction.dispatchEvent({type: 'select'});
		expect(onSelect.calls.argsFor(2)[0]).toBe(feature3);
		selectAction.selectInteraction.dispatchEvent({type: 'select'});
		expect(onSelect.calls.argsFor(0)[0]).toBe(feature);
	});

	it('als er programmatorisch een feature geselecteerd wordt zal daarna bij een klik ook de volgende genomen worden', function() {
		var onSelect = jasmine.createSpy('onSelect');
		var feature = new ol.Feature({id: 1});
		var feature2 = new ol.Feature({id: 2});
		var feature3 = new ol.Feature({id: 3});
		var selectAction = new acd.ol.action.SelectAction([{
    	   id: 'layer1',
    	   getSource: function() {
    		   return {
    			   getFeatures: function() {
    				   return [feature, feature2, feature3];
				   },
				   getFeatureById: function(id) {
					   switch (id) {
						   case 1:
								return feature;
							case 2:
								return feature2;
							case 3:
								return feature3;
					   }
				   }
    		   }
    	   }
		}], onSelect);
		
		selectAction.selectFeature(feature);
		selectAction.clearFeatures(feature);

		selectAction.selectInteraction.getFeatures().push(feature2);
		selectAction.selectInteraction.dispatchEvent({type: 'select'});
		selectAction.selectInteraction.getFeatures().push(feature3);
		selectAction.selectInteraction.dispatchEvent({type: 'select'});
		
		expect(onSelect.calls.argsFor(0)[0].get("id")).toBe(1);
		expect(onSelect.calls.argsFor(1)[0].get("id")).toBe(2);
		expect(onSelect.calls.argsFor(2)[0].get("id")).toBe(3);
	});

	it('als er gevraagd wordt om de laatst geselecteerde feature te vergeten wordt daarna bij een klik op meerdere terug de 1e genomen', function() {
		var onSelect = jasmine.createSpy('onSelect');
		var feature = new ol.Feature();
		var feature2 = new ol.Feature();
		var feature3 = new ol.Feature();
		feature.setId(1);
		feature2.setId(2);
		feature3.setId(3);
		var selectAction = new acd.ol.action.SelectAction({
    	   id: 'layer1',
    	   getSource: function() {
    		   return {
    			   getFeatures: function() {
    				   return [feature, feature2, feature3];
				   },
				   getFeatureById: function(id) {
					   switch (id) {
						   case 1:
							   return feature;
							case 2:
								return feature2;
							case 3:
								return feature3;
					   }
				   }
    		   }
    	   }
		}, onSelect);
		
		selectAction.selectInteraction.getFeatures().push(feature);
		selectAction.selectInteraction.getFeatures().push(feature2);
		selectAction.selectInteraction.getFeatures().push(feature3);

		selectAction.selectInteraction.dispatchEvent({type: 'select'});
		expect(onSelect.calls.argsFor(0)[0]).toBe(feature);
		selectAction.selectInteraction.dispatchEvent({type: 'select'});
		expect(onSelect.calls.argsFor(1)[0]).toBe(feature2);
		selectAction.vergeetLaatstGeselecteerdeFeature();
		selectAction.selectInteraction.dispatchEvent({type: 'select'});
		expect(onSelect.calls.argsFor(2)[0]).toBe(feature);
	});
	
	it('zal de onselect functie oproepen met lege argumenten als er een select wordt gedaan niet op een feature', function() {
		var onSelect = jasmine.createSpy('onSelect');
		var selectAction = new acd.ol.action.SelectAction([{}], onSelect);
		selectAction.map = {
			on: jasmine.createSpy(),
			un: jasmine.createSpy()
		};
		selectAction.activate();
		
		selectAction.selectInteraction.dispatchEvent('select');
		
		expect(onSelect).toHaveBeenCalledWith();
	});
	
	it('zal bij een deactivate de selectie features clearen', function() {
		var selectAction = new acd.ol.action.SelectAction([{}]);
		selectAction.map = {
			on: jasmine.createSpy(),
			un: jasmine.createSpy()
		};
		var feature = new ol.Feature({id: 1});
		
		selectAction.selectInteraction.getFeatures().push(feature);
		selectAction.deactivate();
		
		expect(selectAction.selectInteraction.getFeatures().getLength()).toBe(0);
	});
	
	it('zal bij het filteren van de selectie eerst de selectie clearen, zodat dezelfde feature opnieuw kan gekozen worden', function() {
		var feature = new ol.Feature();
		feature.setId(1);
		var layer = new ol.layer.Vector({source: new ol.source.Vector({features: [feature]})});
		var selectAction = new acd.ol.action.SelectAction(layer);
		selectAction.selectInteraction.getFeatures().push(feature);
		
		var filter = selectAction.selectInteractionFilter(feature);
		
		expect(filter).toBe(true);
		expect(selectAction.selectInteraction.getFeatures().getLength()).toBe(0);
	});
	
	it('zal bij het filteren van de hover de huidige selectie niet in rekening brengen', function() {
		var feature = new ol.Feature();
		feature.setId(1);
		var layer = new ol.layer.Vector({source: new ol.source.Vector({features: [feature]})});
		var selectAction = new acd.ol.action.SelectAction(layer);
		selectAction.selectInteraction.getFeatures().push(feature);
		
		var filter = selectAction.hoverInteractionFilter(feature, layer);
		
		expect(filter).toBe(false);
	});
	
	it('kan gebruik maken van een feature filter', function() {
		var feature = new ol.Feature();
		feature.setId(1);
		var featureWithId2 = new ol.Feature();
		feature.setId(2);
		
		var filter = function(feature) {
			return feature.getId() == 1;
		};
		
		var selectAction = new acd.ol.action.SelectAction([new ol.layer.Vector({source: new ol.source.Vector({features: [feature, featureWithId2]})})], null, {
			filter: filter
		});
		
		selectAction.selectInteraction.getFeatures().push(featureWithId2);
		var filter = selectAction.selectInteractionFilter(feature);
		
		expect(filter).toBe(false);
	});
	
	it('zal bij activatie de functie activeren om na het zoomen de selectie bij clustering goed te zetten', function() {
		var selectAction = new acd.ol.action.SelectAction([{}], null, {
			cluster: true
		});
		var on = jasmine.createSpy();
		selectAction.map = {
			on: on
		};
		selectAction.activate();
		expect(on).toHaveBeenCalledWith('moveend', selectAction.fixClusterBehavior);
	});
	
	it('zal bij deactivate de functie deactiveren om na het zoomen de selectie bij clustering goed te zetten', function() {
		var selectAction = new acd.ol.action.SelectAction([{}], null, {
			cluster: true
		});
		var un = jasmine.createSpy();
		selectAction.map = {
			un: un
		};
		selectAction.deactivate();
		expect(un).toHaveBeenCalledWith('moveend', selectAction.fixClusterBehavior);
	});

	it('zal na het zoomen de geselecteerde feature verplaatsen naar de markeer selecteer interactie om visuele problemen met geselecteerde feature en cluster te voorkomen', function() {
		var feature = new ol.Feature();
		feature.setId(1);
		var layer = {
			id: 'layer1',
			getSource: function() {
				return {
					getFeatures: function() {
						return [feature];
					},
					getFeatureById: function(id) {
						return (id == 1 ? feature : null);
					}
				}
			}
		};
		var selectAction = new acd.ol.action.SelectAction(layer, null, {
			cluster: true
		});
		selectAction.map = {
			on: jasmine.createSpy(),
			un: jasmine.createSpy()
		};
		selectAction.activate();
		
		selectAction.selectInteraction.getFeatures().push(feature);
		expect(selectAction.selectInteraction.getFeatures().getLength()).toBe(1);
		expect(selectAction.markInteraction.getFeatures().getLength()).toBe(0);
		expect(selectAction.hoverInteraction.getFeatures().getLength()).toBe(0);
		var event = {type: 'select'};
		selectAction.selectInteraction.dispatchEvent(event);
		expect(selectAction.selectInteraction.getFeatures().getLength()).toBe(0);
		expect(selectAction.markInteraction.getFeatures().getLength()).toBe(1);
		expect(selectAction.hoverInteraction.getFeatures().getLength()).toBe(0);
		selectAction.fixClusterBehavior();
		expect(selectAction.selectInteraction.getFeatures().getLength()).toBe(0);
		expect(selectAction.markInteraction.getFeatures().getLength()).toBe(1);
		expect(selectAction.hoverInteraction.getFeatures().getLength()).toBe(0);
	});
});