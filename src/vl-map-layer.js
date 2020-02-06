import { VlElement } from "/node_modules/vl-ui-core/vl-core.js";

/**
 * VlMapLayer
 * @class
 * @classdesc De kaart laag component.
 *
 * @property {string} name - Attribuut bepaalt de kaartlaag naam.
 * @property {boolean} auto-extent - Attribuut geeft aan of er automatisch gezoomt wordt op de kaartlaag zodat al de features zichtbaar zijn.
 * @property {number} auto-extent-zoom-level - Attribuut geeft aan tot op welk niveau er automatisch gezoomt moet worden.
 * @property {boolean} cluster - Attribuut geeft aan of de features geclusterd moeten worden of niet.
 * @property {number} cluster-distance - Attribuut geeft aan vanaf welke afstand tussen features er geclusterd mag worden.
 * @property {string[]} features - Attribuut die de kaartlaag bevat.
 * 
 * @extends VlElement
 * 
 * @see {@link https://www.github.com/milieuinfo/webcomponent-vl-ui-map/releases/latest|Release notes}
 * @see {@link https://www.github.com/milieuinfo/webcomponent-vl-ui-map/issues|Issues}
 * @see {@link https://webcomponenten.omgeving.vlaanderen.be/demo/vl-map-layer.html|Demo}
 */
export class VlMapLayer extends VlElement(HTMLElement) {
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

    get _autoExtentMaxZoom() {
        return this.getAttribute('auto-extent-max-zoom');
    }

    get _cluster() {
        return this.getAttribute('cluster') != undefined;
    }

    get _clusterDistance() {
        return this.getAttribute('cluster-distance');
    }

    get _map() {
        if (this._mapElement) {
            return this._mapElement.map;
        }
    }

    get _mapReady() {
        if (this._mapElement) {
            return this._mapElement.ready;
        }
    }

    get _mapElement() {
        return this.parentNode;
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

    /**
     * Zoom naar alle features in deze layer.
     *
     * @param {number} maxZoom - Hoe diep er maximaal ingezoomd mag worden.
     * @returns {Promise<void>}
     */
    async zoomToExtent(maxZoom) {
        await this._mapReady;
        if (this._map) {
            this._map.zoomToExtent(this.__boundingBox, maxZoom);
        }
    }

    _auto_extentChangedCallback() {
        this.__autoZoomToExtent();
    }

    _featuresChangedCallback(oldValue, newValue) {
        if (newValue && this._layer) {
            this._source.clear();
            this._source.addFeatures(this.features);
            this.__autoZoomToExtent();
            this.rerender();
        }
    }

    __autoZoomToExtent() {
        if (this._autoExtent) {
            this.zoomToExtent(this._autoExtentMaxZoom);
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

    get __boundingBox() {
        let boundingBox;
        if (this._source && this._source.getFeatures().length > 0) {
            boundingBox = this._source.getExtent();
        }
        return boundingBox;
    }

    __negeerClustering() {
        return null;
    }

    _configureMap() {
        if (this._map) {
            this._map.getOverlayLayers().push(this._layer);
            this.__autoZoomToExtent();
        }
    }
}
