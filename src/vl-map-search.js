import {vlElement} from '/node_modules/vl-ui-core/dist/vl-core.js';
import '/node_modules/vl-ui-select/dist/vl-select.js';
import '/node_modules/vl-ui-search/dist/vl-search.js';

/**
 * VlMapSearch
 * @class
 * @classdesc De kaart zoek op adres component.
 *
 * @extends vlElement
 *
 * @see {@link https://www.github.com/milieuinfo/webcomponent-vl-ui-map/releases/latest|Release notes}
 * @see {@link https://www.github.com/milieuinfo/webcomponent-vl-ui-map/issues|Issues}
 * @see {@link https://webcomponenten.omgeving.vlaanderen.be/demo/vl-map-search.html|Demo}
 */
export class VlMapSearch extends vlElement(HTMLElement) {
  constructor() {
    super(`
      <style>
        @import '/node_modules/vl-ui-select/dist/style.css';
        @import '/node_modules/vl-ui-search/dist/style.css';
        @import '/src/style.css';
      </style>
      <vl-search id="search" data-vl-inline>
        <select is="vl-select" data-vl-select block data-vl-select-search-empty-text="Geen adres gevonden" slot="input"></select>
      </vl-search>
    `);
    this._configure();
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
              if (this._map) {
                this._map.zoomTo(
                    [data.LocationResult[0].BoundingBox.LowerLeft.X_Lambert72,
                      data.LocationResult[0].BoundingBox.LowerLeft.Y_Lambert72,
                      data.LocationResult[0].BoundingBox.UpperRight.X_Lambert72,
                      data.LocationResult[0].BoundingBox.UpperRight.Y_Lambert72]);
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
        this.parentNode._shadow.host.style.setProperty('--vl-map--margin-top', '45px');
        this.parentNode.overlayContainerElement.prepend(this);
        this._map = this._parentElement;
      }
    });
  }
}
