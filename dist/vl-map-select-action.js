import {define} from '/node_modules/vl-ui-core/dist/vl-core.js';
import {VlMapLayerAction} from '/node_modules/vl-ui-map/dist/vl-map-layer-action.js';
import {VlMapLayerStyle} from '/node_modules/vl-ui-map/dist/vl-map-layer-style.js';
import {VlSelectAction} from '/node_modules/vl-mapactions/dist/vl-mapactions.js';

/**
 * VlMapSelectAction
 * @class
 * @classdesc De kaart selecteer actie component.
 *
 * @property {boolean} data-vl-cluster - Attribuut geeft aan of de features geclusterd zijn of niet.
 *
 * @extends VlMapLayerAction
 *
 * @see {@link https://www.github.com/milieuinfo/webcomponent-vl-ui-map/releases/latest|Release notes}
 * @see {@link https://www.github.com/milieuinfo/webcomponent-vl-ui-map/issues|Issues}
 * @see {@link https://webcomponenten.omgeving.vlaanderen.be/demo/vl-map-select-action.html|Demo}
 */
export class VlMapSelectAction extends VlMapLayerAction {
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

  get _cluster() {
    return this.getAttribute('cluster');
  }

  mark(id) {
    if (this._action && id) {
      this._action.markFeatureWithId(id, this.layer);
    }
  }

  removeMarks() {
    if (this._action) {
      this._action.demarkAllFeatures();
    }
  }

  select(feature) {
    if (this.action && feature) {
      this.action.selectFeature(feature);
    }
  }

  onSelect(callback) {
    this.__callback = callback;
  }

  reset() {
    if (this.action) {
      this.action.clearFeatures();
    }
  }

  _createAction(layer) {
    const options = {
      style: this.style,
      cluster: (this._cluster != undefined),
    };
    return new VlSelectAction(layer, this._callback, options);
  }
}

define('vl-map-select-action', VlMapSelectAction);
