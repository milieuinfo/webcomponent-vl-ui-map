class LambertCoordinaat {
  
  /**
   * Lambert-coördinaat reguliere expressie. Staat toe:
   * - optioneel ongelimiteerd aantal spaties voor de start van het coördinaat
   * - optioneel linker haakje '('
   * - verplichte x-coördinaat, welke een decimaal (met een precisie van 2 getallen na de komma) of geheel getal kan zijn met 1-6 getallen
   * - verplicht scheidingsteken, welke een komma ',' of puntkomma ';' kan zijn
   * - optionele spatie
   * - verplichte y-coördinaat, welke een decimaal (met een precisie van 2 getallen na de komma) of geheel getal kan zijn met 1-6 getallen
   * - optioneel rechter haakje ')'
   *
   * E.g.:
   * - "104719.27, 192387.25", "104719.27,192387.25", "104719.27; 192387.25"
   * - "(104719.27, 192387.25)", "104719.27, 192387.25)", "(104719.27, 192387.25"
   * - "104719, 192387"
   *
   * @type {RegExp}
   */
  static REGEX = /^\s*\(?(\d{1,6}\.\d{1,2}|\d{1,6})[,;]\u0020?(\d{1,6}\.\d{1,2}|\d{1,6})\)?/;
  
  constructor(x, y) {
    this._x = x;
    this._y = y;
  }
  
  /**
   * Geef de x-coördinaat.
   *
   * @returns {Number}
   */
  get x() {
    return this._x;
  }
  
  /**
   * Geef de y-coördinaat.
   *
   * @returns {Number}
   */
  get y() {
    return this._y;
  }
  
  /**
   * Geeft de Lambert-coördinaat, komma gescheiden terug.
   *
   * @returns {string}
   */
  toString() {
    return this._x + ', ' + this._y;
  }
  
  /**
   * Creëert een Lambert-coördinaat wanneer een opgegeven String waarde overeenkomt met het opgestelde regex patroon.
   * Wanneer ongeldig of als de invoer waarde niet van het type String is, zal undefined worden teruggegeven!
   *
   * @param value
   * @returns {LambertCoordinaat|undefined}
   */
  static of(value) {
    if (!value || !value instanceof String) {
      return undefined;
    }
    const resultaat = value.match(LambertCoordinaat.REGEX);
    if (resultaat) {
      const x = Number(resultaat[1]);
      const y = Number(resultaat[2]);
      return new LambertCoordinaat(x, y);
    }
    return undefined;
  }
  
}

export default LambertCoordinaat;
