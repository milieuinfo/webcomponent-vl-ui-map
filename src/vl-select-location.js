import {define} from '/node_modules/vl-ui-core/dist/vl-core.js';
import {VlSelect} from '/node_modules/vl-ui-select/dist/vl-select.js';
import LambertCoordinaat from '/src/lambert-coordinaat.js';

/**
 * VlSelectLocation
 * @class
 * @classdesc Component om een locatie te zoeken en selecteren.
 *
 * @extends VlSelect
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
class VlSelectLocation extends VlSelect {
  static get _observedAttributes() {
    return ['placeholder', 'search-placeholder', 'search-empty-text', 'search-no-results-text'];
  }

  constructor() {
    super();
    this.setAttribute('data-vl-select', '');
    this._addSearchEventListener();
    this._addChoiceEventListener();
    this._addPlaceholder();
    this._changeTranslations();
  }

  /**
   * Geeft de bounding box op basis van de geselecteerde locatie.
   *
   * @return {Promise}
   */
  get location() {
    const value = this._choices?.getValue()?.value;
    if (value) {
      if (value.BoundingBox) {
        return Promise.resolve([
          value.BoundingBox.LowerLeft.X_Lambert72,
          value.BoundingBox.LowerLeft.Y_Lambert72,
          value.BoundingBox.UpperRight.X_Lambert72,
          value.BoundingBox.UpperRight.Y_Lambert72,
        ]);
      } else if (LambertCoordinaat.isLambertCoordinaat(value)) {
        return Promise.resolve([
          value.x - 1,
          value.y - 1,
          value.x + 1,
          value.y + 1,
        ]);
      } else {
        return fetch(this._locationUrl + encodeURIComponent(value)).then((response) => {
          return response.json();
        }).then((location) => {
          return [
            location.LocationResult[0].BoundingBox.LowerLeft.X_Lambert72,
            location.LocationResult[0].BoundingBox.LowerLeft.Y_Lambert72,
            location.LocationResult[0].BoundingBox.UpperRight.X_Lambert72,
            location.LocationResult[0].BoundingBox.UpperRight.Y_Lambert72,
          ];
        });
      }
    }
  }

  set placeholder(value) {
    this._placeholderElement.innerText = value;
  }

  set searchEmptyText(value) {
    this.setAttribute('data-vl-select-search-empty-text', value);
  }

  set searchNoResultsText(value) {
    this._changeTranslation('select.no_more_options', value);
  }

  get _url() {
    return 'https://loc.geopunt.be/v4';
  }

  get _searchUrl() {
    return this._url + '/Suggestion?q=';
  }

  get _locationUrl() {
    return this._url + '/Location?q=';
  }

  get _locationXyUrl() {
    return this._url + '/Location?c=5&xy=';
  }

  get _placeholderElement() {
    return this.querySelector('option[placeholder]');
  }

  _placeholderChangedCallback(oldValue, newValue) {
    this.placeholder = newValue;
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
    fetch(this._searchUrl + encodeURIComponent(searchValue)).then((response) => {
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
    fetch(this._locationXyUrl + lambertCoordinaat.x + ',' + lambertCoordinaat.y).then((response) => {
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
    this.addEventListener('choice', () => setTimeout(() => this.dispatchEvent(new Event('change'))));
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
  VlSelectLocation,
};

define('vl-select-location', VlSelectLocation, {extends: 'select'});
