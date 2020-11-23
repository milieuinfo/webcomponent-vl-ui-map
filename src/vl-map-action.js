import {vlElement} from '/node_modules/vl-ui-core/dist/vl-core.js';
import {VlMap} from '/src/vl-map.js';

/**
 * VlMapAction
 * @class
 * @classdesc De abstracte kaart actie component.
 *
 * @property {boolean} active - Attribuut bepaalt of de kaart geactiveerd is.
 *
 * @extends HTMLElement
 * @mixes vlElement
 *
 * @property {boolean} data-vl-default-active - Attribuut wordt gebruikt om de actie standaard te activeren.
 *
 * @see {@link https://www.github.com/milieuinfo/webcomponent-vl-ui-map/releases/latest|Release notes}
 * @see {@link https://www.github.com/milieuinfo/webcomponent-vl-ui-map/issues|Issues}
 */
export class VlMapAction extends vlElement(HTMLElement) {
  connectedCallback() {
    this.__defineLayer();
    this.__registerMapActionChangedCallback();
  }

  static isVlMapAction() {
    return true;
  }

  /**
   * Geeft de stijl van de kaartinteractie.
   *
   * @return {Object}
   */
  get style() {
    return this._style;
  }

  /**
   * Zet de stijl van de kaartinteractie.
   *
   * @param {Object} style
   */
  set style(style) {
    this._style = style;
  }

  /**
   * Geeft de kaartlaag.
   *
   * @return {Object}
   */
  get layer() {
    return this._layer;
  }

  /**
   * Zet de kaartlaag.
   *
   * @param {Object} layer
   */
  set layer(layer) {
    this._layer = layer;
    this._layerChangedCallback();
  }

  /**
   * Geeft de kaart actie.
   *
   * @return {Object}
   */
  get action() {
    return this._action;
  }

  get _mapElement() {
    return this.closest('vl-map');
  }

  get _layerElement() {
    return this.closest('vl-map-layer');
  }

  get _active() {
    return this.hasAttribute('default-active');
  }

  get _callback() {
    return (args) => this.__callback ? this.__callback(args) : null;
  }

  /**
   * Activeer de kaart actie op de kaart.
   */
  activate() {
    this._mapElement.activateAction(this.action);
  }

  _layerChangedCallback() {
    this._mapElement.ready.then(() => this._processAction(this.layer));
  }

  _createAction() {
    console.warn('implementatie van _createAction ontbreekt');
  }

  _processAction(layer) {
    if (layer) {
      this._action = this._createAction(layer);
      if (this._action) {
        this._mapElement.addAction(this._action);
        if (this._active) {
          this.activate();
        }
      }
    }
  }

  __registerMapActionChangedCallback() {
    this._mapElement.addEventListener(VlMap.EVENTS.action.activated, () => {
      this.setAttribute('active', this._mapElement.activeAction == this.action);
    });
  }

  __defineLayer() {
    if (this._layerElement) {
      this.layer = this._layerElement.layer;
    }
  }
}
