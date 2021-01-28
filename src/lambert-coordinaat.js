class LambertCoordinaat {

    static REGEX = /^\(?(\d{1,6}\.\d{1,2}|\d{1,6})[,;]\u0020(\d{1,6}\.\d{1,2}|\d{1,6})\)?/

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