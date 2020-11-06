import {VlSideSheet} from '/node_modules/vl-ui-side-sheet/dist/vl-side-sheet.js';

/**
 * VlMapSideSheet
 * @class
 * @classdesc Het map zijpaneel.
 *
 * @extends VlSideSheet
 *
 * @see {@link https://www.github.com/milieuinfo/webcomponent-vl-ui-map/releases/latest|Release notes}
 * @see {@link https://www.github.com/milieuinfo/webcomponent-vl-ui-map/issues|Issues}
 * @see {@link https://webcomponenten.omgeving.vlaanderen.be/demo/vl-map-overview-map.html|Demo}
 */
export class VlMapSideSheet extends VlSideSheet {
  constructor() {
    super(`
      :host {
        width: 0px;
        transition: width 0.1s;
      }

      .vl-side-sheet__toggle {
        margin: 10px;
      }

      :host([data-vl-open]) .vl-side-sheet__toggle {
        margin-left: 0px;
      }

      ::slotted(*) {
        margin-bottom: 20px;
      }
    `);
  }

  connectedCallback() {
    super.connectedCallback();
    this._render();
  }

  _render() {
    this.setAttribute('data-vl-left', '');
    this.setAttribute('data-vl-absolute', '');
  }
}
