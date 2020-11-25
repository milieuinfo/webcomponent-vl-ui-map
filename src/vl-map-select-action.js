import {VlMapLayerAction} from '/src/vl-map-layer-action.js';
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
   * @return {Object}
   */
  get style() {
    return this._style;
  }

  /**
   * Zet de stijl die een geselecteerd feature zal krijgen.
   *
   * @param {Object} style
   */
  set style(style) {
    this._style = style;
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
