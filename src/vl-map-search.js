import {vlElement, define} from '/node_modules/vl-ui-core/dist/vl-core.js';
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
 * @property {string} [data-vl-placeholder=Lokaliseer adres] - Attribuut bepaalt de placeholder van het zoek adres select element.
 * @property {string} [data-vl-search-placeholder=Zoeken op adres of coördinaat] - Attribuut bepaalt de placeholder van het zoek adres input element.
 * @property {string} [data-vl-search-empty-text=Geen adres gevonden] - Attribuut bepaalt de tekst wanneer er geen zoekresultaten zijn.
 * @property {string} [data-vl-search-no-results-text=Geen adres gevonden] - Attribuut bepaalt de tekst wanneer er geen zoekresultaten meer zijn.
 *
 * @see {@link https://www.github.com/milieuinfo/webcomponent-vl-ui-map/releases/latest|Release notes}
 * @see {@link https://www.github.com/milieuinfo/webcomponent-vl-ui-map/issues|Issues}
 * @see {@link https://webcomponenten.omgeving.vlaanderen.be/demo/vl-map-search.html|Demo}
 */
class VlMapSearch extends vlElement(HTMLElement) {
  static get _observedAttributes() {
    return ['placeholder', 'search-placeholder', 'search-empty-text', 'search-no-results-text'];
  }

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
    this._map.zoomTo(boundingBox, 14);
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
      if (e.target.location) {
        e.target.location.then((location) => {
          if (this._onSelect) {
            this._onSelect(location);
          } else {
            this._zoomTo(location);
          }
        });
      }
    });
  }

  _placeholderChangedCallback(oldValue, newValue) {
    this._dispatchSelectAttribute('placeholder', newValue);
  }

  _searchPlaceholderChangedCallback(oldValue, newValue) {
    this._dispatchSelectAttribute('search-placeholder', newValue);
  }

  _searchEmptyTextChangedCallback(oldValue, newValue) {
    this._dispatchSelectAttribute('search-empty-text', newValue);
  }

  _searchNoResultsTextChangedCallback(oldValue, newValue) {
    this._dispatchSelectAttribute('search-no-results-text', newValue);
  }

  _dispatchSelectAttribute(attribute, value) {
    if (value != undefined) {
      this._selectElement.setAttribute(`${VlMapSearch.attributePrefix}${attribute}`, value);
    } else {
      this._selectElement.removeAttribute(`${VlMapSearch.attributePrefix}${attribute}`);
    }
  }
}

export {
  LambertCoordinaat,
  VlMapSearch,
};

define('vl-map-search', VlMapSearch);
