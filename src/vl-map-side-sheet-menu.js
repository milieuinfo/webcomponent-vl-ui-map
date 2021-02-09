import {vlElement} from '/node_modules/vl-ui-core/dist/vl-core.js';

/**
 * VlMapSideSheetMenu
 * @class
 * @classdesc De menu die verbonden is aan een side sheet.
 *
 * @extends VlElement
 *
 * @see {@link https://www.github.com/milieuinfo/webcomponent-vl-ui-map/releases/latest|Release notes}
 * @see {@link https://www.github.com/milieuinfo/webcomponent-vl-ui-map/issues|Issues}
 * @see {@link https://webcomponenten.omgeving.vlaanderen.be/demo/vl-map-side-sheet.html|Demo}
 */
export class VlMapSideSheetMenu extends vlElement(HTMLElement) {
  constructor() {
    super(`
      <style>
        @import '/node_modules/vl-ui-link/dist/style.css';
        :host {
          margin: -1.5rem;
          display: block;
        }
      </style>
      <slot></slot>
    `);
  }
}
