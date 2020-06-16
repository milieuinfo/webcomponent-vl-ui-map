class DummyVlMapLayer extends HTMLElement {
  set style(style) {
    this._style = style;
  }

  get style() {
    return this._style;
  }

  set cluster(cluster) {
    this._cluster = cluster;
  }

  get cluster() {
    return this._cluster;
  }
}

customElements.define('dummy-vl-map-layer', DummyVlMapLayer);
