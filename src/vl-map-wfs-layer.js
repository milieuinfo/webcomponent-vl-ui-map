import {VlMapLayer} from '/src/vl-map-layer.js';
import {VlMapLayerStyle} from '/src/vl-map-layer-style.js';
import {
  OlVectorSource,
  OlVectorLayer,
  OlLoadingstrategy,
  OlGeoJSON,
} from '/node_modules/vl-mapactions/dist/vl-mapactions.js';

/**
 * VlMapWfsLayer
 * @class
 * @classdesc Deze kaartlaag staat toe om een WFS laag aan te maken.
 *
 * @extends VlMapLayer
 *
 * @property {string} data-vl-name - Attribuut bepaalt de kaartlaag naam.
 * @property {string} data-vl-url - Attribuut bepaalt de WFS url. Verplicht.
 * @property {string} data-vl-layers - Attribuut bepaalt de layers van de WFS. Verplicht.
 *
 * @see {@link https://www.github.com/milieuinfo/webcomponent-vl-ui-map/releases/latest|Release notes}
 * @see {@link https://www.github.com/milieuinfo/webcomponent-vl-ui-map/issues|Issues}
 * @see {@link https://webcomponenten.omgeving.vlaanderen.be/demo/vl-map-wfs-layer.html|Demo}
 */
export class VlMapWfsLayer extends VlMapLayer {
  constructor() {
    super();
    this._styles = [];
    this._source = this.__createSource();
    this._layer = this.__createLayer();
  }

  /**
   * Geeft de OpenLayers kaartlaag stijl.
   *
   * @return {ol.style}
   */
  get style() {
    if (this._layer) {
      return this._layer.getStyle();
    }
  }

  /**
   * Zet de kaartlaag stijl.
   * Indien een VlMapLayerStyle gekozen wordt, wordt die toegevoegd aan de reeds bestaande stijlen.
   * Bij een OpenLayers StyleLike wordt de stijl overschreven.
   * Bij voorkeur wordt een VlMapLayerStyle gekozen.
   *
   * @param {VlMapLayerStyle|object|null} style een VlMapLayerStyle of een OpenLayers StyleLike, of null om de stijl te verwijderen.
   * @deprecated Gebruik van een OpenLayers style als argument wordt afgeraden. Gebruik in de plaats daarvan de VlMapLayerStyle component. In een latere versie zal de mogelijkheid om een OpenLayers style te zetten verdwijnen.
   *
   * @see {@link https://openlayers.org/en/latest/apidoc/module-ol_style_Style.html#~StyleLike|OpenLayers StyleLike}
   */
  set style(style) {
    if (style instanceof VlMapLayerStyle) {
      this._styles.push(style);
      this._layer.setStyle((feature) => {
        return this._styles
            .map((style) => style.style(feature))
            .filter((style) => style != null);
      });
    } else {
      this._styles = [];
      this._layer.setStyle(style);
    }
  }

  get _url() {
    const url = this.getAttribute('url');
    if (!url) {
      throw new Error('URL not defined');
    }
    return new URL(url);
  }

  get _layers() {
    const layers = this.getAttribute('layers');
    if (!layers) {
      throw new Error('Layers not defined');
    }
    return layers;
  }

  __createLayer() {
    const layer = new OlVectorLayer({
      title: this._name,
      source: this._source,
      minResolution: this._minResolution,
      maxResolution: this._maxResolution,
    });
    layer.set('id', VlMapLayer._counter);
    return layer;
  }

  __createSource() {
    return new OlVectorSource({
      format: this.__sourceFormat,
      strategy: this.__loadingStrategy,
      url: this.__getWfsUrl.bind(this),
    });
  }

  __getWfsUrl(extent, resolution, projection) {
    const url = this._url;
    const searchParams = url.searchParams;
    searchParams.set('request', 'GetFeature');
    searchParams.set('typename', this._layers);
    searchParams.set('bbox', extent.join(','));
    searchParams.set('srsname', projection.getCode());
    searchParams.set('outputFormat', this.__wfsOutputFormat);
    return url;
  }

  get __loadingStrategy() {
    return OlLoadingstrategy.bbox;
  }

  get __sourceFormat() {
    return new OlGeoJSON();
  }

  get __wfsOutputFormat() {
    return 'application/json';
  }
}
