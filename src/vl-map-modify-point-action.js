import {VlMapLayerAction} from '/src/vl-map-layer-action.js';
import {VlModifyAction} from '/node_modules/vl-mapactions/dist/vl-mapactions.js';

// TODO stefanborghys: 8/02/21

/**
 * VlMapModifyPointAction
 * @class
 * @classdesc De kaart aanpas actie component.
 *
 * @extends VlMapLayerAction
 *
 * @see {@link https://www.github.com/milieuinfo/webcomponent-vl-ui-map/releases/latest|Release notes}
 * @see {@link https://www.github.com/milieuinfo/webcomponent-vl-ui-map/issues|Issues}
 * @see {@link https://webcomponenten.omgeving.vlaanderen.be/demo/vl-map-draw-actions.html|Demo}
 */
export class VlMapDrawPointAction extends VlMapLayerAction {
  _createAction(layer) {
    const options = {};
    return new VlModifyAction(layer, this._callback, options);
  }
}
