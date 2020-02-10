describe('custom map with actions', function() {
	
	function createCustomMapWithActions() {
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
		var map = new acd.ol.CustomMap({
			actions: [],
			customLayers: {
				baseLayerGroup: new ol.layer.Group({
					layers: layers
				}),
				overviewMapLayers: overviewMapLayers,
				overlayGroup: new ol.layer.Group({
					layers: [new ol.layer.Vector({source: new ol.source.Vector()})]
				})
			},
			projection: new ol.proj.Projection({
				code: 'EPSG:31370',
				extent: [9928.000000, 66928.000000, 272072.000000, 329072.000000]
			})
		});
		map.addControl = jasmine.createSpy('added control');
		map.getSize = function() {
			return [1200, 800];
		};
		return map;
	}
	
	it('bij het initialiseren van de view, wordt ook de over view map control toegevoegd', function() {
		var map = createCustomMapWithActions();
		expect(map.getView().getZoom()).toBeUndefined();
		
		map.initializeView();
		
		expect(map.addControl).toHaveBeenCalledWith(map.overviewMapControl);
	});
	
	it('kan met een view geïnitialiseerd worden met als default zoom niveau 2', function() {
		var map = createCustomMapWithActions();
		expect(map.getView().getZoom()).toBeUndefined();
		
		map.initializeView();
		
		expect(map.getView().getZoom()).toBe(2);
	});
	
	it('kan met een view geïnitialiseerd worden op een specifieke bounding box, zodat er sterk is ingezoomd (hoge zoom waarde)', function() {
		var map = createCustomMapWithActions();
		
		map.initializeView([9928.000000, 66928.000000, 9930.000000, 66930.000000]);
		
		expect(map.getView().getZoom()).toBe(16);
	});
	
	it('kan met een view geïnitialiseerd worden op een kleine bounding box en een max zoom niveau, zodat het max niveau bereikt is', function() {
		var map = createCustomMapWithActions();
		
		map.initializeView([9928.000000, 66928.000000, 9930.000000, 66930.000000], 4);
		
		expect(map.getView().getZoom()).toBe(4);
	});
	
	it('als de baselayer getoggled wordt van een map, zal dit ook gebeuren bij de overview map', function() {
		var map = createCustomMapWithActions();
		map.initializeView();
		expect(map.overviewMapLayers[0].getVisible()).toBe(false);
		expect(map.overviewMapLayers[1].getVisible()).toBe(true);
		expect(map.baseLayers[0].getVisible()).toBe(true);
		expect(map.baseLayers[1].getVisible()).toBe(false);
		
		map.custom.toggleBaseLayer();
		
		expect(map.overviewMapLayers[0].getVisible()).toBe(true);
		expect(map.overviewMapLayers[1].getVisible()).toBe(false);
		expect(map.baseLayers[0].getVisible()).toBe(false);
		expect(map.baseLayers[1].getVisible()).toBe(true);
		
		map.custom.toggleBaseLayer();
		
		expect(map.overviewMapLayers[0].getVisible()).toBe(false);
		expect(map.overviewMapLayers[1].getVisible()).toBe(true);
		expect(map.baseLayers[0].getVisible()).toBe(true);
		expect(map.baseLayers[1].getVisible()).toBe(false);
	});	

});