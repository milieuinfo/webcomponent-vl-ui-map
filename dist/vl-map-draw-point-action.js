<<<<<<< HEAD
import {VlMapAction} from './vl-map-action.js';
=======
import {VlMapLayerAction} from './vl-map-layer-action.js';
>>>>>>> c32155f8f92e9c9c2d8a9d305968239e2c6cd34e
import {VlDrawAction, OlGeometryType} from '/node_modules/vl-mapactions/dist/vl-mapactions.js';

/**
 * VlMapDrawPointAction
 * @class
 * @classdesc De kaart teken actie component.
 *
<<<<<<< HEAD
 * @extends VlMapAction
=======
 * @extends VlMapLayerAction
>>>>>>> c32155f8f92e9c9c2d8a9d305968239e2c6cd34e
 *
 * @see {@link https://www.github.com/milieuinfo/webcomponent-vl-ui-map/releases/latest|Release notes}
 * @see {@link https://www.github.com/milieuinfo/webcomponent-vl-ui-map/issues|Issues}
 * @see {@link https://webcomponenten.omgeving.vlaanderen.be/demo/vl-map-draw-actions.html|Demo}
 */
<<<<<<< HEAD
export class VlMapDrawPointAction extends VlMapAction {
=======
export class VlMapDrawPointAction extends VlMapLayerAction {
>>>>>>> c32155f8f92e9c9c2d8a9d305968239e2c6cd34e
  _createAction(layer) {
    return new VlDrawAction(layer, OlGeometryType.POINT, this._callback);
  }
}
