import { VlElement } from '../../../../../../../node_modules/vl-ui-core/vl-core.js';

/**
 * VlMap
 * @class
 * @classdesc De kaart component. <a href="demo/index.html">Demo</a>.
 *
 * @extends VlElement
 * 
 * @property {boolean} disable-escape-key - Attribuut wordt gebruikt om ervoor te zorgen dat de escape toets niet gebruikt kan worden.
 */
class VlMap extends VlElement(HTMLElement) {
    constructor() {
        super(`
            <style>
                @import '../style.css';

                :host {
                    display: block;
                    position: relative;
                }
            </style>

            <div id="map"></div>
        `);

        this.__setMapSize();
        this.__updateOverviewMapSizeOnLoad();
    }
    
    /**
     * Geeft de OpenLayers map terug.
     * 
     * @Return {acd.ol.CustomMap}
     */
    get map() {
        return this._map;
    }

    get disableEscapeKey() {
        return this.getAttribute('disable-escape-key') != undefined;
    }

    get _geoJSON() {
        if (!this.__geoJSON) {
            this.__geoJSON = new ol.format.GeoJSON();
        }
        return this.__geoJSON;
    }

    get _mapElement() {
        return this._shadow.querySelector('#map');
    }

    get _projection() {
        return new ol.proj.Projection({
            code: 'EPSG:31370',
            extent: this._extent
        });
    }

    get _extent() {
        return [9928, 66928, 272072, 329072];
    }

    connectedCallback() {
        this.__initializeCoordinateSystem();

        this._map = new acd.ol.CustomMap({
            actions: [],
            disableEscapeKey: this.disableEscapeKey,
            customLayers: {
                baseLayerGroup: this.__createLayerGroup('Basis lagen', []),
                overviewMapLayers: [],
                overlayGroup: this.__createLayerGroup('Lagen', [])
            },
            projection: this._projection,
            target: this._mapElement
        });

        this._map.initializeView();
    }

    /**
     * Voegt een kaartactie toe aan de kaart.
     * 
     * @param {ol.interaction} action 
     */
    addAction(action) {
        this._map.addAction(action);
    }

    /**
     * Gaat de breedte en hoogte van de kaart bepalen aan de hand van inline stijl zodat de map aangemaakt wordt met de correcte afmetingen.
     */
    __setMapSize() {
        const height = getComputedStyle(this).getPropertyValue('--vl-map-height') || '500px';
        this.shadowRoot.querySelector('#map').style.height = height;
        this.shadowRoot.querySelector('#map').style.width = '100%';
    }

    __updateOverviewMapSize() {
        if (this._map.overviewMapControl) {
            this._map.overviewMapControl.getOverviewMap().updateSize();
        }
    }

    __updateOverviewMapSizeOnLoad() {
        window.addEventListener('load', this.__updateOverviewMapSize.bind(this), { once: true });
    }

    __createLayerGroup(title, layers) {
        return new ol.layer.Group({
            title: title,
            layers: layers
        });
    }

    __initializeCoordinateSystem() {
        proj4.defs('EPSG:31370', '+proj=lcc +lat_1=51.16666723333333 +lat_2=49.8333339 +lat_0=90 +lon_0=4.367486666666666 +x_0=150000.013 +y_0=5400088.438 +ellps=intl +towgs84=-106.869,52.2978,-103.724,0.3366,-0.457,1.8422,-1.2747 +units=m +no_defs');
    }
}

/**
 * VlMapLayer
 * @class
 * @classdesc De kaart laag component. <a href="demo/vl-map-layer.html">Demo</a>.
 *
 * @property {string} name - Attribuut bepaalt de kaartlaag naam.
 * @property {boolean} auto-extent - Attribuut geeft aan of er automatisch gezoomt wordt op de kaartlaag zodat al de features zichtbaar zijn.
 * @property {boolean} cluster - Attribuut geeft aan of de features geclusterd moeten worden of niet.
 * @property {number} cluster-distance - Attribuut geeft aan vanaf welke afstand tussen features er geclusterd mag worden.
 * @property {string[]} features - Attribuut die de kaartlaag bevat.
 * 
 * @extends VlElement
 */
class VlMapLayer extends VlElement(HTMLElement) {
    static get _observedAttributes() {
        return ['auto-extent', 'features'];
    } 

