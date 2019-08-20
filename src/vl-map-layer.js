import { VlElement } from "/node_modules/vl-ui-core/vl-core.js";

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
 * 
 *  @version <a href="http://www.github.com/milieuinfo/webcomponent-vl-ui-map/releases/latest">Release notes</a>
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
