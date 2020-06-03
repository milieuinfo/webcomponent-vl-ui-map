import {VlMapAction} from '/node_modules/vl-ui-map/build/es6min/vl-map-action.js'; export class VlMapSelectAction extends VlMapAction {
  constructor() {
    super(), this._onSelect=()=>{
      console.info('er is geen onSelect functie gedefinieerd!');
    };
  } get style() {
    return this._style;
  } set style(t) {
    this._style=t;
  } get _cluster() {
    return this.getAttribute('cluster');
  }mark(t) {
    this._action&&t&&this._action.markFeatureWithId(t, this.layer);
  }removeMarks() {
    this._action&&this._action.demarkAllFeatures();
  }select(t) {
    this._action&&t&&this._action.selectFeature(t);
  }onSelect(t) {
    this._onSelect=t;
  }reset() {
    this._action&&this._action.clearFeatures();
  }_createAction(t) {
    return new acd.ol.action.SelectAction(t, (t)=>{
      this._onSelect(t);
    }, {style: this._style, cluster: null!=this._cluster});
  }
}
