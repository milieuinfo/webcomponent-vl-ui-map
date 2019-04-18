import { VlElement } from "/node_modules/vl-ui-core/vl-core.js";

/**
 * VlMapLayer
 * @class
 * @classdesc De kaart laag component. <a href="demo/vl-map.html">Demo</a>.
 *
 * @property {string} name - Attribuut bepaalt de kaartlaag naam.
 * @property {boolean} auto-extent - Attribuut geeft aan of er automatisch gezoomt wordt op de kaartlaag zodat al de features zichtbaar zijn.
 * @property {boolean} cluster - Attribuut geeft aan of de features geclusterd moeten worden of niet.
 * @property {number} cluster-distance - Attribuut geeft aan vanaf welke afstand tussen features er geclusterd mag worden.
 * @property {(string|Array.))} features - Attribuut die de kaartlaag bevat.
 * 
 * @extends VlElement
 */
export class VlMapLayer extends VlElement(HTMLElement) {
    constructor() {
        super();
        VlMapLayer._counter = 0;
        this.__geoJson = new ol.format.GeoJSON();
        this.__counter = ++VlMapLayer._counter;
    }

    connectedCallback() {
        this._layer = this.__createLayer(this._name, this._features);
        if (this._map) {
            this._map.getOverlayLayers().push(this._layer);
            this._zoomToExtent();
        }
    }

    static get _counter() {
        return this.__counter;
    }

    static set _counter(counter) {
        this.__counter = counter;
    }

    get _name() {
        return this.getAttribute('name');
    }

    get _autoExtent() {
        return this.getAttribute('auto-extent');
    }

    get _cluster() {
        return this.getAttribute('cluster');
    }

    get _clusterDistance() {
        return this.getAttribute('cluster-distance');
    }

    get _features() {
        return this.__geoJson.readFeatures(this.getAttribute('features'));
    }

    get _map() {
        if (this.parentNode) {
            return this.parentNode.map;
        }
    }

    get style() {
        if (this._layer) {
            return this._layer.getStyle();
        }
    }
    
    set style(style) {
        this._style = style;
        this._layer.setStyle(style);
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
}