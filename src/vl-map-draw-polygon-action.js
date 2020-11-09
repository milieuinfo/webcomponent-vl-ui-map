import {VlMapAction} from './vl-map-action.js';
import {VlDrawPolygonAction} from '/node_modules/vl-mapactions/dist/vl-mapactions.js';

/**
 * VlMapDrawPolygonAction
 * @class
 * @classdesc De kaart polygoon teken actie component.
 *
 * @extends VlMapAction
 *
 * @see {@link https://www.github.com/milieuinfo/webcomponent-vl-ui-map/releases/latest|Release notes}
 * @see {@link https://www.github.com/milieuinfo/webcomponent-vl-ui-map/issues|Issues}
 * @see {@link https://webcomponenten.omgeving.vlaanderen.be/demo/vl-map-draw-actions.html|Demo}
 */
export class VlMapDrawPolygonAction extends VlMapAction {
  _createAction(layer) {
    return new VlDrawPolygonAction(layer, this._callback);
  }
}