    constructor() {
        super();
        VlMapLayer._counter = 0;
        this.__geoJSON = new ol.format.GeoJSON();
        this.__counter = ++VlMapLayer._counter;
    }

    connectedCallback() {
        this._layer = this.__createLayer(this._name, this.features);
        this._configureMap();
    }

    static get _counter() {
        return this.__counter;
    }

    static set _counter(counter) {
        this.__counter = counter;
    }

    /**
     * Geeft de OpenLayers kaartlaag.
     * 
     * @returns {ol.layer.Layer}
     */
    get layer() {
        return this._layer;
    }

    /**
     * Geeft de OpenLayers kaartlaag source.
     * 
     * @returns {ol.source}
     */
    get source() {
        return this._source;
    }

    /**
     * Geeft de OpenLayers features collectie van de kaartlaag terug.
     * 
     * @returns {object}
     */
    get features() {
        const features = this.getAttribute('features');
        return features ? this.__geoJSON.readFeatures(features) : [];
    }

    /**
     * Zet de OpenLayers features collectie op de kaartlaag.
     * 
     * @param {object} features
     */
    set features(features) {
        this.setAttribute('features', JSON.stringify(features));
    }

    /**
     * Geeft de OpenLayers kaartlaag stijl.
     * 
     * @returns {ol.style}
     */
    get style() {
        if (this._layer) {
            return this._layer.getStyle();
        }
    }
    
    /**
     * Zet de OpenLayers kaartlaag stijl.
     * 
     * @param {ol.style} style
     */
    set style(style) {
        this._style = style;
        this._layer.setStyle(style);
    }

    get _name() {
        return this.getAttribute('name') || 'kaartlaag';
    }

    get _autoExtent() {
        return this.getAttribute('auto-extent') != undefined;
    }

    get _cluster() {
        return this.getAttribute('cluster') != undefined;
    }

    get _clusterDistance() {
        return this.getAttribute('cluster-distance');
    }

    get _map() {
        if (this.parentNode) {
            return this.parentNode.map;
        }
    }

    /**
     * Verwijdert de stijl van al de kaartlaag features.
     */
    verwijderFeatureStijlen() {
        if (this._source && this._source.getFeatures()) {
            this._source.getFeatures().forEach((feature) => {
                feature.setStyle(null);
            });
        }
    }

    /**
     * Rendert de kaart opnieuw.
     */
    rerender() {
        if (this._map) {
            this._map.render();
        }
    }

    /**
     * Geeft de feature terug op basis van het id attribuut.
     * 
     * @param {number} id
     */
    getFeature(id) {
        if (this._source && this._source.getFeatures()) {
            return this._source.getFeatures().filter((feature) => {
                return feature.getId() === id;
            })[0];
        }
    }

    /**
     * Geeft de cluster terug op basis van het id attribuut.
     * 
     * @param {number} id
     */
    getCluster(id) {
        if (this._layer) {
            return this._layer.getSource().getFeatures().filter((cluster) => {
                const features = cluster.get('features');
                if (features) {
                    return features.some((feature) => {
                        return feature.getId() === id;
                    });
                } else {
                    return false;
                }
            })[0];
        }
    }

    _auto_extentChangedCallback(oldValue, newValue) {
        this.__zoomToExtent();
    }

    _featuresChangedCallback(oldValue, newValue) {
        if (newValue && this._layer) {
            this._source.clear();
            this._source.addFeatures(this.features);
            this.__zoomToExtent();
            this.rerender();
        }
    }

    __zoomToExtent() {
        if (this._map && this._autoExtent) {
            this._map.zoomToExtent(this.__getBoundingbox());
        }
    }

    __createLayer(title, features) {
        const layer = new ol.layer.Vector({
            title: title,
            source: this.__createSource(features),
            updateWhileAnimating: true,
            updateWhileInteracting: true
        });
        layer.set('id', this.__counter);
        return layer;
    }

    __createSource(features) {
        this._source = new ol.source.Vector({
            features: features
        });
        return this._cluster ? this.__createClusterSource(this._source) : this._source;
    }

    __createClusterSource(source) {
        return new ol.source.Cluster({
            distance: this._clusterDistance,
            source: source,
            geometryFunction: (feature) => {
                const geometry = feature.getGeometry();
                if (geometry instanceof ol.geom.Point) {
                    return geometry;
                } else {
                    return this.__negeerClustering();
                }
            }
        });
    }

