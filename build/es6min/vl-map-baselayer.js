import {vlElement} from '/node_modules/vl-ui-core/vl-core.js'; export class VlMapBaseLayer extends (vlElement(HTMLElement)) {
  connectedCallback() {
    this._configureMap();
  } get type() {
    return this.getAttribute('type')||'wmts';
  } get url() {
    return this.getAttribute('url');
  } get layer() {
    return this.getAttribute('layer');
  } get title() {
    return this.getAttribute('title');
  } get _map() {
    if (this.parentNode) return this.parentNode.map;
  } get _projection() {
    if (this.parentNode) return this.parentNode._projection;
  } get _WMTSSource() {
    return this._wmtsSource=this._wmtsSource||this._createWMTSSource(), this._wmtsSource;
  } get _vectorSource() {
    return this._createdVectorSource=this._createdVectorSource||this._createVectorSource(), this._createdVectorSource;
  }_configureMap() {
    this._map&&this._map.addBaseLayerAndOverlayMapLayer(this._createBaseLayer(), this._createBaseLayer());
  }_createWMTSSource() {
    const e=ol.extent.getWidth(this._projection.getExtent())/256; const t=new Array(16); const r=new Array(16); for (let o=0; o<16; ++o)t[o]=e/Math.pow(2, o), r[o]=o; return new ol.source.WMTS({url: this.url, layer: this.layer, matrixSet: 'BPL72VL', format: 'image/png', projection: this._projection, tileGrid: new ol.tilegrid.WMTS({extent: this._projection.getExtent(), origin: ol.extent.getTopLeft(this._projection.getExtent()), resolutions: t, matrixIds: r}), style: ''});
  }_createVectorSource() {
    const e=this; return new ol.source.Vector({format: new ol.format.GeoJSON({defaultDataProjection: e._projection}), url: function() {
      return e.url+'&typeName='+e.layer;
    }, strategy: ol.loadingstrategy.bbox});
  }_createBaseLayer() {
    switch (this.type) {
      case 'wmts': return new ol.layer.Tile({title: this.title, type: 'base', source: this._WMTSSource}); case 'wfs': return new ol.layer.Vector({source: this._vectorSource, style: new ol.style.Style({stroke: new ol.style.Stroke({color: 'rgba(0, 0, 0, 1.0)', width: 1}), fill: new ol.style.Fill({color: 'rgba(255, 0, 0, 1.0)'})})});
    }
  }
}
