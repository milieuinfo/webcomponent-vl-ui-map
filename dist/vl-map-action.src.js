import {vlElement} from 'vl-ui-core';
import {VlMap} from 'vl-ui-map/dist/vl-map.src.js';

/**
 * VlMapAction
 * @class
 * @classdesc De abstracte kaart actie component.
 *
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
<<<<<<< HEAD
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
=======
   * Geeft de vl-mapactions kaart actie.
>>>>>>> c32155f8f92e9c9c2d8a9d305968239e2c6cd34e
   *
   * @return {Object}
   */
  get action() {
    return this._action;
  }

<<<<<<< HEAD
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

  get _map() {
    if (this._mapElement) {
      return this._mapElement.map;
    }
=======
  get _mapElement() {
    return this.closest('vl-map');
  }

  get _defaultActive() {
    return this.hasAttribute('default-active');
  }

  get _callback() {
    return (args) => this.__callback ? this.__callback(args) : null;
>>>>>>> c32155f8f92e9c9c2d8a9d305968239e2c6cd34e
  }

  get _callback() {
    return (args) => this.__callback ? this.__callback(args) : null;
  }

  /**
   * Activeer de kaart actie op de kaart.
   */
  activate() {
<<<<<<< HEAD
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
    this._mapElement.dispatchEvent(event);
  }

  _layerChangedCallback() {
    this._mapElement.ready.then(() => {
      if (this.layer) {
        const action = this._createAction(this.layer);
        if (action) {
          this._mapElement.addAction(action);
          this.actionChanged();
          if (this._active) {
            action.activate();
          }
          this._action = action;
        }
      }
    });
  }

  _createAction() {
    console.log('implementatie van _createAction ontbreekt');
  }

  __registerMapActionChangedCallback() {
    this._mapElement.addEventListener(VlMapAction.NEW_ACTION_EVENT_NAME, () => {
      this.setAttribute('active', (this._map && this._map.currentAction == this.action));
=======
    this._mapElement.activateAction(this.action);
  }

  _createAction() {
    console.warn('implementatie van _createAction ontbreekt');
  }

  _processAction() {
    if (this.action) {
      this._mapElement.addAction(this.action);
      if (this._defaultActive) {
        this.activate();
      }
    }
  }

  __registerMapActionChangedCallback() {
    this._mapElement.addEventListener(VlMap.EVENTS.action.activated, () => {
      this.setAttribute('active', this._mapElement.activeAction == this.action);
>>>>>>> c32155f8f92e9c9c2d8a9d305968239e2c6cd34e
    });
  }

  __defineLayer() {
    if (this._layerElement) {
      this.layer = this._layerElement.layer;
    }
  }
}

