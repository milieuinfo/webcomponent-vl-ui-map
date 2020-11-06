import {VlMapAction} from './vl-map-action.js';
import {VlDrawAction, OlGeometryType} from '/node_modules/vl-mapactions/dist/vl-mapactions.js';

/**
 * VlMapDrawAction
 * @class
 * @classdesc De kaart teken actie component.
 *
 * @extends VlMapAction
 *
 * @see {@link https://www.github.com/milieuinfo/webcomponent-vl-ui-map/releases/latest|Release notes}
 * @see {@link https://www.github.com/milieuinfo/webcomponent-vl-ui-map/issues|Issues}
 * @see {@link https://webcomponenten.omgeving.vlaanderen.be/demo/vl-map-draw-action.html|Demo}
 */
export class VlMapDrawAction extends VlMapAction {
  _createAction(layer) {
    return new VlDrawAction(layer, OlGeometryType.POINT, this._callback);
  }
}
