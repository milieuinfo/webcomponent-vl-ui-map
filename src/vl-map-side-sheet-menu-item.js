import {vlElement} from '/node_modules/vl-ui-core/dist/vl-core.js';


/**
 * VlMapSideSheetMenuItem
 * @class
 * @classdesc De menu item die verbonden is aan een side sheet.
 *
 * @extends VlElement
 *
 * @property {string} data-vl-title - Attribuut wordt gebruikt als titel van een menu item.
 * @property {string} data-vl-href - Attribuut wordt gebruikt om via het href attribuut de link te koppelen aan een menu item.
 *
 * @see {@link https://www.github.com/milieuinfo/webcomponent-vl-ui-map/releases/latest|Release notes}
 * @see {@link https://www.github.com/milieuinfo/webcomponent-vl-ui-map/issues|Issues}
 * @see {@link https://webcomponenten.omgeving.vlaanderen.be/demo/vl-map-side-sheet.html|Demo}
 */
export class VlMapSideSheetMenuItem extends vlElement(HTMLElement) {
  static get _observedAttributes() {
    return ['title', 'href'];
  }

  constructor() {
    super(`
      <style>
        @import '/node_modules/vl-ui-link/dist/style.css';
        .vl-map-side-sheet-menu-item {
          background: #e8ebee;
          padding: 2rem;
          margin: -2rem;
          margin-bottom: 3rem;
        }
      </style>
      <div class="vl-map-side-sheet-menu-item">
          <a id="vl-map-side-sheet-menu-item-link" is="vl-link" href="#">
            <span is="vl-icon" data-vl-icon="arrow-left-fat"
                  data-vl-before></span><span id="title">Terug</span>
          </a>
      </div>
    `);
  }

  get _titleElement() {
    return this._shadow.querySelector('#title');
  }

  get _hrefElement() {
    return this._shadow.querySelector('#vl-map-side-sheet-menu-item-link');
  }

  _titleChangedCallback(oldValue, newValue) {
    if (newValue) {
      this._titleElement.innerText = newValue;
    }
  }

  _hrefChangedCallback(oldValue, newValue) {
    if (newValue) {
      this._hrefElement.setAttribute('href', newValue);
    }
  }
}
