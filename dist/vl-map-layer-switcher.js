import {vlElement} from '/node_modules/vl-ui-core/dist/vl-core.js';
import '/node_modules/vl-ui-form-message/dist/vl-form-message.js';

/**
 * VlMapLayerSwitcher
 * @class
 * @classdesc De kaartlagen wisselaar.
 *
 * @extends HTMLElement
 * @mixes vlElement
 *
 * @property {boolean} [data-vl-title=Kaartlagen] - Attribute wordt gebruikt om de kaartlagen titel te bepalen.
 *
 * @see {@link https://www.github.com/milieuinfo/webcomponent-vl-ui-map/releases/latest|Release notes}
 * @see {@link https://www.github.com/milieuinfo/webcomponent-vl-ui-map/issues|Issues}
 * @see {@link https://webcomponenten.omgeving.vlaanderen.be/demo/vl-map-overview-map.html|Demo}
 */
export class VlMapLayerSwitcher extends vlElement(HTMLElement) {
  constructor() {
    super(`
      <style>
        @import '/node_modules/vl-ui-form-message/dist/style.css';

        :host {
          display: block;
        }

        label {
          display: block;
        }

        ::slotted([data-vl-layer]) {
          display: block;
        }
      </style>
      <div>
        <label is="vl-form-label">Kaartlagen</label>
        <slot></slot>
      </div>
    `);
  }

  async connectedCallback() {
    await this._mapElement.ready;
    this._processInputs();
  }

  get _slot() {
    return this._element.querySelector('slot');
  }

  get _hasLayerInputs() {
    return this._layerInputs && this._layerInputs.length > 0;
  }

  get _layerInputs() {
    return this._slot.assignedElements().filter((input) => input.hasAttribute('data-vl-layer'));
  }

  get _mapElement() {
    return this.closest('vl-map');
  }

  _getInputTemplate(layer) {
    const title = layer.get('title');
    return this._template(`<vl-checkbox data-vl-label="${title}" data-vl-layer="${title}"></vl-checkbox>`);
  }

  get _map() {
    if (this._mapElement) {
      return this._mapElement._map;
    }
  }

  _processInputs() {
    if (!this._hasLayerInputs) {
      this._map.getOverlayLayers().forEach((layer) => this.append(this._getInputTemplate(layer)));
    }
    this._addChangeListeners();
  }

  _addChangeListeners() {
    if (this._map) {
      this._layerInputs.forEach((input) => {
        this._initializeInput(input);
        input.addEventListener('change', () => this._setLayerVisibility(input));
      });
    }
  }

  _initializeInput(input) {
    const layer = this._getLayer(input);
    if (layer) {
      input.checked = layer.getVisible();
    }
  }

  _setLayerVisibility(input) {
    const layer = this._getLayer(input);
    if (layer) {
      layer.setVisible(input.checked);
      this._map.render();
    }
  }

  _getLayer(input) {
    return this._map.getOverlayLayers().find((layer) => layer.get('title') == input.dataset.vlLayer);
  }
}
