import {vlElement} from '/node_modules/vl-ui-core/vl-core.js'; export class VlMapLayer extends (vlElement(HTMLElement)) {
  static get _observedAttributes() {
    return ['auto-extent', 'features'];
  }constructor() {
    super(), VlMapLayer._counter=0, this.__geoJSON=new ol.format.GeoJSON, this.__counter=++VlMapLayer._counter;
  }connectedCallback() {
    this._layer=this.__createLayer(this._name, this.features), this._configureMap();
  } static get _counter() {
    return this.__counter;
  } static set _counter(t) {
    this.__counter=t;
  } get layer() {
    return this._layer;
  } get source() {
    return this._source;
  } get features() {
    const t=this.getAttribute('features'); return t?this.__geoJSON.readFeatures(t):[];
  } set features(t) {
    this.setAttribute('features', JSON.stringify(t));
  } get style() {
    if (this._layer) return this._layer.getStyle();
  } set style(t) {
    this._style=t, this._layer.setStyle(t);
  } get _name() {
    return this.getAttribute('name')||'kaartlaag';
  } get _autoExtent() {
    return null!=this.getAttribute('auto-extent');
  } get _autoExtentMaxZoom() {
    return this.getAttribute('auto-extent-max-zoom');
  } get _cluster() {
    return null!=this.getAttribute('cluster');
  } get _clusterDistance() {
    return this.getAttribute('cluster-distance');
  } get _map() {
    return this._mapElement.map;
  } get _mapReady() {
    return this._mapElement.ready;
  } get _mapElement() {
    return this.parentNode;
  }verwijderFeatureStijlen() {
    this._source&&this._source.getFeatures()&&this._source.getFeatures().forEach((t)=>{
      t.setStyle(null);
    });
  }rerender() {
    this._map&&this._map.render();
  }getFeature(t) {
    if (this._source&&this._source.getFeatures()) return this._source.getFeatures().filter((e)=>e.getId()===t)[0];
  }getCluster(t) {
    if (this._layer) {
      return this._layer.getSource().getFeatures().filter((e)=>{
        const r=e.get('features'); return !!r&&r.some((e)=>e.getId()===t);
      })[0];
    }
  } async zoomToExtent(t) {
    await this._mapReady, this._map.zoomToExtent(this.__boundingBox, t);
  }_autoExtentChangedCallback() {
    this.__autoZoomToExtent();
  }_featuresChangedCallback(t, e) {
    e&&this._layer&&(this._source.clear(), this._source.addFeatures(this.features), this.__autoZoomToExtent(), this.rerender());
  }__autoZoomToExtent() {
    this._autoExtent&&this.zoomToExtent(this._autoExtentMaxZoom);
  }__createLayer(t, e) {
    const r=new ol.layer.Vector({title: t, source: this.__createSource(e), updateWhileAnimating: !0, updateWhileInteracting: !0}); return r.set('id', this.__counter), r;
  }__createSource(t) {
    return this._source=new ol.source.Vector({features: t}), this._cluster?this.__createClusterSource(this._source):this._source;
  }__createClusterSource(t) {
    return new ol.source.Cluster({distance: this._clusterDistance, source: t, geometryFunction: (t)=>{
      const e=t.getGeometry(); return e instanceof ol.geom.Point?e:this.__negeerClustering();
    }});
  } get __boundingBox() {
    if (this._source&&this._source.getFeatures().length>0) return this._source.getExtent();
  }__negeerClustering() {
    return null;
  }_configureMap() {
    this._map&&(this._map.getOverlayLayers().push(this._layer), this.__autoZoomToExtent());
  }
}
