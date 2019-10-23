import { VlElement } from "/node_modules/vl-ui-core/vl-core.js";
import style from './vl-map.scss';

/**
 * VlMap
 * @class
 * @classdesc De kaart component.
 *
 * @extends VlElement
 * 
 * @property {boolean} disable-escape-key - Attribuut wordt gebruikt om ervoor te zorgen dat de escape toets niet gebruikt kan worden.
 * @property {boolean} disable-rotation - Attribuut wordt gebruikt om ervoor te zorgen dat het niet mogelijk is om de kaart te draaien.
 * 
 * @see {@link https://www.github.com/milieuinfo/webcomponent-vl-ui-map/releases/latest|Release notes}
 * @see {@link https://www.github.com/milieuinfo/webcomponent-vl-ui-map/issues|Issues}
 * @see {@link https://webcomponenten.omgeving.vlaanderen.be/demo/vl-map.html|Demo}
 */
export class VlMap extends VlElement(HTMLElement) {
    constructor() {
        super(`
            <style>
                :host {
                    display: none;
                    position: relative;
                }
                
                ${style}
            </style>

            <div id="map"></div>
        `);

        this.__updateMapSizeOnLoad();
        this.__updateOverviewMapSizeOnLoad();
    }
    
    /**
     * Geeft de OpenLayers map terug.
     * 
     * @Return {acd.ol.CustomMap}
     */
    get map() {
        return this._map;
    }

    get disableEscapeKey() {
        return this.getAttribute('disable-escape-key') != undefined;
    }

    get disableRotation() {
        return this.getAttribute('disable-rotation') != undefined;
    }

    get _geoJSON() {
        if (!this.__geoJSON) {
            this.__geoJSON = new ol.format.GeoJSON();
        }
        return this.__geoJSON;
    }

    get _mapElement() {
        return this._shadow.querySelector('#map');
    }

    get _projection() {
        return new ol.proj.Projection({
            code: 'EPSG:31370',
            extent: this._extent
        });
    }

    get _extent() {
        return [9928, 66928, 272072, 329072];
    }

    connectedCallback() {
        this.__initializeCoordinateSystem();

        this._map = new acd.ol.CustomMap({
            actions: [],
            disableEscapeKey: this.disableEscapeKey,
            disableRotation: this.disableRotation,
            customLayers: {
                baseLayerGroup: this.__createLayerGroup('Basis lagen', []),
                overviewMapLayers: [],
                overlayGroup: this.__createLayerGroup('Lagen', [])
            },
            projection: this._projection,
            target: this._mapElement
        });

        this._map.initializeView();
    }

    /**
     * Voegt een kaartactie toe aan de kaart.
     * 
     * @param {ol.interaction} action 
     */
    addAction(action) {
        this._map.addAction(action);
    }

    /**
     * Zoomt op de kaart naar de bounding box.
     * 
     * @param {Number[]} boundingbox 
     */
    zoomTo(boundingbox) {
        this._map.zoomToExtent(boundingbox);
    }

    __updateMapSize() {
        this.style.display = 'block';
        if (this._map) {
            this._map.updateSize();
        }
    }

    __updateOverviewMapSize() {
        if (this._map.overviewMapControl) {
            this._map.overviewMapControl.getOverviewMap().updateSize();
        }
    }

    __updateOverviewMapSizeOnLoad() {
        window.addEventListener('load', this.__updateOverviewMapSize.bind(this), { once: true });
    }

    __updateMapSizeOnLoad() {
        window.addEventListener('load', this.__updateMapSize.bind(this), { once: true });
    }

    __createLayerGroup(title, layers) {
        return new ol.layer.Group({
            title: title,
            layers: layers
        });
    }

    __initializeCoordinateSystem() {
        proj4.defs('EPSG:31370', '+proj=lcc +lat_1=51.16666723333333 +lat_2=49.8333339 +lat_0=90 +lon_0=4.367486666666666 +x_0=150000.013 +y_0=5400088.438 +ellps=intl +towgs84=-106.869,52.2978,-103.724,0.3366,-0.457,1.8422,-1.2747 +units=m +no_defs');
    }
}
