import {vlElement} from '/node_modules/vl-ui-core/dist/vl-core.js';

/**
 * VlMapLayer
 * @class
 * @classdesc De kaart laag component.
 *
 * @extends HTMLElement
 * @mixes vlElement
 *
 * @property {string} data-vl-name - Attribuut bepaalt de kaartlaag naam.
 *
 * @see {@link https://www.github.com/milieuinfo/webcomponent-vl-ui-map/releases/latest|Release notes}
 * @see {@link https://www.github.com/milieuinfo/webcomponent-vl-ui-map/issues|Issues}
 * @see {@link https://webcomponenten.omgeving.vlaanderen.be/demo/vl-map-layer.html|Demo}
 */
export class VlMapLayer extends vlElement(HTMLElement) {
  constructor() {
    super();
    VlMapLayer._counter = 0;
    this.__counter = ++VlMapLayer._counter;
    this.__setIsLayerMarkerAttribute();
  }

  async connectedCallback() {
    if (this.mapElement) {
      await this.mapElement.ready;
      this.mapElement.addLayer(this._layer);
    }
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

  get ready() {
    return this.mapElement.ready;
  }

  get _name() {
    return this.getAttribute('name') || 'kaartlaag';
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
    return true;
  }

  __setIsLayerMarkerAttribute() {
    this.dataset.vlIsLayer = true;
  }
}
