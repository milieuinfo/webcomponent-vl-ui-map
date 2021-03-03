import {define} from '/node_modules/vl-ui-core/dist/vl-core.js';
import {VlMapAction} from '/node_modules/vl-ui-map/dist/vl-map-action.js';

/**
 * VlMapLayerAction
 * @class
 * @classdesc De abstracte kaart actie component die verbonden is aan een kaartlaag.
 *
 * @extends VlMapAction
 *
 * @property {boolean} data-vl-layer - Attribuut wordt gebruikt om via het naam attribuut de actie te koppelen aan een kaartlaag.
 *
 * @see {@link https://www.github.com/milieuinfo/webcomponent-vl-ui-map/releases/latest|Release notes}
 * @see {@link https://www.github.com/milieuinfo/webcomponent-vl-ui-map/issues|Issues}
 */
export class VlMapLayerAction extends VlMapAction {
  static get _observedAttributes() {
    return ['layer'];
  }

  connectedCallback() {
    super.connectedCallback();
    this._layerChangedCallback();
  }

  /**
   * Geeft de OL6 kaartlaag.
   *
   * @return {Object}
   */
  get layer() {
    return this._layer;
  }

  /**
   * Zet de kaartlaag.
   *
   * @param {Object} layer OL6 kaartlaag
   */
  set layer(layer) {
    this._layer = layer;
    this._processAction();
  }

  get _layerElement() {
    return this._mapElement.querySelector(`[data-vl-is-layer][data-vl-name="${this.dataset.vlLayer}"]`) || this.closest('[data-vl-is-layer]');
  }

  _layerChangedCallback() {
    if (this._layerElement) {
      this.layer = this._layerElement.layer;
    }
  }

  _processAction() {
    this._mapElement.ready.then(() => {
      if (this._action) {
        this._mapElement.removeAction(this._action);
      }

      if (this.layer) {
        this._action = this._createAction(this.layer);
        super._processAction();
      }
    });
  }
}

define('vl-map-layer-action', VlMapLayerAction);
