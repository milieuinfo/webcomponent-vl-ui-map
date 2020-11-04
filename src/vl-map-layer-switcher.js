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
      </style>
      <div>
        <label is="vl-form-label">Kaartlagen</label>
        <slot></slot>
      </div>
    `);
  }

  connectedCallback() {
    this._addClickListeners();
  }

  get _slot() {
    return this._element.querySelector('slot');
  }

  get _layerInputs() {
    return this._slot.assignedElements().filter((input) => input.hasAttribute('data-vl-layer'));
  }

  get _map() {
    if (this.closest('vl-map')) {
      return this.closest('vl-map')._map;
    }
  }

  _addClickListeners() {
    if (this._map) {
      this._layerInputs.forEach((input) => {
        const layer = this._getLayer(input.dataset.vlLayer);
        if (layer) {
          input.checked = layer.getVisible();
        }
        input.addEventListener('click', () => {
          const layer = this._getLayer(input.dataset.vlLayer);
          if (layer) {
            layer.setVisible(input.checked);
            this._map.render();
          }
        });
      });
    }
  }

  _getLayer(title) {
    return this._map.getOverlayLayers().find((layer) => layer.get('title') == title);
  }
}
