
/**
 * Lambert-coördinaat reguliere expressie. Staat toe:
 * - optioneel ongelimiteerd aantal spaties voor de start van het coördinaat
 * - optioneel linker haakje '('
 * - verplichte x-coördinaat, welke een decimaal of geheel getal kan zijn met 1-6 getallen voor de komma en een ongelimiteerd aantal na
 * - verplicht scheidingsteken, welke een komma ',' of puntkomma ';' kan zijn
 * - optionele ongelimiteerd aantal spaties
 * - verplichte y-coördinaat, welke een decimaal of geheel getal kan zijn met 1-6 getallen voor de komma en een ongelimiteerd aantal na
 * - optioneel rechter haakje ')'
 *
 * E.g.:
 * - "104719.27, 192387.25", "104719.27,192387.25", "104719.27; 192387.25"
 * - "(104719.27, 192387.25)", "104719.27, 192387.25)", "(104719.27, 192387.25"
 * - "104719, 192387"
 *
 * @type {RegExp}
 */
const REGEX = /^\s*\(?(?<x>\d{1,6}\.\d{1,2}|\d{1,6})\d*[,;]\u0020*(?<y>\d{1,6}\.\d{1,2}|\d{1,6})\d*\)?/;

class LambertCoordinaat {
  constructor(x, y) {
    this._x = x;
    this._y = y;
  }

  /**
   * Geef de x-coördinaat.
   *
   * @return {Number}
   */
  get x() {
    return this._x;
  }

  /**
   * Geef de y-coördinaat.
   *
   * @return {Number}
   */
  get y() {
    return this._y;
  }

  /**
   * Geeft de Lambert-coördinaat, komma gescheiden terug.
   *
   * @return {string}
   */
  toString() {
    return this._x + ', ' + this._y;
  }

  /**
   * Creëert een Lambert-coördinaat wanneer een opgegeven String waarde overeenkomt met het opgestelde regex patroon.
   * Wanneer ongeldig of als de invoer waarde niet van het type String is, zal undefined worden teruggegeven!
   *
   * @param {string} value
   * @return {LambertCoordinaat|undefined}
   */
  static of(value) {
    if (!value && !(value instanceof String)) {
      return undefined;
    }
    const resultaat = value.match(REGEX);
    if (resultaat) {
      const x = Number(resultaat.groups.x);
      const y = Number(resultaat.groups.y);
      return new LambertCoordinaat(x, y);
    }
    return undefined;
  }
}

export {REGEX, LambertCoordinaat};
