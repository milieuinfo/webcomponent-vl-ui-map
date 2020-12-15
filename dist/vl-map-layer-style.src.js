import {vlElement} from 'vl-ui-core';
import {OlStyle, OlStyleStroke} from 'vl-mapactions/dist/vl-mapactions.js';

/**
 * VlMapLayerStyle
 * @class
 * @classdesc De abstracte kaart laag style klasse.
 *
 * @extends HTMLElement
 * @mixes vlElement
 *
 * @property {string} data-vl-color - Attribuut wordt gebruikt om aan te geven wat de kleur is van de kaartlaagstijl.
 * @property {string} data-vl-text-color - Attribuut wordt gebruikt om aan te geven wat de kleur is van de tekst.
 * @property {number} data-vl-text-offset-x - Attribuut wordt gebruikt om aan te geven wat de offset op de x-as is van de tekst.
 * @property {number} data-vl-text-offset-y - Attribuut wordt gebruikt om aan te geven wat de offset op de y-as is van de tekst.
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
    return this.getAttribute('color') || 'rgba(2, 85, 204, 1)';
  }

  /**
   * Geeft de randkleur van de cirkels terug.
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
    return this.getAttribute('text-color') || '#FFF';
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
    return new OlStyle({
      stroke: new OlStyleStroke({
        color: this.borderColor,
        width: this.borderSize,
      }),
    });
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

