import {VlMapLayerAction} from '/src/vl-map-layer-action.js';
import {VlDeleteAction} from '/node_modules/vl-mapactions/dist/vl-mapactions.js';
import {VlMapLayerStyle} from '/src/vl-map-layer-style.js';


/**
 * VlMapDeleteAction
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
  /**
   * Geeft de stijl die een geselecteerd feature zal krijgen.
   *
   * @return {Object} de stijl
   */
  get style() {
    return this._style;
  }

  /**
   * Zet de stijl die een geselecteerde feature zal krijgen.
   *
   * @param {VlMapLayerStyle|Object} style - de stijl: een VlMapLayerStyle of een OpenLayers Style
   */
  set style(style) {
    if (style instanceof VlMapLayerStyle) {
      this._style = style.style;
    } else {
      this._style = style;
    }
  }

  /**
   * Zet de functie die wordt uitgevoerd na het uitvoeren van de verwijder actie.
   * Voor elke geselecteerde feature wordt de reject callback gebruikt om de feature te verwijderen of de reject callback zodat de feature niet verwijderd wordt.
   *
   * @param {Function} callback functie met volgende argumenten:
   *                            - {[ol.Feature]} de te verwijderen features
   *                            - {Function} resolve callback met ol.Feature als argument die verwijderd wordt
   *                            - {Function} reject callback zonder argument waarbij de highlight verwijderd wordt
   */
  onDelete(callback) {
    this.__callback = callback;
  }

  get _callback() {
    return (features, resolve, reject) => {
      if (this.__callback) {
        return this.__callback(features, resolve, reject);
      } else {
        features.forEach((feature) => resolve(feature));
      }
    };
  }

  _createAction(layer) {
    const options = {
      style: this._style,
    };
    return new VlDeleteAction(layer, this._callback, options);
  }
}
