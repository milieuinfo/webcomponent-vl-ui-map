import {define} from '/node_modules/vl-ui-core/dist/vl-core.js';
import {VlMapLayerStyle} from '/src/vl-map-layer-style.js';
import {
  OlStyle,
  OlStyleCircle,
  OlStyleStroke,
  OlStyleFill,
} from '/node_modules/vl-mapactions/dist/vl-mapactions.js';

/**
 * VlMapLayerCircleStyle
 * @class
 * @classdesc De kaart laag style klasse voor cirkels.
 *
 * @extends VlMapLayerStyle
 *
 * @property {number} data-vl-size - Attribuut wordt gebruikt om aan te geven wat de grootte is van de cirkels.
 * @property {string} data-vl-border-color - Attribuut wordt gebruikt om aan te geven wat de color is van de randen van de cirkels.
 * @property {number} data-vl-border-size - Attribuut wordt gebruikt om aan te geven wat de grootte is van de randen van de cirkels.
 * @property {string} data-vl-cluster-text-color - Attribuut wordt gebruikt om aan te geven wat de kleur van de tekst is bij het clusteren van features.
 * @property {string} data-vl-cluster-color - Attribuut wordt gebruikt om aan te geven wat de kleur is bij het clusteren van features.
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
    return this.getAttribute('border-color') || 'rgba(0, 0, 0, 0)';
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
    return this.getAttribute('cluster-color') || 'rgba(2, 85, 204, 1)';
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
      let textColor = this.textColor;
      let color = this.color;
      let borderColor = this.borderColor;
      let borderSize = this.borderSize;
      let radius = size > 1 ? this.size * clusterMultiplier : this.size;

      if (this.parentElement && this.parentElement.cluster) {
        if (this._hasUniqueStyles(features)) {
          let style = features[0].getStyle();
          if (style instanceof Function) {
            style = style();
          }
          const styleImage = style.getImage();
          color = styleImage.getFill().getColor();
          borderColor = styleImage.getStroke().getColor();
          borderSize = styleImage.getStroke().getWidth();
          radius = size > 1 ? styleImage.getRadius() * clusterMultiplier : styleImage.getRadius();
        } else if (this._containsStyle(features)) {
          color = this.clusterColor;
          textColor = this.clusterTextColor;
        } else {
          // default options zijn goed
        }
      }

      return new OlStyle({
        image: new OlStyleCircle({
          fill: new OlStyleFill({
            color: color,
          }),
          stroke: new OlStyleStroke({
            color: borderColor,
            width: borderSize,
          }),
          radius: radius,
        }),
        text: this._getTextStyle(feature, textColor),
      });
    };
  }

  get featureLabelFunction() {
    return (feature) => {
      const features = feature && feature.get ? (feature.get('features') || []) : [];
      const size = features.length || 1;
      return size > 1 ? size.toString() : '';
    };
  }
}

define('vl-map-layer-circle-style', VlMapLayerCircleStyle);
