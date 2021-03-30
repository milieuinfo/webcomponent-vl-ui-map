import {vlElement} from '/node_modules/vl-ui-core/dist/vl-core.js';

/**
 * VlMapLayer
 * @class
 * @classdesc De abstracte kaart laag klasse.
 *
 * @extends HTMLElement
 * @mixes vlElement
 *
 * @property {string} data-vl-name - Attribuut bepaalt de kaartlaag naam.
 *
 * @see {@link https://www.github.com/milieuinfo/webcomponent-vl-ui-map/releases/latest|Release notes}
 * @see {@link https://www.github.com/milieuinfo/webcomponent-vl-ui-map/issues|Issues}
 * @see {@link https://webcomponenten.omgeving.vlaanderen.be/demo/vl-map-wms-layer.html|Demo}
 * @see {@link https://webcomponenten.omgeving.vlaanderen.be/demo/vl-map-wmts-layer.html|Demo}
 */
export class VlMapLayer extends vlElement(HTMLElement) {
  constructor() {
    super();
    VlMapLayer._counter = 0;
    this.__counter = ++VlMapLayer._counter;
    this.__ready = false;
  }

  async connectedCallback() {
    this.__setIsLayerMarkerAttribute();
    if (this.mapElement) {
      await this.mapElement.ready;
      this.mapElement.addLayer(this._layer);
    }
    this.__markAsReady();
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
   * Geeft terug ofdat de kaartlaag zichtbaar is of niet.
   *
   * @return {Boolean}
   */
  get visible() {
    return this._layer.getVisible();
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

  get ready() {
    return this.__ready;
  }

  get _name() {
    return this.getAttribute('name') || 'kaartlaag';
  }

  get _minResolution() {
    return this.getAttribute('min-resolution') || 0;
  }

  get _maxResolution() {
    return this.getAttribute('max-resolution') || Infinity;
  }

  get _visible() {
    return this.getAttribute('hidden') == undefined;
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
   * Rendert de kaartlaag opnieuw.
   */
  rerender() {
    if (this.mapElement) {
      this.mapElement.rerender();
    }
  }

  isVisibleAtResolution(resolution) {
    const maxResolution = parseFloat(this._layer.getMaxResolution());
    const minResolution = parseFloat(this._layer.getMinResolution());
    return resolution >= minResolution && resolution < maxResolution;
  }

  __setIsLayerMarkerAttribute() {
    this.dataset.vlIsLayer = true;
  }

  __markAsReady() {
    this.__ready = true;
  }
}
