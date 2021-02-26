import {vlElement} from '/node_modules/vl-ui-core/dist/vl-core.js';
import '/node_modules/vl-ui-search/dist/vl-search.js';
import '/src/vl-select-location.js';
import {OlOverlay} from '/node_modules/vl-mapactions/dist/vl-mapactions.js';
import LambertCoordinaat from '/src/lambert-coordinaat.js';

/**
 * VlMapSearch
 * @class
 * @classdesc De kaart zoek op adres component.
 *
 * @extends HTMLElement
 * @mixes vlElement
 *
 * @see {@link https://www.github.com/milieuinfo/webcomponent-vl-ui-map/releases/latest|Release notes}
 * @see {@link https://www.github.com/milieuinfo/webcomponent-vl-ui-map/issues|Issues}
 * @see {@link https://webcomponenten.omgeving.vlaanderen.be/demo/vl-map-search.html|Demo}
 */
class VlMapSearch extends vlElement(HTMLElement) {
  constructor() {
    super(`
      <style>
        @import '/node_modules/vl-ui-search/dist/style.css';
        @import '/node_modules/vl-ui-select/dist/style.css';

        :host {
          display: block;
        }
      </style>
      <vl-search id="search" data-vl-inline>
        <select is="vl-select-location" slot="input"></select>
      </vl-search>
    `);
    this._configure();
    this._addSelectChangeListener();
  }

  get _selectElement() {
    return this._shadow.querySelector('select');
  }

  bindMap(map) {
    this._map = map;
  }

  /**
   * Bepaal callback die uitgevoerd wordt bij selectie van een locatie via de map search.
   *
   * @param {Function} callback
   */
  onSelect(callback) {
    this._onSelect = callback;
  }

  _zoomTo(boundingBox) {
    this._map.zoomTo(boundingBox, 10);
  }

  _configure() {
    customElements.whenDefined('vl-map').then(() => {
      if (this.parentNode && this.parentNode.map) {
        this._map = this.parentNode._shadow.host;
        this._map.map.addOverlay(new OlOverlay({
          className: 'vl-map-search__overlaycontainer',
          element: this,
        }));
      }
    });
  }

  _addSelectChangeListener() {
    this._selectElement.addEventListener('change', (e) => {
      if (this._onSelect) {
        this._onSelect(e.target.value);
      } else if (e.target.location) {
        e.target.location.then((location) => this._zoomTo(location));
      }
    });
  }
}

export {
  LambertCoordinaat,
  VlMapSearch,
};
