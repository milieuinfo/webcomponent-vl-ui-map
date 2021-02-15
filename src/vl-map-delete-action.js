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
   * Zet de functie die wordt uitgevoerd na het uitvoeren van de verwijder actie
   *
   * @param onDelete
   */
  onDelete(onDelete) {
    this.__callback = onDelete;
  }

  get _callback() {
    return this.__callback;
  }

  _createAction(layer) {
    const options = {
      style: this._style,
    };
    return new VlDeleteAction(layer, this._callback, options);
  }
}
