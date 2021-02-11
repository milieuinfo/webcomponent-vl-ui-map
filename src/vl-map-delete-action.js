import {VlMapLayerAction} from '/src/vl-map-layer-action.js';
import {VlDeleteAction} from '/node_modules/vl-mapactions/dist/vl-mapactions.js';


/**
 * VlMapModifyAction
 * @class
 * @classdesc Actie om features te deleten van een layer
 *
 * @extends VlMapLayerAction
 *
 * @see {@link https://www.github.com/milieuinfo/webcomponent-vl-ui-map/releases/latest|Release notes}
 * @see {@link https://www.github.com/milieuinfo/webcomponent-vl-ui-map/issues|Issues}
 * @see {@link https://webcomponenten.omgeving.vlaanderen.be/demo/vl-map-delete-action.html|Demo}
 */
export class VlMapDeleteAction extends VlMapLayerAction {
  _createAction(layer) {
    const options = {};
    const callback = (features, success, cancel) => {
    	features.forEach(success);
    };
    return new VlDeleteAction(layer, callback, options);
  }
}