    __getBoundingbox() {
        let boundingbox;
        if (this._source && this._source.getFeatures().length > 0) {
            boundingbox = this._source.getExtent();
        }
        return boundingbox;
    }

    __negeerClustering() {
        return null;
    }

    _configureMap() {
        if (this._map) {
            this._map.getOverlayLayers().push(this._layer);
            this.__zoomToExtent();
        }
    }
}

/**
 * VlMapBaseLayer
 * @class
 * @classdesc De kaart basis laag component. <a href="demo/vl-map.html">Demo</a>.
 *
 * @extends VlElement
 * 
 * @property {(wmts | wfs )} type - Attribuut wordt gebruikt om aan te geven wat het type is van de kaartlaag.
 * @property {string} url - Attribuut geeft aan via welke URL gebruikt wordt om de kaartlaag op te halen.
 * @property {string} layer - Attribuut geeft aan wat de kaartlaag identifier is.
 * @property {string} title - Attribuut bepaalt de titel van de kaartlaag.
 */
class VlMapBaseLayer extends VlElement(HTMLElement) {
    connectedCallback() {
        this._configureMap();
    }

    /**
     * Geeft het kaartlaag type terug.
     * 
     * @Return {string}
     */
    get type() {
        return this.getAttribute('type') || 'wmts';
    }

    /**
     * Geeft de kaartlaag URL terug.
     * 
     * @Return {string}
     */
    get url() {
        return this.getAttribute('url');
    }

    /**
     * Geeft de kaartlaag identifier terug.
     * 
     * @Return {string}
     */
    get layer() {
        return this.getAttribute('layer');
    }

    /**
     * Geeft de kaartlaag titel terug.
     * 
     * @Return {string}
     */
    get title() {
        return this.getAttribute('title');
    }

    get _map() {
        if (this.parentNode) {
            return this.parentNode.map;
        }
    }

    get _projection() {
        if (this.parentNode) {
            return this.parentNode._projection;
        }
    }

    get _WMTSSource() {
        this._wmtsSource = this._wmtsSource || this._createWMTSSource();
        return this._wmtsSource;
    }

    get _vectorSource() {
        this._createdVectorSource = this._createdVectorSource || this._createVectorSource();
        return this._createdVectorSource;
    }

    _configureMap() {
        if(this._map) {
            this._map.addBaseLayerAndOverlayMapLayer(this._createBaseLayer(), this._createBaseLayer());
        }
    }

    _createWMTSSource() {
        let size = ol.extent.getWidth(this._projection.getExtent()) / 256;
        let resolutions = new Array(16);
        let matrixIds = new Array(16);
        for (let z = 0; z < 16; ++z) {
            resolutions[z] = size / Math.pow(2, z);
            matrixIds[z] = z;
        }

        return new ol.source.WMTS({
            url: this.url,
            layer: this.layer,
            matrixSet: 'BPL72VL',
            format: 'image/png',
            projection: this._projection,
            tileGrid: new ol.tilegrid.WMTS({
                extent: this._projection.getExtent(),
                origin: ol.extent.getTopLeft(this._projection.getExtent()),
                resolutions: resolutions,
                matrixIds: matrixIds
            }),
            style: ''
        });
    }

    _createVectorSource() {
        var self = this;
        return new ol.source.Vector({
            format: new ol.format.GeoJSON({
                defaultDataProjection: self._projection
            }),
            url: function() {
                return self.url + '&typeName=' + self.layer;
            },
            strategy: ol.loadingstrategy.bbox
        });
    }

    _createBaseLayer() {
        switch(this.type) {
            case 'wmts':
                return new ol.layer.Tile({
                    title: this.title,
                    type: 'base',
                    source: this._WMTSSource
                });
            case 'wfs':
                return new ol.layer.Vector({
                    source: this._vectorSource,
                    style: new ol.style.Style({
                        stroke: new ol.style.Stroke({
                            color: 'rgba(0, 0, 0, 1.0)',
                            width: 1
                        }),
                        fill: new ol.style.Fill({
                            color: 'rgba(255, 0, 0, 1.0)'
                        })
                    })
                });
        }
    }
}

/**
 * VlMapBaseLayerGRBGray
 * @class
 * @classdesc De kaart basis laag component voor GRB grijstinten. <a href="demo/vl-map.html">Demo</a>.
 *
 * @extends VlElement
 */
