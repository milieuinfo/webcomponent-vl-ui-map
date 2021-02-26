import {define} from '/node_modules/vl-ui-core/dist/vl-core.js';
import {VlSelect} from '/node_modules/vl-ui-select/dist/vl-select.js';
import LambertCoordinaat from '/src/lambert-coordinaat.js';

/**
 * VlSelectAddress
 * @class
 * @classdesc Component om een adres te selecteren.
 *
 * @extends VlSelect
 *
 * @property {string} [data-vl-placeholder=Lokaliseer adres] - Attribuut bepaalt de placeholder van het zoek adres select element.
 * @property {string} [data-vl-search-placeholder=Zoeken op adres of coördinaat] - Attribuut bepaalt de placeholder van het zoek adres input element.
 * @property {string} [data-vl-search-empty-text=Geen adres gevonden] - Attribuut bepaalt de tekst wanneer er geen zoekresultaten zijn.
 * @property {string} [data-vl-search-no-results-text=Geen adres resultaat] - Attribuut bepaalt de tekst wanneer er geen zoekresultaten meer zijn.
 *
 * @see {@link https://www.github.com/milieuinfo/webcomponent-vl-ui-map/releases/latest|Release notes}
 * @see {@link https://www.github.com/milieuinfo/webcomponent-vl-ui-map/issues|Issues}
 * @see {@link https://webcomponenten.omgeving.vlaanderen.be/demo/vl-map-search.html|Demo}
 */
class VlSelectAddress extends VlSelect {
  static get _observedAttributes() {
    return ['placeholder', 'search-placeholder', 'search-empty-text', 'search-no-results-text'];
  }

  constructor() {
    super();
    this._addSearchEventListener();
    this._addChoiceEventListener();
    this._addPlaceholder();
    this._changeTranslations();
  }

  connectedCallback() {
    this.dress();
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

  get locationXyUrl() {
    return this.url + '/Location?c=5&xy=';
  }

  get location() {
    if (this.value) {
      if (LambertCoordinaat.isLambertCoordinaat(this.value)) {
        return {
          type: 'Point',
          coordinates: [this.value.x, this.value.y],
        };
      } else if (this.value.BoundingBox) {
        return [
          this.value.BoundingBox.LowerLeft.X_Lambert72,
          this.value.BoundingBox.LowerLeft.Y_Lambert72,
          this.value.BoundingBox.UpperRight.X_Lambert72,
          this.value.BoundingBox.UpperRight.Y_Lambert72,
        ];
      } else if (this.value.LocationResult) {
        let value;
        this._searchLocationByValue(value).then((data) => {
          value = [
            this.value.LocationResult[0].BoundingBox.LowerLeft.X_Lambert72,
            this.value.LocationResult[0].BoundingBox.LowerLeft.Y_Lambert72,
            this.value.LocationResult[0].BoundingBox.UpperRight.X_Lambert72,
            this.value.LocationResult[0].BoundingBox.UpperRight.Y_Lambert72,
          ];
        });
      }
    }
  }

  set placeholder(value) {
    this._placeholderElement.innerText = value;
  }

  set searchPlaceholder(value) {
    this._changeTranslation('select.search_placeholder_value', value);
  }

  set searchEmptyText(value) {
    this.setAttribute('data-vl-select-search-empty-text', value);
  }

  set searchNoResultsText(value) {
    this._changeTranslation('select.no_more_options', value);
  }

  get _placeholderElement() {
    return this.querySelector('option[placeholder]');
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
    this.addEventListener('search', (event) => {
      if (event && event.detail && event.detail.value) {
        const lambertCoordinaat = LambertCoordinaat.of(event.detail.value);

        if (LambertCoordinaat.isLambertCoordinaat(lambertCoordinaat)) {
          this._searchChoicesByLambertCoordinaat(lambertCoordinaat);
        } else {
          this._searchChoicesByValue(event.detail.value);
        }
      }
    });
  }

  _searchChoicesByValue(searchValue) {
    fetch(this.searchUrl + encodeURIComponent(searchValue)).then((response) => {
      return response.json();
    }).then((data) => {
      this.choices = this._mapSuggestionResultToChoices(data);
    });
  }

  _mapSuggestionResultToChoices(data) {
    if (data && data.SuggestionResult) {
      return data.SuggestionResult.map((resultaat) => {
        return {
          value: resultaat,
          label: resultaat,
        };
      });
    } else {
      return [];
    }
  }

  _searchChoicesByLambertCoordinaat(lambertCoordinaat) {
    fetch(this.locationXyUrl + lambertCoordinaat.x + ',' + lambertCoordinaat.y).then((response) => {
      return response.json();
    }).then((data) => {
      this.choices = [this._mapLambertCoordinaatToChoice(lambertCoordinaat)].concat(this._mapLocationResultToChoices(data));
    });
  }

  _mapLambertCoordinaatToChoice(lambertCoordinaat) {
    return {
      value: lambertCoordinaat,
      label: 'Lambert-coördinaat: ' + lambertCoordinaat.toString(),
    };
  }

  _mapLocationResultToChoices(data) {
    if (data && data.LocationResult) {
      return data.LocationResult.map((locationResult) => {
        return {
          value: locationResult,
          label: locationResult.FormattedAddress,
        };
      });
    } else {
      return [];
    }
  }

  _addChoiceEventListener() {
    this.addEventListener('choice', () => this.dispatchEvent(new Event('change')));
  }

  _searchLocationByValue(searchValue) {
    return fetch(this.locationUrl + encodeURIComponent(searchValue)).then((response) => {
      return response.json();
    });
  }

  _addPlaceholder() {
    this.insertAdjacentHTML('afterbegin', `<option placeholder></option>`);
  }

  _changeTranslations() {
    this.placeholder = 'Lokaliseer adres';
    this.searchPlaceholder = 'Zoeken op adres of coördinaat';
    this.searchEmptyText = 'Geen adres gevonden';
    this.searchNoResultsText = 'Geen adres gevonden';
  }
}

export {
  LambertCoordinaat,
  VlSelectAddress,
};

define('vl-select-address', VlSelectAddress, {extends: 'select'});
