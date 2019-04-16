import { VlElement } from '/node_modules/vl-ui-core/vl-core.js';

(() => {
    loadScript('VlMap-openlayers.js', '/node_modules/vl-mapactions/lib/openlayers/dist/ol.js');
    loadScript('VlMap-openlayers.js', '/node_modules/proj4/dist/proj4.js');
    loadScriptSynchronous('VlMap-mapactions.js', '/node_modules/vl-mapactions/dist/mapactions.js', () => {
        customElements.define('vl-map', VlMap);
    });
  
    function loadScript(id, src, async, defer, onload) {
        if (!document.head.querySelector('#' + id)) {
            const script = document.createElement('script');
            script.setAttribute('id', id);
            script.setAttribute('src', src);
            script.async = async;
            script.defer = defer;
            script.onload = onload;
            document.head.appendChild(script);
        }
    }

    function loadScriptSynchronous(id, src, onload) {
        loadScript(id, src, false, false, onload);
    }
})();

/**
 * VlMap
 * @class
 * @classdesc De kaart component. <a href="demo/vl-map.html">Demo</a>.
 * 
 * @extends VlElement
 */
export class VlMap extends VlElement(HTMLElement) {
    constructor() {
        super(`
            <style>
                @import '../style.css';
            </style>

            <div id="map"></div>
        `);
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

    connectedCallback() {
        if (window.ol) {
            this.__initializeCoordinateSystem();
    
            this.map = new acd.ol.CustomMap({
                actions: [],
                disableEscapeKey: this.disableEscapeKey,
                customLayers: {
                    baseLayerGroup: this.__createLayerGroup('Basis lagen', []),
                    overviewMapLayers: [],
                    overlayGroup: this.__createLayerGroup('Lagen', [])
                },
                projection: this._projection,
                target: this._mapElement
            });
            
            this.map.initializeView();
        }
    }

    __initializeCoordinateSystem() {
        proj4.defs('EPSG:31370', '+proj=lcc +lat_1=51.16666723333333 +lat_2=49.8333339 +lat_0=90 +lon_0=4.367486666666666 +x_0=150000.013 +y_0=5400088.438 +ellps=intl +towgs84=-106.869,52.2978,-103.724,0.3366,-0.457,1.8422,-1.2747 +units=m +no_defs');
    }

    __createLayerGroup(title, layers) {
        return new ol.layer.Group({
            title: title,
            layers: layers
        });
    }
}