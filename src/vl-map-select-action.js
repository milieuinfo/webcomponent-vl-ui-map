import { VlMapAction } from "./vl-map-action.js";

/**
 * VlMapSelectAction
 * @class
 * @classdesc De kaart selecteer actie component. <a href="demo/vl-map-select-action.html">Demo</a>.
 * 
 * @property {boolean} cluster - Attribuut geeft aan of de features geclusterd zijn of niet.
 * 
 * @extends VlElement
 */
export class VlMapSelectAction extends VlMapAction {
    constructor() {
        super();
        this._onSelect = () => {
            console.info('er is geen onSelect functie gedefinieerd!');
        };
    }

    get style() {
        return this._style;
    }
    
    set style(style) {
        this._style = style;
    }

    get _cluster() {
        return this.getAttribute('cluster');
    }

    mark(id) {
        if (this._action && id) {
            this._action.markFeatureWithId(id, this.layer);
        }
    }
    
    removeMarks() {
        if (this._action) {
            this._action.demarkAllFeatures();
        }
    }
    
    select(feature) {
        if (this._action && feature) {
            this._action.selectFeature(feature);
        }
    }

    onSelect(callback) {
        this._onSelect = callback;
    }

    reset() {
        if (this._action) {
            this._action.clearFeatures();
        }
    }
    
    _createAction(layer) {
        return new acd.ol.action.SelectAction(layer, (args) => {this._onSelect(args)}, {
            style: this._style,
            cluster: (this._cluster != undefined)
        });
    }
}