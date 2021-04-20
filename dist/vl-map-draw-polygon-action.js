import {define} from '/node_modules/vl-ui-core/dist/vl-core.js';
import {VlMapDrawAction} from '/node_modules/vl-ui-map/dist/vl-map-draw-action.js';
import {VlDrawPolygonAction} from '/node_modules/vl-mapactions/dist/vl-mapactions.js';

/**
 * VlMapDrawPolygonAction
 * @class
 * @classdesc De kaart polygoon teken actie component.
 *
 * @extends VlMapDrawAction
 *
 * @see {@link https://www.github.com/milieuinfo/webcomponent-vl-ui-map/releases/latest|Release notes}
 * @see {@link https://www.github.com/milieuinfo/webcomponent-vl-ui-map/issues|Issues}
 * @see {@link https://webcomponenten.omgeving.vlaanderen.be/demo/vl-map-draw-actions.html|Demo}
 */
export class VlMapDrawPolygonAction extends VlMapDrawAction {
  _createAction(layer) {
    return new VlDrawPolygonAction(layer, this._callback, this.__drawOptions);
  }
}

define('vl-map-draw-polygon-action', VlMapDrawPolygonAction);
