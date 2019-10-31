import {VlElement} from '/node_modules/vl-ui-core/vl-core.js';
import '/node_modules/vl-ui-select/vl-select.js';

/**
 * VlMapSearch
 * @class
 * @classdesc De kaart zoek op adres component.
 *
 * @extends VlElement
 *
 * @see {@link https://www.github.com/milieuinfo/webcomponent-vl-ui-map/releases/latest|Release notes}
 * @see {@link https://www.github.com/milieuinfo/webcomponent-vl-ui-map/issues|Issues}
 * @see {@link https://webcomponenten.omgeving.vlaanderen.be/demo/vl-map-search.html|Demo}
 */
export class VlMapSearch extends VlElement(HTMLElement) {
  constructor() {
    super(`
            <style>
                @import '/node_modules/vl-ui-select/style.css';
            </style>
            <select is="vl-select" data-vl-select data-vl-select-search-empty-text="Geen adres gevonden"></select>
        `);
    this._configure();
  }

  connectedCallback() {
    this._addSearchEventListener();
    this._addChoiceEventListener();
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

  get _selectElement() {
    return this._shadow.querySelector('select');
  }

  get _parentElement() {
    if (this.parentNode) {
      return this.parentNode.host;
    }
  }

  bindMap(map) {
    this._map = map;
  }

  _addSearchEventListener() {
    if (!this.__searchEventListenerRegistered) {
      this.__searchEventListenerRegistered = true;
      this._selectElement.addEventListener('search', (event) => {
        if (event && event.detail && event.detail.value) {
          fetch(this.searchUrl + event.detail.value)
          .then((response) => {
            return response.json();
          }).then((data) => {
            if (data && data.SuggestionResult) {
              const resultaten = data.SuggestionResult.map((resultaat) => {
                return {
                  value: resultaat,
                  label: resultaat
                }
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
      this.__choiceEventListener = this._selectElement.addEventListener(
          'choice', (event) => {
            if (event && event.detail && event.detail.choice) {
              fetch(this.locationUrl + event.detail.choice.value)
              .then((response) => {
                return response.json();
              }).then((data) => {
                if (data && data.LocationResult) {
                  if (this._onSelect) {
                    this._onSelect(data);
                  }
                  this._map.zoomTo(
                      [data.LocationResult[0].BoundingBox.LowerLeft.X_Lambert72,
                        data.LocationResult[0].BoundingBox.LowerLeft.Y_Lambert72,
                        data.LocationResult[0].BoundingBox.UpperRight.X_Lambert72,
                        data.LocationResult[0].BoundingBox.UpperRight.Y_Lambert72]);
                }
              });
            }
          });
    }
  }

  onSelect(callback) {
    this._onSelect = callback;
  }

  _configure() {
    customElements.whenDefined('vl-map').then(() => {
      if (this.parentNode && this.parentNode.map && (this.parentNode.tagName
          === 'VL-MAP' || this.parentNode.host.tagName === 'VL-MAP')) {
        this.parentNode._shadow.prepend(this);
        this.parentNode.host.style.setProperty('--vl-map--margin-top', "35px");
        this._map = this._parentElement;
      }
    });
  }
}