class VlMapBaseLayerGRBGray extends VlMapBaseLayer {
    constructor() {
        super();
        this.setAttribute('url', 'https://tile.informatievlaanderen.be/ws/raadpleegdiensten/wmts');
        this.setAttribute('layer', 'grb_bsk_grijs');
        this.setAttribute('title', 'GRB basis laag grijs');
    }
}

/**
 * VlMapBaseLayerGRB
 * @class
 * @classdesc De kaart layer component voor GRB. <a href="demo/vl-map.html">Demo</a>.
 * 
 * @extends VlElement
 */
class VlMapBaseLayerGRB extends VlMapBaseLayer {
    constructor() {
        super();
        this.setAttribute('url', 'https://tile.informatievlaanderen.be/ws/raadpleegdiensten/wmts');
        this.setAttribute('layer', 'grb_bsk');
        this.setAttribute('title', 'GRB basis laag');
    }
}

/**
 * VlMapBaseLayerGRBOrtho
 * @class
 * @classdesc De kaart basis laag component voor GRB ortho. <a href="demo/vl-map.html">Demo</a>.
 * 
 * @extends VlElement
 */
class VlMapBaseLayerGRBOrtho extends VlMapBaseLayer {
    constructor() {
        super();
        this.setAttribute('url', 'https://tile.informatievlaanderen.be/ws/raadpleegdiensten/wmts');
        this.setAttribute('layer', 'omwrgbmrvl');
        this.setAttribute('title', 'GRB ortho laag');
    }
}

/**
 * VlMapAction
 * @class
 * @classdesc De abstracte kaart actie component.
 * 
 * @property {boolean} active - Attribuut bepaalt of de kaart geactiveerd is.
 * 
 * @extends VlElement
 */
class VlMapAction extends VlElement(HTMLElement) {
    connectedCallback() {
        this.__registerMapActionChangedCallback();
    }

    static isVlMapAction() {
        return true;
    }

    /**
     * Geeft de event naam die gebruikt wordt wanneer een nieuwe actie toegevoegd wordt aan de kaart
     * 
     * @returns {string}
     */
    static get newActionEventName() {
        return 'new-action-activated';
    }

    /**
     * Geeft de kaartlaag.
     * 
     * @returns {ol.layer.Layer}
     */
    get layer() {
        return this._layer;
    }

    /**
     * Zet de kaartlaag.
     * 
     * @param {ol.layer.Layer}
     */
    set layer(layer) {
        this._layer = layer;
        this._layerChangedCallback();
    }

    /**
     * Geeft de kaart actie.
     * 
     * @returns {ol.interaction}
     */
    get action() {
        return this._action;
    }

    get _map() {
        if (this.parentNode) {
            return this.parentNode.map;
        }
    }

    /**
     * Activeer de kaart actie op de kaart.
     */
    activateAction() {
        if (this._action) {
            this._map.activateAction(this._action);
            this.actionChanged();
        }
    }

    /**
     * Stuurt een event om te laten weten dat de actieve kaart actie gewijzigd werd
     */
    actionChanged() {
        const event = new Event(VlMapAction.newActionEventName);
        this.parentElement.dispatchEvent(event);
    }

    _layerChangedCallback() {
        this._computeAction(this._map, this.layer);
    }

    _createAction() {
        console.log('implementatie van de _createAction ontbreekt');
    }

    _computeAction(map, kaartlaag) {
        let action;
        if (map && kaartlaag) {
            action = this._createAction(kaartlaag);
            this.parentElement.addAction(action);
            this.actionChanged();
        }
        this._action = action;
    }

    __registerMapActionChangedCallback() {
        this.parentElement.addEventListener(VlMapAction.newActionEventName, () => {
            this.setAttribute('active', (this._map && this._map.currentAction == this._action));
        });
    }
}

/**
 * VlMapSelectAction
 * @class
 * @classdesc De kaart selecteer actie component. <a href="demo/vl-map.html">Demo</a>.
 * 
 * @extends VlElement
 */
class VlMapSelectAction extends VlMapAction {
    constructor() {
        super();
        this._onSelect = () => {
            console.info('er is geen onSelect functie gedefinieerd!');
        };
    }

    get style() {
        return this._style;
    }
    
