import {vlElement} from '/node_modules/vl-ui-core/dist/vl-core.js';

export class VlMapPane extends vlElement(HTMLElement) {
  static get _observedAttributes() {
    return ['title', 'href'];
  }

  constructor() {
    super(`
      <style>
        @import '/node_modules/vl-ui-link/dist/style.css';
        .vl-map-pane {
          background: #e8ebee;
          padding: 2rem;
          margin: -2rem;
          margin-bottom: 3rem;
        }
      </style>
      <div class="vl-map-pane">
          <a id="vl-map-pane-link" is="vl-link" href="#">
            <span is="vl-icon" data-vl-icon="arrow-left-fat"
                  data-vl-before></span><span id="title">Terug</span>
          </a>
      </div>
    `);
  }

  get _titleElement() {
    return this._shadow.querySelector('#title');
  }

  _titleChangedCallback(oldValue, newValue) {
    if (newValue) {
      this._titleElement.innerText = newValue;
    }
  }

  get _hrefElement() {
    return this._shadow.querySelector('#vl-map-pane-link');
  }

  _hrefChangedCallback(oldValue, newValue) {
    if (newValue) {
      this._hrefElement.setAttribute('href', newValue);
    }
  }
}
