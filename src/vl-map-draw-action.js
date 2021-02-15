import {VlMapLayerAction} from '/src/vl-map-layer-action.js';

/**
 * VlMapDrawAction
 * @class
 * @classdesc De abstracte kaart teken actie component.
 *
 * @extends VlMapLayerAction
 *
 * @see {@link https://www.github.com/milieuinfo/webcomponent-vl-ui-map/releases/latest|Release notes}
 * @see {@link https://www.github.com/milieuinfo/webcomponent-vl-ui-map/issues|Issues}
 * @see {@link https://webcomponenten.omgeving.vlaanderen.be/demo/vl-map-draw-actions.html|Demo}
 */
export class VlMapDrawAction extends VlMapLayerAction {
  onDraw(callback) {
    this.__callback = callback;
  }
}
