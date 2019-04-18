import { VlElement } from "/node_modules/vl-ui-core/vl-core.js";

/**
 * VlMapLayerStyle
 * @class
 * @classdesc De abstracte kaart laag style klasse. <a href="demo/vl-map.html">Demo</a>.
 *
 * @extends VlElement
 *
 * @property {string} kleur - Attribuut wordt gebruikt om aan te geven wat de kleur is van de kaartlaagstijl.
 * @property {string} tekst-kleur - Attribuut wordt gebruikt om aan te geven wat de kleur is van de tekst.
 * @property {number} tekst-offset-x - Attribuut wordt gebruikt om aan te geven wat de offset op de x-as is van de tekst.
 * @property {number} tekst-offset-y - Attribuut wordt gebruikt om aan te geven wat de offset op de y-as is van de tekst.
 */
export class VlMapLayerStyle extends VlElement(HTMLElement) {
    /**
     * Geeft de kleur van de stijl terug.
     *
     * @Return {string}
     */
    get kleur() {
        return this.getAttribute('kleur') || 'rgba(255, 255, 255, 1)';
    }

    /**
     * Geeft de tekstkleur van de stijl terug.
     *
     * @Return {string}
     */
    get tekstKleur() {
        return this.getAttribute('tekst-kleur') || '#FFF';
    }

    /**
     * Geeft de offset op de x-as van de tekst terug.
     *
     * @Return {number}
     */
    get tekstOffsetX() {
        return this.getAttribute('tekst-offset-x') || 0;
    }

    /**
     * Geeft de offset op de y-as van de tekst terug.
     *
     * @Return {number}
     */
    get tekstOffsetY() {
        return this.getAttribute('tekst-offset-y') || 0;
    }

    /**
     * Geeft de stijl terug.
     *
     * @Return {string}
     */
    get stijl() {
        console.info("opgelet vl-map-layer-style is abstract en zal geen stijl toevoegen aan de kaartlaag");
        return null;
    }

    _hebbenIdentiekeStyle(features) {
        const styles = this._getStyles(features);
        return styles && this._bevatObject(styles) && this._zijnIdentiek(styles);
    }

    _bevatStyle(features) {
        return this._bevatObject(features.map((feature) => feature.getStyle()));
    }

    _getStyles(features) {
        return features.map((feature) => {
            return feature.getStyle();
        });
    }

    _bevatObject(objects) {
        return objects.some((object) => { return !!object; });
    }

    _zijnIdentiek(objects) {
        return objects.every((object, i, objects) => { return object == objects[0]; });
    }
}