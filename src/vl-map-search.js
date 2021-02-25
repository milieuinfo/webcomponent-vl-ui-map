import {vlElement} from '/node_modules/vl-ui-core/dist/vl-core.js';
import '/node_modules/vl-ui-search/dist/vl-search.js';
import {OlOverlay} from '/node_modules/vl-mapactions/dist/vl-mapactions.js';
import LambertCoordinaat from '/src/lambert-coordinaat.js';
import '/src/vl-select-address.js';

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
        <select is="vl-select-address" data-vl-block slot="input"></select>
      </vl-search>
    `);
    this._configure();
    this._addChoiceEventListener();
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

  _addChoiceEventListener() {
    if (!this.__choiceEventListenerRegistered) {
      this.__choiceEventListenerRegistered = true;
      this.__choiceEventListener = this._selectElement.addEventListener('choice', (event) => {
        if (event && event.detail && event.detail.choice) {
          const value = event.detail.choice.value;

          if (LambertCoordinaat.isLambertCoordinaat(value)) {
            this._zoomToLambertCoordinaat(value);
          } else if (value instanceof Object) {
            this._zoomToLocation(value);
          } else {
            this._searchLocationByValue(value).then((data) => this._zoomToLocationResult(data));
          }
        }
      });
    }
  }

  _zoomToLambertCoordinaat(lambertCoordinaat) {
    this._map.zoomTo({
      type: 'Point',
      coordinates: [lambertCoordinaat.x, lambertCoordinaat.y],
    }, 10);
  }

  _zoomToLocation(location) {
    this._map.zoomTo([
      location.BoundingBox.LowerLeft.X_Lambert72,
      location.BoundingBox.LowerLeft.Y_Lambert72,
      location.BoundingBox.UpperRight.X_Lambert72,
      location.BoundingBox.UpperRight.Y_Lambert72,
    ], 14);
  }

  _zoomToLocationResult(data) {
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
  }

  _searchLocationByValue(searchValue) {
    return fetch(this.locationUrl + encodeURIComponent(searchValue)).then((response) => {
      return response.json();
    });
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
}

export {
  LambertCoordinaat,
  VlMapSearch,
};
