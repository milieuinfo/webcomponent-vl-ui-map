import {define} from '/node_modules/vl-ui-core/dist/vl-core.js';
import {VlMapDrawAction} from '/src/vl-map-draw-action.js';
import {VlDrawAction, OlGeometryType} from '/node_modules/vl-mapactions/dist/vl-mapactions.js';

/**
 * VlMapDrawPointAction
 * @class
 * @classdesc De kaart teken actie component.
 *
 * @extends VlMapDrawAction
 *
 * @property {string} [data-vl-snapping] - Attribuut wordt gebruikt om aan te geven dat er bij het tekenen snapping mag gebeuren, hetzij op de laag waarop getekend wordt (indien geen vl-map-wfs-layer(s) als child elementen), hetzij op de meegegeven vl-map-wfs-layers.
 * @property {number} [data-vl-snapping-pixel-tolerance=10] - Attribuut om aan te geven binnen de hoeveel pixel van een feature er gesnapped mag worden.
 *
 * @see {@link https://www.github.com/milieuinfo/webcomponent-vl-ui-map/releases/latest|Release notes}
 * @see {@link https://www.github.com/milieuinfo/webcomponent-vl-ui-map/issues|Issues}
 * @see {@link https://webcomponenten.omgeving.vlaanderen.be/demo/vl-map-draw-actions.html|Demo}
 */
export class VlMapDrawPointAction extends VlMapDrawAction {
  _createAction(layer) {
    return new VlDrawAction(layer, OlGeometryType.POINT, this._callback, this.__drawOptions);
  }
}

define('vl-map-draw-point-action', VlMapDrawPointAction);
