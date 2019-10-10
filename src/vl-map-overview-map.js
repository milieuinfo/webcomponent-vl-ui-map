import {VlElement} from "/node_modules/vl-ui-core/vl-core.js";

export class VlMapOverviewMap extends VlElement(HTMLElement) {
  connectedCallback() {
    this._configureMap();
  }

  get _map() {
    if (this.parentNode) {
      return this.parentNode.map;
    }
  }

  _configureMap() {
    (async () => {
      while (!(this._map && this._map.overviewMapControl)) {
        await new Promise(resolve => setTimeout(resolve, 100));
      }
      this._map.addControl(this._map.overviewMapControl);
    })();
  }
}
