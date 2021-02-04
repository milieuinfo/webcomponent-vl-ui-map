import {VlMapLayerAction} from '../dist/vl-map-layer-action.src.js';
import {VlDrawAction, OlGeometryType} from 'vl-mapactions/dist/vl-mapactions.js';

/**
 * VlMapDrawPointAction
 * @class
 * @classdesc De kaart teken actie component.
 *
 * @extends VlMapLayerAction
 *
 * @see {@link https://www.github.com/milieuinfo/webcomponent-vl-ui-map/releases/latest|Release notes}
 * @see {@link https://www.github.com/milieuinfo/webcomponent-vl-ui-map/issues|Issues}
 * @see {@link https://webcomponenten.omgeving.vlaanderen.be/demo/vl-map-draw-actions.html|Demo}
 */
export class VlMapDrawPointAction extends VlMapLayerAction {
  _createAction(layer) {
    return new VlDrawAction(layer, OlGeometryType.POINT, this._callback);
  }
}

