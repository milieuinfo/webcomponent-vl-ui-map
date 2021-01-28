class LambertCoordinaat {
  
  /**
   * Lamber Coördinaat regular expression. Allows:
   * - unlimited spaces before the start of the coordinate
   * - optional left parenthesis '('
   * - mandatory x-coordinate, which can be a decimal (with a precision of 2) or integer number of 1-6 digits
   * - mandatory separator, which can be a comma ',' or semicolon ';'
   * - optional space
   * - mandatory y-coordinate, which can be a decimal (with a precision of 2) or integer number of 1-6 digits
   * - optional right parenthesis ')'
   *
   * E.g.:
   * - "104719.27, 192387.25", "104719.27,192387.25", "104719.27; 192387.25"
   * - "(104719.27, 192387.25)", "104719.27, 192387.25)", "(104719.27, 192387.25"
   * - "104719, 192387"
   *
   * @type {RegExp}
   */
  static REGEX = /^\s*\(?(\d{1,6}\.\d{1,2}|\d{1,6})[,;]\u0020?(\d{1,6}\.\d{1,2}|\d{1,6})\)?/
  
  constructor(x, y) {
    this._x = x;
    this._y = y;
  }
  
  get x() {
    return this._x;
  }
  
  get y() {
    return this._y;
  }
  
  toString() {
    return this._x + ", " + this._y;
  }
  
  /**
   * Create a Lambert Coordinaat when given String value matches the regex.
   * When invalid or the input is not of type String, undefined is returned!
   *
   * @param value
   * @returns {LambertCoordinaat|undefined}
   */
  static of(value) {
    if (!value || !value instanceof String) {
      return undefined;
    }
    let resultaat = value.match(LambertCoordinaat.REGEX);
    if (resultaat) {
      let x = Number(resultaat[1]);
      let y = Number(resultaat[2]);
      return new LambertCoordinaat(x, y);
    }
    return undefined;
  }
  
}

export default LambertCoordinaat;