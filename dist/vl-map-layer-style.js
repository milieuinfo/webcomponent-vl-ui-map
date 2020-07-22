import {vlElement} from '/node_modules/vl-ui-core/dist/vl-core.js';

/**
 * VlMapLayerStyle
 * @class
 * @classdesc De abstracte kaart laag style klasse.
 *
 * @extends vlElement
 *
 * @property {string} color - Attribuut wordt gebruikt om aan te geven wat de kleur is van de kaartlaagstijl.
 * @property {string} text-color - Attribuut wordt gebruikt om aan te geven wat de kleur is van de tekst.
 * @property {number} text-offset-x - Attribuut wordt gebruikt om aan te geven wat de offset op de x-as is van de tekst.
 * @property {number} text-offset-y - Attribuut wordt gebruikt om aan te geven wat de offset op de y-as is van de tekst.
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
    return this.getAttribute('color') || 'rgba(255, 255, 255, 1)';
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
    console.info('opgelet vl-map-layer-style is abstract en zal geen stijl toevoegen aan de kaartlaag');
    return null;
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
