import {VlMapLayerStyle} from './vl-map-layer-style.js';

/**
 * VlMapLayerCircleStyle
 * @class
 * @classdesc De kaart laag style klasse voor cirkels.
 *
 * @extends VlMapLayerStyle
 *
 * @property {number} size - Attribuut wordt gebruikt om aan te geven wat de grootte is van de cirkels.
 * @property {string} border-color - Attribuut wordt gebruikt om aan te geven wat de color is van de randen van de cirkels.
 * @property {number} border-size - Attribuut wordt gebruikt om aan te geven wat de grootte is van de randen van de cirkels.
 * @property {string} cluster-text-color - Attribuut wordt gebruikt om aan te geven wat de kleur van de tekst is bij het clusteren van features.
 * @property {string} cluster-color - Attribuut wordt gebruikt om aan te geven wat de kleur is bij het clusteren van features.
 *
 * @see {@link https://www.github.com/milieuinfo/webcomponent-vl-ui-map/releases/latest|Release notes}
 * @see {@link https://www.github.com/milieuinfo/webcomponent-vl-ui-map/issues|Issues}
 * @see {@link https://webcomponenten.omgeving.vlaanderen.be/demo/vl-map-circle-style.html|Demo}
 */
export class VlMapLayerCircleStyle extends VlMapLayerStyle {
  /**
   * Geeft de grootte van de cirkels terug.
   *
   * @Return {number}
   */
  get size() {
    return this.getAttribute('size') || 5;
  }

  /**
   * Geeft de randkleur van de cirkels terug.
   *
   * @Return {string}
   */
  get borderColor() {
    return this.getAttribute('border-color') || 'rgba(0, 0, 0, 1)';
  }

  /**
   * Geeft de size van de rand van de cirkels terug.
   *
   * @Return {number}
   */
  get borderSize() {
    return this.getAttribute('border-size') || 1;
  }

  /**
   * Geeft de kleur van de tekst bij het clusteren van features terug.
   *
   * @Return {string}
   */
  get clusterTextColor() {
    return this.getAttribute('cluster-text-color') || '#FFF';
  }

  /**
   * Geeft de kleur bij het clusteren van features terug.
   *
   * @Return {string}
   */
  get clusterColor() {
    return this.getAttribute('cluster-color') || 'rgba(0, 0, 0, 0)';
  }

  /**
   * Geeft de stijl terug.
   *
   * @Return {string}
   */
  get style() {
    return (feature, resolution) => {
      const features = feature && feature.get ? (feature.get('features') || []) : [];
      const size = features.length || 1;
      const clusterMultiplier = size == 1 ? 1 : Math.max(1.5, size.toString().length);
      const text = size > 1 ? size.toString() : '';
      let textColor = this.textColor;
      let kleur = this.color;
      let randKleur = this.borderColor;
      let randGrootte = this.borderSize;
      let radius = size > 1 ? this.size * clusterMultiplier : this.size;

      if (this.parentElement && this.parentElement.cluster) {
        if (this._hasUniqueStyles(features)) {
          let style = features[0].getStyle();
          if (style instanceof Function) {
            style = style();
          }
          const styleImage = style.getImage();
          kleur = styleImage.getFill().getColor();
          randKleur = styleImage.getStroke().getColor();
          randGrootte = styleImage.getStroke().getWidth();
          radius = size > 1 ? styleImage.getRadius() * clusterMultiplier : styleImage.getRadius();
        } else if (this._containsStyle(features)) {
          kleur = this.clusterColor;
          textColor = this.clusterTextColor;
        } else {
          // default options zijn goed
        }
      }

      return new ol.style.Style({
        image: new ol.style.Circle({
          fill: new ol.style.Fill({
            color: kleur,
          }),
          stroke: new ol.style.Stroke({
            color: randKleur,
            width: randGrootte,
          }),
          radius: radius,
        }),
        text: new ol.style.Text({
          text: text,
          font: '12px Flanders Art',
          fill: new ol.style.Fill({
            color: textColor,
          }),
          offsetX: this.textOffsetX,
          offsetY: this.textOffsetY,
        }),
      });
    };
  }
}
