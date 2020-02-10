describe('custom map', function() {
	var map;
	
	var layers = [new ol.layer.Tile({
		type: 'base',
		visible: true
	}), new ol.layer.Tile({
		type: 'base',
		visible: false
	})];
	
	var overviewMapLayers = [new ol.layer.Tile({
		type: 'base',
		visible: false
	}), new ol.layer.Tile({
		type: 'base',
		visible: true
	})];
	
	var overlayLayer = new ol.layer.Vector({source: new ol.source.Vector()});
	
	function merge(a, b) {
		for (var element in b) {
			a[element] = b[element];
		}
	}
	
	function createMap(options) {
		var defaultOptions = {
			actions: [],
			customLayers: {
				baseLayerGroup: new ol.layer.Group({
					layers: layers
				}),
				overviewMapLayers: overviewMapLayers,
				overlayGroup: new ol.layer.Group({
					layers: [overlayLayer]
				})
			},
			projection: new ol.proj.Projection({
				code: 'EPSG:31370',
				extent: [9928.000000, 66928.000000, 272072.000000, 329072.000000]
			})
		};
		
		if (options) {
			merge(defaultOptions, options);
		}
		
		var map = new acd.ol.CustomMap(defaultOptions);
		map.addControl = jasmine.createSpy('added control');
		map.getSize = function() {
			return [1200, 800];
		};
		return map;
	}
	
	function createMapZonderLayers() {
		var defaultOptions = {
			actions: [],
			customLayers: {
				baseLayerGroup: new ol.layer.Group({
					layers: []
				}),
				overviewMapLayers: [],
				overlayGroup: new ol.layer.Group({
					layers: []
				})
			},
			projection: new ol.proj.Projection({
				code: 'EPSG:31370',
				extent: [9928.000000, 66928.000000, 272072.000000, 329072.000000]
			})
		};
		
		var map = new acd.ol.CustomMap(defaultOptions);
		map.addControl = jasmine.createSpy('added control');
		return map;
	}
	
	function createBaseLayer(title, visibility) {
		return new ol.layer.Tile({
			title: title,
	        type: 'base',
	        visible: visibility
		});
	}
	
	function createVisibleBaseLayer(title) {
		return createBaseLayer(title, true);
		
	}
	function createInvisibleBaseLayer(title) {
		return createBaseLayer(title, false);
	}

	beforeEach(function() {
		map = createMap();
	});
	
	it('kan de base layers teruggeven', function() {
		expect(map.getBaseLayers().length).toBe(2);
		expect(map.getBaseLayers()).toEqual(layers);
	});

	it('kan de overlay layers teruggeven', function() {
		expect(map.getOverlayLayers().length).toBe(1);
	});
	
	it('kan zoomen naar een puntgeometrie, zodat er sterk is ingezoomd (hoge zoom waarde)', function() {
		map.initializeView();
		expect(map.getView().getZoom()).toBe(2);
		
		map.zoomToGeometry({
			type: 'Point',
			coordinates: [100000, 100000]
		});
		
		expect(map.getView().getZoom()).toBe(16);
	});
	
	it('kan zoomen naar een geometrie tot maximaal aan het gedefinieerde zoom niveau via de map declaratie optie of de methode argumenten', function() {
		var max = 10;

		map.zoomToGeometry({type: 'Point', coordinates: [100000, 100000]});
		expect(map.getView().getZoom()).toBe(16);
		
		map.zoomToGeometry({type: 'Point', coordinates: [100000, 100000]}, 10);
		expect(map.getView().getZoom()).toBe(10);
		
		map = createMap({maxZoomViewToExtent: 5});
		map.zoomToGeometry({type: 'Point', coordinates: [100000, 100000]}, 10);
		expect(map.getView().getZoom()).toBe(10);
		
		map = createMap({maxZoomViewToExtent: 5});
		map.zoomToGeometry({type: 'Point', coordinates: [100000, 100000]});
		expect(map.getView().getZoom()).toBe(5);
	});

	it('kan met de show info functie een popover tonen op de kaart', function() {
		map.showInfo('Test', [0, 0]);
		var overlays = map.getOverlays();
		var array = overlays.getArray();
		
		expect(overlays.getLength()).toBe(1);
		expect(array.length).toBe(1);

		var overlay = array[0];
		var element = '<div class="info-tooltip"><span class="content">Test</span><div class="arrow"></div><div class="close"></div></div>';
		expect(overlay.getElement().outerHTML).toBe(element);
	});
	
	it('als de overview map control gekend is zal die toegevoegd worden aan de map bij het initializeren', function() {
		map = createMap();
		
		map.initializeView();
		
		expect(map.addControl).toHaveBeenCalled();
	});
	
	it('als de overview map control niet gekend is zal die ook niet toegevoegd worden aan de map bij het initializeren', function() {
		map = createMap();
		map.overviewMapControl = undefined;
		
		map.initializeView();
		
		expect(map.addControl).not.toHaveBeenCalled();
	});
	
	
 
	it('Als er geen overviewMapLayers zijn, zal er geen overviewMapControl aangemaakt worden.', function() {
		var map = createMapZonderLayers();
		map.initializeView();
		expect(map.overviewMapControl).toBeUndefined();
	});

 
	it('Wanneer de eerse overviewMapLayer wordt toegevoegd, wordt een overviewMapControl aangemaakt.', function() {
		var map = createMapZonderLayers();
		map.initializeView();
		var baseLayer = createVisibleBaseLayer('layer');
		var overviewMapLayer = createInvisibleBaseLayer('overview map layer')

		expect(map.overviewMapControl).toBeUndefined();
		map.addBaseLayerAndOverlayMapLayer(baseLayer, overviewMapLayer);
		expect(map.overviewMapControl).toBeDefined();
		expect(map.getBaseLayers().length).toBe(1);
		expect(map.getBaseLayers()[0]).toEqual(baseLayer)
		expect(map.overviewMapControl.getOverviewMap().getLayers().getArray().length).toBe(1);
		expect(map.overviewMapControl.getOverviewMap().getLayers().getArray()[0]).toEqual(overviewMapLayer);
	});
 

	it('Er kunnen meerdere base layers en overlayMapLayers toegevoegd worden aan de map ', function() {
		map = createMapZonderLayers();
		map.initializeView();

		var baseLayer = createVisibleBaseLayer('layer');
		var overviewMapLayer = createInvisibleBaseLayer('overview map layer')

		expect(map.overviewMapControl).toBeUndefined();
		map.addBaseLayerAndOverlayMapLayer(baseLayer, overviewMapLayer);
		map.addBaseLayerAndOverlayMapLayer(baseLayer, overviewMapLayer);

		expect(map.getBaseLayers().length).toBe(2);
		expect(map.getBaseLayers()[0]).toEqual(baseLayer)
		expect(map.getBaseLayers()[1]).toEqual(baseLayer)
		expect(map.overviewMapControl.getOverviewMap().getLayers().getArray().length).toBe(2);
		expect(map.overviewMapControl.getOverviewMap().getLayers().getArray()[0]).toEqual(overviewMapLayer);
		expect(map.overviewMapControl.getOverviewMap().getLayers().getArray()[1]).toEqual(overviewMapLayer);
	});


	it('Enkel de eerste toegevoegde baselayer is visible en enkel de 2e toegevoegde overlaymaplayer is visible', function() {
		map = createMapZonderLayers();
		map.initializeView();

		for(var layerNr = 0; layerNr < 3; layerNr++) {
			map.addBaseLayerAndOverlayMapLayer(createInvisibleBaseLayer('layer ' + layerNr), 
					                           createInvisibleBaseLayer('overview map layer ' + layerNr));
		}

		expect(map.getBaseLayers()[0].getVisible()).toBe(true);
		expect(map.getBaseLayers()[1].getVisible()).toBe(false);
		expect(map.getBaseLayers()[2].getVisible()).toBe(false);
	
		expect(map.overviewMapControl.getOverviewMap().getLayers().getArray()[0].getVisible()).toBe(false);
		expect(map.overviewMapControl.getOverviewMap().getLayers().getArray()[1].getVisible()).toBe(true);
		expect(map.overviewMapControl.getOverviewMap().getLayers().getArray()[2].getVisible()).toBe(false);
	});

	it('Na een klik is de volgende toegevoegde baselayer visible', function() {
		map = createMapZonderLayers();
		map.initializeView();
		
		for(var layerNr = 0; layerNr < 3; layerNr++) {
			map.addBaseLayerAndOverlayMapLayer(createInvisibleBaseLayer('layer ' + layerNr), 
					                           createInvisibleBaseLayer('overview map layer ' + layerNr));
		}
		
		var overlayElement = map.overviewMapControl.element.getElementsByClassName('ol-overlay-container')[0];
		var overviewMap = map.overviewMapControl.getOverviewMap();

		spyOn(map, 'render');
		spyOn(overviewMap, 'render');
		
		overlayElement.click();
		expect(map.getBaseLayers()[0].getVisible()).toBe(false);
		expect(map.getBaseLayers()[1].getVisible()).toBe(true);
		expect(map.getBaseLayers()[2].getVisible()).toBe(false);
		expect(map.overviewMapControl.getOverviewMap().getLayers().getArray()[0].getVisible()).toBe(false);
		expect(map.overviewMapControl.getOverviewMap().getLayers().getArray()[1].getVisible()).toBe(false);
		expect(map.overviewMapControl.getOverviewMap().getLayers().getArray()[2].getVisible()).toBe(true);
		expect(map.render).toHaveBeenCalled();
		expect(overviewMap.render).toHaveBeenCalled();

		map.render.calls.reset();
		overviewMap.render.calls.reset();
		overlayElement.click();
		expect(map.getBaseLayers()[0].getVisible()).toBe(false);
		expect(map.getBaseLayers()[1].getVisible()).toBe(false);
		expect(map.getBaseLayers()[2].getVisible()).toBe(true);
		expect(map.overviewMapControl.getOverviewMap().getLayers().getArray()[0].getVisible()).toBe(true);
		expect(map.overviewMapControl.getOverviewMap().getLayers().getArray()[1].getVisible()).toBe(false);
		expect(map.overviewMapControl.getOverviewMap().getLayers().getArray()[2].getVisible()).toBe(false);
		expect(map.render).toHaveBeenCalled();
		expect(overviewMap.render).toHaveBeenCalled();

		map.render.calls.reset();
		overviewMap.render.calls.reset();
		overlayElement.click();
		expect(map.getBaseLayers()[0].getVisible()).toBe(true);
		expect(map.getBaseLayers()[1].getVisible()).toBe(false);
		expect(map.getBaseLayers()[2].getVisible()).toBe(false);
		expect(map.overviewMapControl.getOverviewMap().getLayers().getArray()[0].getVisible()).toBe(false);
		expect(map.overviewMapControl.getOverviewMap().getLayers().getArray()[1].getVisible()).toBe(true);
		expect(map.overviewMapControl.getOverviewMap().getLayers().getArray()[2].getVisible()).toBe(false);
		expect(map.render).toHaveBeenCalled();
		expect(overviewMap.render).toHaveBeenCalled();
	});

});