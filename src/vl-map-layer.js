import {vlElement} from '/node_modules/vl-ui-core/dist/vl-core.js';
import {OlVectorLayer, OlVectorSource, OlClusterSource, OlPoint} from '/node_modules/vl-mapactions/dist/vl-mapactions.js';

/**
 * VlMapLayer
 * @class
 * @classdesc De kaart laag component.
 *
 * @extends HTMLElement
 * @mixes vlElement
 *
 * @property {string} data-vl-name - Attribuut bepaalt de kaartlaag naam.
 * @property {boolean} data-vl-auto-extent - Attribuut geeft aan of er automatisch gezoomt wordt op de kaartlaag zodat al de features zichtbaar zijn.
 * @property {number} data-vl-auto-extent-max-zoom - Attribuut geeft aan tot op welk niveau er maximaal automatisch gezoomd wordt bij een extent.
 * @property {boolean} data-vl-cluster - Attribuut geeft aan of de features geclusterd moeten worden of niet.
 * @property {number} data-vl-cluster-distance - Attribuut geeft aan vanaf welke afstand tussen features er geclusterd mag worden.
 * @property {string[]} data-vl-features - Attribuut die de kaartlaag bevat.
 *
 * @see {@link https://www.github.com/milieuinfo/webcomponent-vl-ui-map/releases/latest|Release notes}
 * @see {@link https://www.github.com/milieuinfo/webcomponent-vl-ui-map/issues|Issues}
 * @see {@link https://webcomponenten.omgeving.vlaanderen.be/demo/vl-map-layer.html|Demo}
 */
export class VlMapLayer extends vlElement(HTMLElement) {
  static get _observedAttributes() {
    return ['auto-extent', 'features'];
  }

  constructor() {
    super();
    VlMapLayer._counter = 0;
    this.__counter = ++VlMapLayer._counter;
  }

  connectedCallback() {
    this._layer = this.__createLayer();
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
   * @return {ol.layer.Layer}
   */
  get layer() {
    return this._layer;
  }

  /**
   * Geeft de OpenLayers kaartlaag source.
   *
   * @return {ol.source}
   */
  get source() {
    return this._source;
  }

  /**
   * Geeft de OpenLayers features collectie van de kaartlaag terug.
   *
   * @return {object}
   */
  get features() {
    const features = this.getAttribute('features');
    return features ? this.mapElement.geoJSON.readFeatures(features) : [];
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
   * @return {ol.style}
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

  get map() {
    return this.mapElement.map;
  }

  get mapElement() {
    return this.parentNode;
  }

  get ready() {
    return this.mapElement.ready;
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

  get _minResolution() {
    return this.getAttribute('min-resolution') || 0;
  }

  get _maxResolution() {
    return this.getAttribute('max-resolution') || Infinity;
  }

  /**
   * Verwijdert de stijl van al de kaartlaag features.
   */
  removeFeaturesStyle() {
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
    if (this.map) {
      this.map.render();
    }
  }

  /**
   * Geeft de feature terug op basis van het id attribuut.
   *
   * @param {number} id
   * @return {Object}
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
   * @return {boolean}
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
   * @return {Promise<void>}
   */
  async zoomToExtent(maxZoom) {
    await this.ready;
    this.map.zoomToExtent(this.__boundingBox, maxZoom);
  }

  _autoExtentChangedCallback() {
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

  __createLayer() {
    const layer = new OlVectorLayer({
      title: this._name,
      source: this.__createSource(this.features),
      updateWhileAnimating: true,
      updateWhileInteracting: true,
      minResolution: this._minResolution,
      maxResolution: this._maxResolution,
    });
    layer.set('id', this.__counter);
    return layer;
  }

  __createSource(features) {
    this._source = new OlVectorSource({
      features: features,
    });
    return this._cluster ? this.__createClusterSource(this._source) : this._source;
  }

  __createClusterSource(source) {
    return new OlClusterSource({
      distance: this._clusterDistance,
      source: source,
      geometryFunction: (feature) => {
        const geometry = feature.getGeometry();
        if (geometry instanceof OlPoint) {
          return geometry;
        } else {
          return this.__ignoreClustering();
        }
      },
    });
  }

  get __boundingBox() {
    if (this._source && this._source.getFeatures().length > 0) {
      return this._source.getExtent();
    }
  }

  __ignoreClustering() {
    return null;
  }

  _configureMap() {
    if (this.map) {
      this.map.getOverlayLayers().push(this._layer);
      this.__autoZoomToExtent();
    }
  }
}
