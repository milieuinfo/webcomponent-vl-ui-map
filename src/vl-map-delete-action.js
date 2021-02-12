import {VlMapLayerAction} from '/src/vl-map-layer-action.js';
import {VlDeleteAction} from '/node_modules/vl-mapactions/dist/vl-mapactions.js';
import {VlMapLayerStyle} from '/src/vl-map-layer-style.js';


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
   * @param {VlMapLayerStyle|Object} style - de stijl: een VlMapLayerStyle of een OpenLayers StyleLikeF
   */
  set style(style) {
    if (style instanceof VlMapLayerStyle) {
      this._style = style.style;
    } else {
      this._style = style;
    }
  }

  _createAction(layer) {
    const options = {
      style: this._style,
    };
    return new VlDeleteAction(layer, null, options);
  }
}