    set style(style) {
        this._style = style;
    }

    mark(id) {
        if (this._action && id) {
            this._action.hoverFeatureWithId(id, this.layer);
        }
    }
    
    removeMarks() {
        if (this._action) {
            this._action.dehoverAllFeatures();
        }
    }
    
    select(feature) {
        if (this._action && feature) {
            this._action.selectFeature(feature);
        }
    }

    onSelect(callback) {
        this._onSelect = callback;
    }

    reset() {
        if (this._action) {
            this._action.clearFeatures();
        }
    }
    
    _createAction(layer) {
        return new acd.ol.action.SelectAction(layer, (args) => {this._onSelect(args);}, {
            style: this._style
        });
    }
}

/**
 * VlMapLayerStyle
 * @class
 * @classdesc De abstracte kaart laag style klasse.
 *
 * @extends VlElement
 *
 * @property {string} color - Attribuut wordt gebruikt om aan te geven wat de kleur is van de kaartlaagstijl.
 * @property {string} text-color - Attribuut wordt gebruikt om aan te geven wat de kleur is van de tekst.
 * @property {number} text-offset-x - Attribuut wordt gebruikt om aan te geven wat de offset op de x-as is van de tekst.
 * @property {number} text-offset-y - Attribuut wordt gebruikt om aan te geven wat de offset op de y-as is van de tekst.
 */
class VlMapLayerStyle extends VlElement(HTMLElement) {
    connectedCallback() {
        this._setStyleOnParent();
    }

    /**
     * Geeft de color van de stijl terug.
     *
     * @Return {string}
     */
    get color() {
        return this.getAttribute('color') || 'rgba(255, 255, 255, 1)';
    }

    /**
     * Geeft de tekstkleur van de stijl terug.
     *
     * @Return {string}
     */
    get textColor() {
        return this.getAttribute('text-color') || '#FFF';
    }

    /**
     * Geeft de offset op de x-as van de tekst terug.
     *
     * @Return {number}
     */
    get textOffsetX() {
        return this.getAttribute('text-offset-x') || 0;
    }

    /**
     * Geeft de offset op de y-as van de tekst terug.
     *
     * @Return {number}
     */
    get textOffsetY() {
        return this.getAttribute('text-offset-y') || 0;
    }

    /**
     * Geeft de stijl terug.
     *
     * @Return {string}
     */
    get style() {
        console.info("opgelet vl-map-layer-style is abstract en zal geen stijl toevoegen aan de kaartlaag");
        return null;
    }

    _hasUniqueStyles(features) {
        const styles = this._getStyles(features);
        return styles && this._containsObject(styles) && this._areIdentical(styles);
    }

    _containsStyle(features) {
        return this._containsObject(features.map((feature) => feature.getStyle()));
    }

    _getStyles(features) {
        return features.map((feature) => {
            return feature.getStyle();
        });
    }

    _containsObject(objects) {
        return objects.some((object) => { return !!object; });
    }

    _areIdentical(objects) {
        return objects.every((object, i, objects) => { return object == objects[0]; });
    }

    _setStyleOnParent() {
        if (this.parentElement) {
            return this.parentElement.style = this.style;
        }
    }
}

/**
 * VlMapLayerCircleStyle
 * @class
 * @classdesc De kaart laag style klasse voor cirkels. <a href="demo/vl-map-circle-style.html">Demo</a>.
 *
 * @extends VlMapLayerStyle
 *
 * @property {number} size - Attribuut wordt gebruikt om aan te geven wat de grootte is van de cirkels.
 * @property {string} border-color - Attribuut wordt gebruikt om aan te geven wat de color is van de randen van de cirkels.
 * @property {number} border-size - Attribuut wordt gebruikt om aan te geven wat de grootte is van de randen van de cirkels.
 * @property {string} cluster-text-color - Attribuut wordt gebruikt om aan te geven wat de kleur van de tekst is bij het clusteren van features.
 * @property {string} cluster-color - Attribuut wordt gebruikt om aan te geven wat de kleur is bij het clusteren van features.
 */
class VlMapLayerCircleStyle extends VlMapLayerStyle {
    /**
     * Geeft de grootte van de cirkels terug.
     *
     * @Return {number}
     */
    get size() {
        return this.getAttribute('size') || 5;
    }

