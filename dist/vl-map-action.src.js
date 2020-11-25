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
    this.__registerMapActionChangedCallback();
  }

  static isVlMapAction() {
    return true;
  }

  /**
   * Geeft de vl-mapactions kaart actie.
   *
   * @return {Object}
   */
  get action() {
    return this._action;
  }

  get _mapElement() {
    return this.closest('vl-map');
  }

  get _defaultActive() {
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
    });
  }
}

