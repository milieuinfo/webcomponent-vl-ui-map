import {vlElement} from '/node_modules/vl-ui-core/dist/vl-core.js';

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
 * @see {@link https://www.github.com/milieuinfo/webcomponent-vl-ui-map/releases/latest|Release notes}
 * @see {@link https://www.github.com/milieuinfo/webcomponent-vl-ui-map/issues|Issues}
 */
export class VlMapAction extends vlElement(HTMLElement) {
  connectedCallback() {
    this.__registerMapActionChangedCallback();
  }

  static isVlMapAction() {
    return true;
  }

  /**
   * Geeft de event naam die gebruikt wordt wanneer een nieuwe actie toegevoegd wordt aan de kaart
   *
   * @return {string}
   */
  static get NEW_ACTION_EVENT_NAME() {
    return 'new-action-activated';
  }

  /**
   * Geeft de kaartlaag stijl.
   *
   * @return {Object}
   */
  get style() {
    return this._style;
  }

  /**
   * Zet de kaartlaag stijl.
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

  get _map() {
    if (this.parentNode) {
      return this.parentNode.map;
    }
  }

  get _callback() {
    return (args) => this.__callback ? this.__callback(args) : null;
  }

  /**
   * Activeer de kaart actie op de kaart.
   */
  activateAction() {
    if (this.action) {
      this._map.activateAction(this.action);
      this.actionChanged();
    }
  }

  /**
   * Stuurt een event om te laten weten dat de actieve kaart actie gewijzigd werd
   */
  actionChanged() {
    const event = new Event(VlMapAction.NEW_ACTION_EVENT_NAME);
    this.parentElement.dispatchEvent(event);
  }

  _layerChangedCallback() {
    this._computeAction(this._map, this.layer);
  }

  _createAction() {
    console.log('implementatie van de _createAction ontbreekt');
  }

  _computeAction(map, kaartlaag) {
    let action;
    if (map && kaartlaag) {
      action = this._createAction(kaartlaag);
      this.parentElement.addAction(action);
      this.actionChanged();
    }
    this._action = action;
  }

  __registerMapActionChangedCallback() {
    this.parentElement.addEventListener(VlMapAction.NEW_ACTION_EVENT_NAME, () => {
      this.setAttribute('active', (this._map && this._map.currentAction == this.action));
    });
  }
}