    /**
     * Geeft de randkleur van de cirkels terug.
     *
     * @Return {string}
     */
    get borderColor() {
        return this.getAttribute('border-color') || 'rgba(0, 0, 0, 1)';
    }

    /**
     * Geeft de size van de rand van de cirkels terug.
     *
     * @Return {number}
     */
    get borderSize() {
        return this.getAttribute('border-size') || 1;
    }

    /**
     * Geeft de kleur van de tekst bij het clusteren van features terug.
     *
     * @Return {string}
     */
    get clusterTextColor() {
        return this.getAttribute('cluster-text-color') || '#FFF';
    }

    /**
     * Geeft de kleur bij het clusteren van features terug.
     *
     * @Return {string}
     */
    get clusterColor() {
        return this.getAttribute('cluster-color') || 'rgba(0, 0, 0, 0)';
    }

    /**
     * Geeft de stijl terug.
     *
     * @Return {string}
     */
    get style() {
        return (feature, resolution) => {
            const features = feature && feature.get ? (feature.get('features') || []) : [];
            const size = features.length || 1;
            const clusterMultiplier = size == 1 ? 1 : Math.max(1.5, size.toString().length);
            const text = size > 1 ? size.toString() : '';
            let textColor = this.textColor;
            let kleur = this.color;
            let randKleur = this.borderColor;
            let randGrootte = this.borderSize;
            let radius =  size > 1 ? this.size * clusterMultiplier : this.size;

            if (this.parentElement && this.parentElement.cluster) {
                if (this._hasUniqueStyles(features)) {
                    let style = features[0].getStyle();
                    if (style instanceof Function) {
                        style = style();
                    }
                    const styleImage = style.getImage();
                    kleur = styleImage.getFill().getColor();
                    randKleur = styleImage.getStroke().getColor();
                    randGrootte = styleImage.getStroke().getWidth();
                    radius = size > 1 ? styleImage.getRadius() * clusterMultiplier : styleImage.getRadius();
                } else if (this._containsStyle(features)) {
                    kleur = this.clusterColor;
                    textColor = this.clusterTextColor;
                }
            }

            return new ol.style.Style({
                image: new ol.style.Circle({
                    fill: new ol.style.Fill({
                        color: kleur
                    }),
                    stroke: new ol.style.Stroke({
                        color: randKleur,
                        width: randGrootte
                    }),
                    radius: radius
                }),
                text: new ol.style.Text({
                    text: text,
                    font: '12px Flanders Art',
                    fill: new ol.style.Fill({
                        color: textColor
                    }),
                    offsetX: this.textOffsetX,
                    offsetY: this.textOffsetY
                })
            });
        };
    }
}

(() => {
    loadScript('VlMap-openlayers', '/node_modules/vl-mapactions/lib/openlayers/dist/ol.js');
    loadScript('VlMap-proj4', '/node_modules/proj4/dist/proj4.js');
    loadScript('VlMap-mapactions', '/node_modules/vl-mapactions/dist/mapactions-min.js', () => {
        customElements.define('vl-map', VlMap);
        customElements.define('vl-map-layer', VlMapLayer);
        customElements.define('vl-map-baselayer', VlMapBaseLayer);
        customElements.define('vl-map-baselayer-grb-gray', VlMapBaseLayerGRBGray);
        customElements.define('vl-map-baselayer-grb', VlMapBaseLayerGRB);
        customElements.define('vl-map-baselayer-grb-ortho', VlMapBaseLayerGRBOrtho);
        customElements.define('vl-map-action', VlMapAction);
        customElements.define('vl-map-select-action', VlMapSelectAction);
        customElements.define('vl-map-layer-style', VlMapLayerStyle);
        customElements.define('vl-map-layer-circle-style', VlMapLayerCircleStyle);
    });
  
    function loadScript(id, src, onload) {
        if (!document.head.querySelector('#' + id)) {
            const script = document.createElement('script');
            script.setAttribute('id', id);
            script.setAttribute('src', src);
            script.async = false;
            script.defer = false;
            script.onload = onload;
            document.head.appendChild(script);
        }
    }
})();

export { VlMap, VlMapAction, VlMapBaseLayer, VlMapBaseLayerGRB, VlMapBaseLayerGRBGray, VlMapBaseLayerGRBOrtho, VlMapLayer, VlMapLayerCircleStyle, VlMapLayerStyle, VlMapSelectAction };
