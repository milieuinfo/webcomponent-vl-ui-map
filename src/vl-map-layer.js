import {vlElement} from '/node_modules/vl-ui-core/dist/vl-core.js';
import {
  OlClusterSource,
  OlPoint,
} from '/node_modules/vl-mapactions/dist/vl-mapactions.js';

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
 *
 * @see {@link https://www.github.com/milieuinfo/webcomponent-vl-ui-map/releases/latest|Release notes}
 * @see {@link https://www.github.com/milieuinfo/webcomponent-vl-ui-map/issues|Issues}
 * @see {@link https://webcomponenten.omgeving.vlaanderen.be/demo/vl-map-layer.html|Demo}
 */
export class VlMapLayer extends vlElement(HTMLElement) {
  static get _observedAttributes() {
    return ['auto-extent'];
  }

  constructor() {
    super();
    VlMapLayer._counter = 0;
    this.__counter = ++VlMapLayer._counter;
    this.dataset.vlIsLayer = true;
  }

  async connectedCallback() {
    await this.mapElement.ready;
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
    return this.__source;
  }

  set _source(source) {
    this.__source = this.cluster ? this.__createClusterSource(source) : source;
  }

  /**
   * Geeft terug ofdat de kaartlaag zichtbaar is of niet.
   *
   * @return {Boolean}
   */
  get visible() {
    return this._layer.getVisible();
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
   * Geeft de kaartlaag titel terug.
   *
   * @return {String}
   */
  get title() {
    return this.get('title');
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

  /**
   * Zet de zichtbaarheid van de kaartlaag.
   *
   * @param {Boolean} value
   */
  set visible(value) {
    this._layer.setVisible(value);
  }

  get mapElement() {
    if (this.parentNode && this.parentNode.map) {
      return this.parentNode;
    } else {
      return null;
    }
  }

  get cluster() {
    return this.getAttribute('cluster') != undefined;
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
   * Geeft de waarde op basis van een sleutel.
   *
   * @param {String} key
   * @return {Object}
   */
  get(key) {
    return this._layer.get(key);
  }

  /**
   * Verwijdert de stijl van al de kaartlaag features.
   */
  removeFeaturesStyle() {
    if (this.source && this.source.getFeatures()) {
      this.source.getFeatures().forEach((feature) => {
        feature.setStyle(null);
      });
    }
  }

  /**
   * Rendert de kaartlaag opnieuw.
   */
  rerender() {
    if (this.mapElement) {
      this.mapElement.rerender();
    }
  }

  /**
   * Geeft de feature terug op basis van het id attribuut.
   *
   * @param {number} id
   * @return {Object}
   */
  getFeature(id) {
    if (this.source && this.source.getFeatures()) {
      return this.source.getFeatures().filter((feature) => {
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
   */
  async zoomToExtent(maxZoom) {
    this.mapElement.zoomTo(this.__boundingBox, maxZoom);
  }

  isVisibleAtResolution(resolution) {
    const maxResolution = parseFloat(this._layer.getMaxResolution());
    const minResolution = parseFloat(this._layer.getMinResolution());
    return resolution >= minResolution && resolution < maxResolution;
  }

  _autoExtentChangedCallback() {
    this._autoZoomToExtent();
  }

  _featuresChangedCallback(oldValue, newValue) {
    if (newValue && this._layer) {
      this.source.clear();
      this.source.addFeatures(this.features);
      this._autoZoomToExtent();
      this.rerender();
    }
  }

  _autoZoomToExtent() {
    if (this._autoExtent) {
      this.zoomToExtent(this._autoExtentMaxZoom);
    }
  }

  get __boundingBox() {
    if (this.source && this.source.getFeatures().length > 0) {
      return this.source.getExtent();
    }
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

  __ignoreClustering() {
    return null;
  }

  _configureMap() {
    if (this.mapElement) {
      this.mapElement.addLayer(this._layer);
      this._autoZoomToExtent();
    }
  }
}
