import {vlElement} from '/node_modules/vl-ui-core/dist/vl-core.js';
import '/node_modules/vl-ui-select/dist/vl-select.js';
import '/node_modules/vl-ui-search/dist/vl-search.js';
import {OlOverlay} from '/node_modules/vl-mapactions/dist/vl-mapactions.js';

/**
 * VlMapSearch
 * @class
 * @classdesc De kaart zoek op adres component.
 *
 * @extends HTMLElement
 * @mixes vlElement
 *
 * @property {string} [data-vl-placeholder=Lokaliseer adres] - Attribuut bepaalt de placeholder van het zoek adres select element.
 * @property {string} [data-vl-search-placeholder=Zoek gemeente, straat en huisnummer] - Attribuut bepaalt de placeholder van het zoek adres input element.
 * @property {string} [data-vl-search-empty-text=Geen adres gevonden] - Attribuut bepaalt de tekst wanneer er geen zoekresultaten zijn.
 * @property {string} [data-vl-search-no-results-text=Geen adres resultaat] - Attribuut bepaalt de tekst wanneer er geen zoekresultaten meer zijn.
 *
 * @see {@link https://www.github.com/milieuinfo/webcomponent-vl-ui-map/releases/latest|Release notes}
 * @see {@link https://www.github.com/milieuinfo/webcomponent-vl-ui-map/issues|Issues}
 * @see {@link https://webcomponenten.omgeving.vlaanderen.be/demo/vl-map-search.html|Demo}
 */
export class VlMapSearch extends vlElement(HTMLElement) {
  static get _observedAttributes() {
    return ['placeholder', 'search-placeholder', 'search-empty-text', 'search-no-results-text'];
  }

  constructor() {
    super(`
      <style>
        @import '/node_modules/vl-ui-select/dist/style.css';
        @import '/node_modules/vl-ui-search/dist/style.css';
      </style>
      <vl-search id="search" data-vl-inline>
        <select is="vl-select" data-vl-select data-vl-block slot="input">
          <option placeholder></option>
        </select>
      </vl-search>
    `);
    this._configure();
    this._addSearchEventListener();
    this._addChoiceEventListener();
    this._changeTranslations();
  }

  get url() {
    return 'https://loc.geopunt.be/v4';
  }

  get searchUrl() {
    return this.url + '/Suggestion?q=';
  }

  get locationUrl() {
    return this.url + '/Location?q=';
  }

  set placeholder(value) {
    this._placeholderElement.innerText = value;
  }

  set searchPlaceholder(value) {
    this._changeTranslation('select.search_placeholder_value', value);
  }

  set searchEmptyText(value) {
    this._selectElement.setAttribute('data-vl-select-search-empty-text', value);
  }

  set searchNoResultsText(value) {
    this._changeTranslation('select.no_more_options', value);
  }

  get _selectElement() {
    return this._shadow.querySelector('select');
  }

  get _parentElement() {
    if (this.parentNode) {
      return this.parentNode.host;
    }
  }

  get _placeholderElement() {
    return this._selectElement.querySelector('option[placeholder]');
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

  _placeholderChangedCallback(oldValue, newValue) {
    this.placeholder = newValue;
  }

  _searchPlaceholderChangedCallback(oldValue, newValue) {
    this.searchPlaceholder = newValue;
  }

  _searchEmptyTextChangedCallback(oldValue, newValue) {
    this.searchEmptyText = newValue;
  }

  _searchNoResultsTextChangedCallback(oldValue, newValue) {
    this.searchNoResultsText = newValue;
  }

  _addSearchEventListener() {
    if (!this.__searchEventListenerRegistered) {
      this.__searchEventListenerRegistered = true;
      this._selectElement.addEventListener('search', (event) => {
        if (event && event.detail && event.detail.value) {
          fetch(this.searchUrl + event.detail.value).then((response) => {
            return response.json();
          }).then((data) => {
            if (data && data.SuggestionResult) {
              const resultaten = data.SuggestionResult.map((resultaat) => {
                return {
                  value: resultaat,
                  label: resultaat,
                };
              });
              this._selectElement.choices = resultaten;
            }
          });
        }
      });
    }
  }

  _addChoiceEventListener() {
    if (!this.__choiceEventListenerRegistered) {
      this.__choiceEventListenerRegistered = true;
      this.__choiceEventListener = this._selectElement.addEventListener('choice', (event) => {
        if (event && event.detail && event.detail.choice) {
          fetch(this.locationUrl + event.detail.choice.value).then((response) => {
            return response.json();
          }).then((data) => {
            if (data && data.LocationResult) {
              if (this._onSelect) {
                this._onSelect(data);
              } else if (this._map) {
                this._map.zoomTo([
                  data.LocationResult[0].BoundingBox.LowerLeft.X_Lambert72,
                  data.LocationResult[0].BoundingBox.LowerLeft.Y_Lambert72,
                  data.LocationResult[0].BoundingBox.UpperRight.X_Lambert72,
                  data.LocationResult[0].BoundingBox.UpperRight.Y_Lambert72,
                ]);
              }
            }
          });
        }
      });
    }
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

  _changeTranslations() {
    this.placeholder = 'Lokaliseer adres';
    this.searchPlaceholder = 'Gemeente, straat en huisnummer';
    this.searchEmptyText = 'Geen adres gevonden';
    this.searchNoResultsText = 'Geen adres gevonden';
  }
}
