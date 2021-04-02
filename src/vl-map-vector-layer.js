import {VlMapLayer} from '/src/vl-map-layer.js';
import {VlMapLayerStyle} from '/src/vl-map-layer-style.js';
import {OlVectorLayer} from '/node_modules/vl-mapactions/dist/vl-mapactions.js';

/**
 * VlMapVectorLayer
 * @class
 * @classdesc De abstracte kaart laag klasse voor vectorlagen.
 *
 * @extends VlMapLayer
 *
 * @see {@link https://www.github.com/milieuinfo/webcomponent-vl-ui-map/releases/latest|Release notes}
 * @see {@link https://www.github.com/milieuinfo/webcomponent-vl-ui-map/issues|Issues}
 * @see {@link https://webcomponenten.omgeving.vlaanderen.be/demo/vl-map-features-layer.html|Demo}
 * @see {@link https://webcomponenten.omgeving.vlaanderen.be/demo/vl-map-wfs-layer.html|Demo}
 */
export class VlMapVectorLayer extends VlMapLayer {
  constructor() {
    super();
    this._styles = [];
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

  _createLayer() {
    const layer = new OlVectorLayer({
      title: this._name,
      source: this._source,
      updateWhileAnimating: true,
      updateWhileInteracting: true,
      minResolution: this._minResolution,
      maxResolution: this._maxResolution,
      visible: this._visible,
    });
    layer.set('id', VlMapLayer._counter);
    return layer;
  }
}
