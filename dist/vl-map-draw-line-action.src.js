import {VlMapLayerAction} from 'vl-ui-map/dist/vl-map-layer-action.src.js';
import {VlDrawLineAction} from 'vl-mapactions/dist/vl-mapactions.js';

/**
 * VlMapDrawLineAction
 * @class
 * @classdesc De kaart lijn teken actie component.
 *
 * @extends VlMapLayerAction
 *
 * @see {@link https://www.github.com/milieuinfo/webcomponent-vl-ui-map/releases/latest|Release notes}
 * @see {@link https://www.github.com/milieuinfo/webcomponent-vl-ui-map/issues|Issues}
 * @see {@link https://webcomponenten.omgeving.vlaanderen.be/demo/vl-map-draw-actions.html|Demo}
 */
export class VlMapDrawLineAction extends VlMapLayerAction {
  _createAction(layer) {
    return new VlDrawLineAction(layer, this._callback);
  }
}
