import {define} from '/node_modules/vl-ui-core/dist/vl-core.js';
import {VlMapDrawAction} from '/src/vl-map-draw-action.js';
import {VlDrawLineAction} from '/node_modules/vl-mapactions/dist/vl-mapactions.js';

/**
 * VlMapDrawLineAction
 * @class
 * @classdesc De kaart lijn teken actie component.
 *
 * @extends VlMapDrawAction
 *
 * @see {@link https://www.github.com/milieuinfo/webcomponent-vl-ui-map/releases/latest|Release notes}
 * @see {@link https://www.github.com/milieuinfo/webcomponent-vl-ui-map/issues|Issues}
 * @see {@link https://webcomponenten.omgeving.vlaanderen.be/demo/vl-map-draw-actions.html|Demo}
 */
export class VlMapDrawLineAction extends VlMapDrawAction {
  _createAction(layer) {
    return new VlDrawLineAction(layer, this._callback, this.__drawOptions);
  }
}

define('vl-map-draw-line-action', VlMapDrawLineAction);
