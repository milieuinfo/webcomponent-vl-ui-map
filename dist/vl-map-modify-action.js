import {VlMapLayerAction} from '/node_modules/vl-ui-map/dist/vl-map-layer-action.js';
import {VlModifyAction} from '/node_modules/vl-mapactions/dist/vl-mapactions.js';

/**
 * VlMapModifyAction
 * @class
 * @classdesc De kaart aanpas actie component.
 *
 * @extends VlMapLayerAction
 *
 * @see {@link https://www.github.com/milieuinfo/webcomponent-vl-ui-map/releases/latest|Release notes}
 * @see {@link https://www.github.com/milieuinfo/webcomponent-vl-ui-map/issues|Issues}
 * @see {@link https://webcomponenten.omgeving.vlaanderen.be/demo/vl-map-modify-actions.html|Demo}
 */
export class VlMapModifyAction extends VlMapLayerAction {
  /**
   * Zet de functie die wordt uitgevoerd na het uitvoeren van de aanpas actie
   *
   * @param {Function} callback functie met volgende argumenten:
   *                            - {ol.Feature} de aangepaste feature
   *                            - {Function} reject callback met argument de aangepaste feature waarbij de feature terug op zijn oorspronkelijke staat wordt gezet
   */
  onModify(callback) {
    this.__callback = callback;
  }

  _createAction(layer) {
    const options = {
      snapping: true,
    };
    return new VlModifyAction(layer, this._callback, options);
  }
}
