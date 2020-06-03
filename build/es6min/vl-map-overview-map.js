import {vlElement} from '/node_modules/vl-ui-core/vl-core.js'; export class VlMapOverviewMap extends (vlElement(HTMLElement)) {
  connectedCallback() {
    this._configureMap();
  } get _map() {
    if (this.parentNode) return this.parentNode.map;
  }_configureMap() {
    (async ()=>{
      for (;!this._map||!this._map.overviewMapControl;) await new Promise((e)=>setTimeout(e, 100)); this._map.addControl(this._map.overviewMapControl);
    })();
  }
}
