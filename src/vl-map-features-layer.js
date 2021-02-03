import {VlMapLayer} from '/src/vl-map-layer.js';
import {
  OlVectorLayer,
  OlVectorSource,
  OlGeoJSON,
  OlClusterSource,
  OlPoint,
} from '/node_modules/vl-mapactions/dist/vl-mapactions.js';

/**
 * VlMapFeaturesLayer
 * @class
 * @classdesc Deze kaartlaag staat je toe om een set van te tonen features in te stellen.
 *
 * @extends VlMapLayer
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
 * @see {@link https://webcomponenten.omgeving.vlaanderen.be/demo/vl-map-features-layer.html|Demo}
 */
export class VlMapFeaturesLayer extends VlMapLayer {
  static get _observedAttributes() {
    return ['auto-extent', 'features'];
  }

  constructor() {
    super();
    this._geoJSON = new OlGeoJSON();
    this._source = this.__createSource();
    this._layer = this.__createLayer();
  }

  async connectedCallback() {
    await super.connectedCallback();
    if (this.mapElement) {
      this._autoZoomToExtent();
    }
  }

  /**
   * Geeft de OpenLayers features collectie van de kaartlaag terug.
   *
   * @return {object}
   */
  get features() {
    const features = this.getAttribute('features');
    return features ? this._geoJSON.readFeatures(features) : [];
  }

  /**
   * Zet de OpenLayers features collectie op de kaartlaag.
   *
   * @param {object} features
   */
  set features(features) {
    this.setAttribute('features', JSON.stringify(features));
  }

  get _autoExtent() {
    return this.getAttribute('auto-extent') != undefined;
  }

  get _autoExtentMaxZoom() {
    return this.getAttribute('auto-extent-max-zoom');
  }

  get cluster() {
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
    if (this.source && this.source.getFeatures()) {
      this.source.getFeatures().forEach((feature) => {
        feature.setStyle(null);
      });
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

  __createLayer() {
    const layer = new OlVectorLayer({
      title: this._name,
      source: this._source,
      updateWhileAnimating: true,
      updateWhileInteracting: true,
      minResolution: this._minResolution,
      maxResolution: this._maxResolution,
    });
    layer.set('id', VlMapLayer._counter);
    return layer;
  }

  __createSource() {
    const source = new OlVectorSource({
      features: this.features,
    });
    return this.cluster ? this.__createClusterSource(source) : source;
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
}