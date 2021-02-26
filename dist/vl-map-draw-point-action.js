import {VlMapDrawAction} from '/node_modules/vl-ui-map/dist/vl-map-draw-action.js';
import {VlDrawAction, OlGeometryType} from '/node_modules/vl-mapactions/dist/vl-mapactions.js';

/**
 * VlMapDrawPointAction
 * @class
 * @classdesc De kaart teken actie component.
 *
 * @extends VlMapDrawAction
 *
 * @see {@link https://www.github.com/milieuinfo/webcomponent-vl-ui-map/releases/latest|Release notes}
 * @see {@link https://www.github.com/milieuinfo/webcomponent-vl-ui-map/issues|Issues}
 * @see {@link https://webcomponenten.omgeving.vlaanderen.be/demo/vl-map-draw-actions.html|Demo}
 */
export class VlMapDrawPointAction extends VlMapDrawAction {
  _createAction(layer) {
    return new VlDrawAction(layer, OlGeometryType.POINT, this._callback);
  }
}
