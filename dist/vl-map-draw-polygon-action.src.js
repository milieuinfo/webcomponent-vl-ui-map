import {VlMapLayerAction} from 'vl-ui-map/dist/vl-map-layer-action.src.js';
import {VlDrawPolygonAction} from 'vl-mapactions/dist/vl-mapactions.js';

/**
 * VlMapDrawPolygonAction
 * @class
 * @classdesc De kaart polygoon teken actie component.
 *
 * @extends VlMapLayerAction
 *
 * @see {@link https://www.github.com/milieuinfo/webcomponent-vl-ui-map/releases/latest|Release notes}
 * @see {@link https://www.github.com/milieuinfo/webcomponent-vl-ui-map/issues|Issues}
 * @see {@link https://webcomponenten.omgeving.vlaanderen.be/demo/vl-map-draw-actions.html|Demo}
 */
export class VlMapDrawPolygonAction extends VlMapLayerAction {
  _createAction(layer) {
    return new VlDrawPolygonAction(layer, this._callback);
  }
}

