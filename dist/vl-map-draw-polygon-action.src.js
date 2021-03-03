import {define} from 'vl-ui-core';
import {VlMapDrawAction} from '../dist/vl-map-draw-action.src.js';
import {VlDrawPolygonAction} from 'vl-mapactions/dist/vl-mapactions.js';

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
    return new VlDrawPolygonAction(layer, this._callback);
  }
}

define('vl-map-draw-polygon-action', VlMapDrawPolygonAction);

