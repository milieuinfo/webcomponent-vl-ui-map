import {vlElement} from '/node_modules/vl-ui-core/dist/vl-core.js';

export class VlMapPane  extends vlElement(HTMLElement) {
  static get _observedAttributes() {
    return ['title'];
  }
  constructor() {
    super(`
      <style>
        @import '/node_modules/vl-ui-link/dist/style.css';
      </style>
      <div id="vl-map-pane" style="background: #e8ebee; padding: 2rem; margin: -2rem; margin-bottom: 3rem;">
          <a is="vl-link" href="#">
            <span is="vl-icon" data-vl-icon="arrow-left-fat"
                  data-vl-before></span><slot id="title" name="title"></slot>
          </a>
      </div>
    `);
  }

  get _titleElement() {
    return this._shadow.querySelector('#title');
  }

  _titleChangedCallback(oldValue, newValue) {
    this._titleElement.innerText = newValue;
  }

}


