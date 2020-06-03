import {VlMapLayerStyle} from '/node_modules/vl-ui-map/build/es6min/vl-map-layer-style.js'; export class VlMapLayerCircleStyle extends VlMapLayerStyle {
  get size() {
    return this.getAttribute('size')||5;
  } get borderColor() {
    return this.getAttribute('border-color')||'rgba(0, 0, 0, 1)';
  } get borderSize() {
    return this.getAttribute('border-size')||1;
  } get clusterTextColor() {
    return this.getAttribute('cluster-text-color')||'#FFF';
  } get clusterColor() {
    return this.getAttribute('cluster-color')||'rgba(0, 0, 0, 0)';
  } get style() {
    return (t, e)=>{
      const r=t&&t.get&&t.get('features')||[]; const l=r.length||1; const o=1==l?1:Math.max(1.5, l.toString().length); const s=l>1?l.toString():''; let i=this.textColor; let n=this.color; let g=this.borderColor; let u=this.borderSize; let a=l>1?this.size*o:this.size; if (this.parentElement&&this.parentElement.cluster) {
        if (this._hasUniqueStyles(r)) {
          let t=r[0].getStyle(); t instanceof Function&&(t=t()); const e=t.getImage(); n=e.getFill().getColor(), g=e.getStroke().getColor(), u=e.getStroke().getWidth(), a=l>1?e.getRadius()*o:e.getRadius();
        } else this._containsStyle(r)&&(n=this.clusterColor, i=this.clusterTextColor);
      } return new ol.style.Style({image: new ol.style.Circle({fill: new ol.style.Fill({color: n}), stroke: new ol.style.Stroke({color: g, width: u}), radius: a}), text: new ol.style.Text({text: s, font: '12px Flanders Art', fill: new ol.style.Fill({color: i}), offsetX: this.textOffsetX, offsetY: this.textOffsetY})});
    };
  }
}
