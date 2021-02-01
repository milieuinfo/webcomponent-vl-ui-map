import {vlElement} from '/node_modules/vl-ui-core/dist/vl-core.js';
import {
  OlStyle,
  OlStyleFill,
  OlStyleStroke,
  OlStyleText,
} from '/node_modules/vl-mapactions/dist/vl-mapactions.js';

/**
 * VlMapLayerStyle
 * @class
 * @classdesc De kaart laag style klasse.
 *
 * @extends HTMLElement
 * @mixes vlElement
 *
 * @property {string} data-vl-color - Attribuut wordt gebruikt om aan te geven wat de kleur is van de kaartlaagstijl. Default 'rgba(2, 85, 204, 1)'.
 * @property {string} data-vl-border-color - Attribuut wordt gebruikt om aan te geven wat de kleur van de rand is van de kaartlaagstijl. Default 'rgba(2, 85, 204, 1)'.
 * @property {string} data-vl-border-size - Attribuut wordt gebruikt om aan te geven wat de grootte van de rand is van de kaartlaagstijl. Default '1'.
 * @property {string} data-vl-text-background-color - Attribuut wordt gebruikt om aan te geven wat de kleur is van de achtergrond van de tekst. Default 'rgba(0, 0, 0, 0)'.
 * @property {string} data-vl-text-border-color - Attribuut wordt gebruikt om aan te geven wat de kleur is van de rand van de tekst. Default 'rgb(255,255,255, 1)'.
 * @property {string} data-vl-text-border-size - Attribuut wordt gebruikt om aan te geven wat de grootte is van de rand van de tekst. Default '0'.
 * @property {string} data-vl-text-color - Attribuut wordt gebruikt om aan te geven wat de kleur is van de tekst. Default 'rgb(255,255,255, 1)'.
 * @property {number} data-vl-text-feature-attribute-name - Attribuut wordt gebruikt om aan te geven wat de naam van het attribuut van de feature van de stijl is, die gebruikt wordt om de tekst te tonen. Default ''.
 * @property {number} data-vl-text-offset-x - Attribuut wordt gebruikt om aan te geven wat de offset op de x-as is van de tekst.
 * @property {number} data-vl-text-offset-y - Attribuut wordt gebruikt om aan te geven wat de offset op de y-as is van de tekst.
 * @property {number} data-vl-text-size - Attribuut wordt gebruikt om aan te geven wat de grootte is van de tekst in CSS font-size eenheden (medium|xx-small|x-small|small|large|x-large|xx-large|smaller|larger|length|initial|inherit). Default '10px'.
 *
 * @see {@link https://www.github.com/milieuinfo/webcomponent-vl-ui-map/releases/latest|Release notes}
 * @see {@link https://www.github.com/milieuinfo/webcomponent-vl-ui-map/issues|Issues}
 */
export class VlMapLayerStyle extends vlElement(HTMLElement) {
  connectedCallback() {
    this._setStyleOnParent();
  }

  /**
   * Geeft de color van de stijl terug.
   *
   * @Return {string}
   */
  get color() {
    return this.getAttribute('color') || 'rgba(2, 85, 204, 0.8)';
  }

  /**
   * Geeft de randkleur terug.
   *
   * @Return {string}
   */
  get borderColor() {
    return this.getAttribute('border-color') || 'rgba(2, 85, 204, 1)';
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
   * Geeft de tekstkleur van de stijl terug.
   *
   * @Return {string}
   */
  get textColor() {
    return this.getAttribute('text-color') || 'rgba(0, 0, 0, 1)';
  }

  /**
   * Geeft de tekstkleur van de rand van de stijl terug.
   *
   * @Return {string}
   */
  get textBackgroundColor() {
    return this.getAttribute('text-background-color') || 'rgba(0, 0, 0, 0)';
  }

  /**
   * Geeft de tekstkleur van de rand van de stijl terug.
   *
   * @Return {string}
   */
  get textBorderColor() {
    return this.getAttribute('text-border-color') || 'rgba(255, 255, 255, 1)';
  }

  /**
   * Geeft de grootte van de rand van de teskt van de stijl terug.
   *
   * @Return {number}
   */
  get textBorderSize() {
    return Number(this.getAttribute('text-border-size') || 1);
  }

  /**
   * Geeft de grootte van de tekst van de stijl terug.
   *
   * @Return {string}
   */
  get textSize() {
    return this.getAttribute('text-size') || '10px';
  }

  /**
   * Geeft de naam van het attribuut van de feature van de stijl terug, die gebruikt wordt om de tekst te tonen.
   *
   * @Return {string}
   */
  get textFeatureAttributeName() {
    return this.getAttribute('text-feature-attribute-name') || null;
  }

  /**
   * Geeft de offset op de x-as van de tekst terug.
   *
   * @Return {number}
   */
  get textOffsetX() {
    return this.getAttribute('text-offset-x') || 0;
  }

  /**
   * Geeft de offset op de y-as van de tekst terug.
   *
   * @Return {number}
   */
  get textOffsetY() {
    return this.getAttribute('text-offset-y') || 0;
  }

  /**
   * Geeft de stijl terug.
   *
   * @Return {string}
   */
  get style() {
    return (feature) => {
      const styleConfig = {
        fill: new OlStyleFill({
          color: this.color,
        }),
        stroke: new OlStyleStroke({
          color: this.borderColor,
          width: this.borderSize,
        }),
      };
      if (this.labelFunction != null) {
        styleConfig['text'] = this._getTextStyle(feature);
      }
      return new OlStyle(styleConfig);
    };
  }

  _getTextStyle(feature, textColor) {
    return new OlStyleText({
      font: `${this.textSize} "Flanders Art Sans",sans-serif`,
      text: this.labelFunction(feature),
      fill: new OlStyleFill({
        color: textColor ? textColor : this.textColor,
      }),
      stroke: new OlStyleStroke({
        color: this.textBorderColor,
        width: this.textBorderSize,
      }),
      backgroundFill: new OlStyleFill({
        color: this.textBackgroundColor,
      }),
      offsetX: this.textOffsetX,
      offsetY: this.textOffsetY,
    });
  }

  /**
   * Geeft de label functie terug.
   *
   * @Return {Function|null} de functie die gebruikt wordt om de label te maken op basis van feature en resolutie
   */
  get labelFunction() {
    return this.textFeatureAttributeName ? (feature) => feature.get(this.textFeatureAttributeName) : null;
  }

  _hasUniqueStyles(features) {
    const styles = this._getStyles(features);
    return styles && this._containsObject(styles) && this._areIdentical(styles);
  }

  _containsStyle(features) {
    return this._containsObject(features.map((feature) => feature.getStyle()));
  }

  _getStyles(features) {
    return features.map((feature) => {
      return feature.getStyle();
    });
  }

  _containsObject(objects) {
    return objects.some((object) => {
      return !!object;
    });
  }

  _areIdentical(objects) {
    return objects.every((object, i, objects) => {
      return object == objects[0];
    });
  }

  _setStyleOnParent() {
    if (this.parentElement) {
      return this.parentElement.style = this.style;
    }
  }
}
