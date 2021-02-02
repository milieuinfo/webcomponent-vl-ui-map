import {VlMapLayer} from '/src/vl-map-layer.js';
import {
  OlVectorLayer,
  OlVectorSource,
  OlGeoJSON,
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
    return [...VlMapLayer._observedAttributes, 'features'];
  }

  constructor() {
    super();
    this._geoJSON = new OlGeoJSON();
  }

  async connectedCallback() {
    this._layer = this.__createLayer();
    await super.connectedCallback();
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

  _featuresChangedCallback(oldValue, newValue) {
    if (newValue && this._layer) {
      this.source.clear();
      this.source.addFeatures(this.features);
      this._autoZoomToExtent();
      this.rerender();
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
    return this.source;
  }
}
