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

  _getLayer(input) {
    return this._mapElement.layers.find((layer) => layer.title == input.dataset.vlLayer);
  }

  _getInputTemplate(title) {
    return this._template(`<vl-checkbox data-vl-label="${title}" data-vl-layer="${title}"></vl-checkbox>`);
  }

  _processInputs() {
    if (!this._hasLayerInputs && this._mapElement.layers) {
      this._mapElement.layers.forEach((layer) => this.append(this._getInputTemplate(layer.title)));
    }
    this._addChangeListeners();
    this._addMapListener();
  }

  _addChangeListeners() {
    this._layerInputs.forEach((input) => {
      this._initializeInput(input);
      input.addEventListener('change', () => this._setLayerVisibility(input));
    });
  }

  _addMapListener() {
    this._mapElement.on('moveend', () => this._computeInputsDisabledAttribute());
  }

  _initializeInput(input) {
    const layer = this._getLayer(input);
    if (layer) {
      input.checked = layer.visible;
    }
  }

  _setLayerVisibility(input) {
    const layer = this._getLayer(input);
    if (layer) {
      layer.visible = input.checked;
      this._mapElement.rerender();
    }
  }

  _computeInputsDisabledAttribute() {
    this._layerInputs.forEach((input) => this._computeInputDisabledAttribute(input, this._mapElement.resolution));
  }

  _computeInputDisabledAttribute(input, resolution) {
    const layer = this._getLayer(input);
    if (layer) {
      if (layer.isVisibleAtResolution(resolution)) {
        input.removeAttribute('disabled');
      } else {
        input.setAttribute('disabled', '');
      }
    }
  }
}
