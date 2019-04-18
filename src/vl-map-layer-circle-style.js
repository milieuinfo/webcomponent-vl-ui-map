import { VlMapLayerStyle } from "./vl-map-layer-style.js";

/**
 * VlMapLayerCircleStyle
 * @class
 * @classdesc De kaart laag style klasse voor cirkels. <a href="demo/vl-map.html">Demo</a>.
 *
 * @extends VlMapLayerStyle
 *
 * @property {number} grootte - Attribuut wordt gebruikt om aan te geven wat de grootte is van de cirkels.
 * @property {string} rand-kleur - Attribuut wordt gebruikt om aan te geven wat de kleur is van de randen van de cirkels.
 * @property {number} rand-grootte - Attribuut wordt gebruikt om aan te geven wat de grootte is van de randen van de cirkels.
 * @property {string} cluster-tekst-kleur - Attribuut wordt gebruikt om aan te geven wat de kleur van de tekst is bij het clusteren van features.
 */
export class VlMapLayerCircleStyle extends VlMapLayerStyle {
    /**
     * Geeft de grootte van de cirkels terug.
     *
     * @Return {number}
     */
    get grootte() {
        return this.getAttribute('grootte') || 5;
    }

    /**
     * Geeft de randkleur van de cirkels terug.
     *
     * @Return {string}
     */
    get randKleur() {
        return this.getAttribute('rand-kleur') || 'rgba(0, 0, 0, 1)';
    }

    /**
     * Geeft de grootte van de rand van de cirkels terug.
     *
     * @Return {number}
     */
    get randGrootte() {
        return this.getAttribute('rand-grootte') || 1;
    }

    /**
     * Geeft kleur van de tekst bij het clusteren van features terug.
     *
     * @Return {string}
     */
    get clusterTekstKleur() {
        return this.getAttribute('cluster-tekst-kleur') || '#FFF';
    }

    /**
     * Geeft de stijl terug.
     *
     * @Return {string}
     */
    get stijl() {
        return (feature, resolution) => {
            const features = feature && feature.get ? (feature.get('features') || []) : [];
            const size = features.length || 1;
            const clusterMultiplier = size == 1 ? 1 : Math.max(1.5, size.toString().length);
            const text = size > 1 ? size.toString() : '';
            let textColor = this.tekstKleur;
            let kleur = this.kleur;
            let randKleur = this.randKleur;
            let randGrootte = this.randGrootte;
            let radius =  size > 1 ? this.grootte * clusterMultiplier : this.grootte;

            if (this.parentElement && this.parentElement.cluster) {
                if (this._hebbenIdentiekeStyle(features)) {
                    let style = features[0].getStyle();
                    if (style instanceof Function) {
                        style = style();
                    }
                    const styleImage = style.getImage();
                    kleur = styleImage.getFill().getColor();
                    randKleur = styleImage.getStroke().getColor();
                    randGrootte = styleImage.getStroke().getWidth();
                    radius = size > 1 ? styleImage.getRadius() * clusterMultiplier : styleImage.getRadius();
                } else if (this._bevatStyle(features)) {
                    kleur = this.clusterKleur;
                    textColor = this.clusterTekstKleur;
                } else {
                    // default options zijn goed
                }
            }

            return new ol.style.Style({
                image: new ol.style.Circle({
                    fill: new ol.style.Fill({
                        color: kleur
                    }),
                    stroke: new ol.style.Stroke({
                        color: randKleur,
                        width: randGrootte
                    }),
                    radius: radius
                }),
                text: new ol.style.Text({
                    text: text,
                    font: '12px Flanders Art',
                    fill: new ol.style.Fill({
                        color: textColor
                    }),
                    offsetX: this.tekstOffsetX,
                    offsetY: this.tekstOffsetY
                })
            });
        };
    }
}