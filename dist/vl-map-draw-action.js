import {VlMapLayerAction} from '/node_modules/vl-ui-map/dist/vl-map-layer-action.js';

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
  /**
   * Zet de functie die wordt uitgevoerd na het uitvoeren van de teken actie
   *
   * @param {Function} callback functie met volgende argumenten:
   *                            - {ol.Feature} de getekende feature
   *                            - {Function} reject callback zonder argument waarbij de feature terug wordt verwijderd
   */
  onDraw(callback) {
    this.__callback = callback;
  }
}
