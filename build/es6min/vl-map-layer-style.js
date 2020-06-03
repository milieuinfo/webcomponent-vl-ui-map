import {vlElement} from '/node_modules/vl-ui-core/vl-core.js'; export class VlMapLayerStyle extends (vlElement(HTMLElement)) {
  connectedCallback() {
    this._setStyleOnParent();
  } get color() {
    return this.getAttribute('color')||'rgba(255, 255, 255, 1)';
  } get textColor() {
    return this.getAttribute('text-color')||'#FFF';
  } get textOffsetX() {
    return this.getAttribute('text-offset-x')||0;
  } get textOffsetY() {
    return this.getAttribute('text-offset-y')||0;
  } get style() {
    return console.info('opgelet vl-map-layer-style is abstract en zal geen stijl toevoegen aan de kaartlaag'), null;
  }_hasUniqueStyles(t) {
    const e=this._getStyles(t); return e&&this._containsObject(e)&&this._areIdentical(e);
  }_containsStyle(t) {
    return this._containsObject(t.map((t)=>t.getStyle()));
  }_getStyles(t) {
    return t.map((t)=>t.getStyle());
  }_containsObject(t) {
    return t.some((t)=>!!t);
  }_areIdentical(t) {
    return t.every((t, e, r)=>t==r[0]);
  }_setStyleOnParent() {
    if (this.parentElement) return this.parentElement.style=this.style;
  }
}
