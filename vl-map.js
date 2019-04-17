<<<<<<< HEAD
import { VlElement } from '../../../../../../../node_modules/vl-ui-core/vl-core.js';

/**
 * VlMap
 * @class
 * @classdesc De kaart component. <a href="demo/index.html">Demo</a>.
 *
 * @extends VlElement
 * 
 * @property {boolean} disable-escape-key - Attribuut wordt gebruikt om ervoor te zorgen dat de escape toets niet gebruikt kan worden.
 */
class VlMap extends VlElement(HTMLElement) {
    constructor() {
        super(`
            <style>
                @import '/node_modules/vl-mapactions/lib/openlayers/css/ol.css';
                @import '/node_modules/vl-mapactions/dist/mapactions.css';
                @import '../style.css';

                :host {
                    display: block;
                    position: relative;
                }

                #map {
                    width: 100%;
                    height: var(--vl-map-height, 500px);
                }

                .ol-overviewmap-map {
                    width: 100px;
                    height: 100px;
                }
            </style>

            <div id="map"></div>
        `);
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

/**
 * VlMapBaseLayer
 * @class
 * @classdesc De kaart basis laag component. <a href="demo/vl-map.html">Demo</a>.
 *
 * @extends VlElement
 * 
 * @property {(wmts | wfs )} type - Attribuut wordt gebruikt om aan te geven wat het type is van de kaartlaag.
 * @property {string} url - Attribuut geeft aan via welke URL gebruikt wordt om de kaartlaag op te halen.
 * @property {string} layer - Attribuut geeft aan wat de kaartlaag identifier is.
 * @property {string} title - Attribuut bepaalt de titel van de kaartlaag.
 */
class VlMapBaseLayer extends VlElement(HTMLElement) {
    connectedCallback() {
        this._map.addBaseLayerAndOverlayMapLayer(this._createBaseLayer(), this._createBaseLayer());
    }

    /**
     * Geeft het kaartlaag type terug.
     * 
     * @Return {string}
     */
    get type() {
        return this.getAttribute('type') || 'wmts';
    }

    /**
     * Geeft de kaartlaag URL terug.
     * 
     * @Return {string}
     */
    get url() {
        return this.getAttribute('url');
    }

    /**
     * Geeft de kaartlaag identifier terug.
     * 
     * @Return {string}
     */
    get layer() {
        return this.getAttribute('layer');
    }

    /**
     * Geeft de kaartlaag titel terug.
     * 
     * @Return {string}
     */
    get title() {
        return this.getAttribute('title');
    }

    get _map() {
        if (this.parentNode) {
            return this.parentNode.map;
        }
    }

    get _projection() {
        if (this.parentNode) {
            return this.parentNode._projection;
        }
    }

    get _WMTSSource() {
        this._wmtsSource = this._wmtsSource || this._createWMTSSource();
        return this._wmtsSource;
    }

    get _vectorSource() {
        this._createdVectorSource = this._createdVectorSource || this._createVectorSource();
        return this._createdVectorSource;
    }

    _createWMTSSource() {
        let size = ol.extent.getWidth(this._projection.getExtent()) / 256;
        let resolutions = new Array(16);
        let matrixIds = new Array(16);
        for (let z = 0; z < 16; ++z) {
            resolutions[z] = size / Math.pow(2, z);
            matrixIds[z] = z;
        }

        return new ol.source.WMTS({
            url: this.url,
            layer: this.layer,
            matrixSet: 'BPL72VL',
            format: 'image/png',
            projection: this._projection,
            tileGrid: new ol.tilegrid.WMTS({
                extent: this._projection.getExtent(),
                origin: ol.extent.getTopLeft(this._projection.getExtent()),
                resolutions: resolutions,
                matrixIds: matrixIds
            }),
            style: ''
        });
    }

    _createVectorSource() {
        var self = this;
        return new ol.source.Vector({
            format: new ol.format.GeoJSON({
                defaultDataProjection: self._projection
            }),
            url: function() {
                return self.url;
            },
            strategy: ol.loadingstrategy.bbox
        });
    }

    _createBaseLayer() {
        switch(this.type) {
            case 'wmts':
                return new ol.layer.Tile({
                    title: this.title,
                    type: 'base',
                    source: this._WMTSSource
                });
            case 'wfs':
                return new ol.layer.Vector({
                    source: this._vectorSource,
                    style: new ol.style.Style({
                        stroke: new ol.style.Stroke({
                            color: 'rgba(0, 0, 0, 1.0)',
                            width: 1
                        }),
                        fill: new ol.style.Fill({
                            color: 'rgba(255, 0, 0, 1.0)'
                        })
                    })
                });
        }
    }
}

/**
 * VlMapBaseLayerGRBGray
 * @class
 * @classdesc De kaart basis laag component voor GRB grijstinten. <a href="demo/vl-map.html">Demo</a>.
 *
 * @extends VlElement
 */
class VlMapBaseLayerGRBGray extends VlMapBaseLayer {
    constructor() {
        super();
        this.setAttribute('url', 'https://tile.informatievlaanderen.be/ws/raadpleegdiensten/wmts');
        this.setAttribute('layer', 'grb_bsk_grijs');
        this.setAttribute('title', 'GRB basis laag grijs');
    }
}

/**
 * VlMapBaseLayerGRB
 * @class
 * @classdesc De kaart layer component voor GRB. <a href="demo/vl-map.html">Demo</a>.
 * 
 * @extends VlElement
 */
class VlMapBaseLayerGRB extends VlMapBaseLayer {
    constructor() {
        super();
        this.setAttribute('url', 'https://tile.informatievlaanderen.be/ws/raadpleegdiensten/wmts');
        this.setAttribute('layer', 'grb_bsk');
        this.setAttribute('title', 'GRB basis laag');
    }
}

/**
 * VlMapBaseLayerGRBOrtho
 * @class
 * @classdesc De kaart basis laag component voor GRB ortho. <a href="demo/vl-map.html">Demo</a>.
 * 
 * @extends VlElement
 */
class VlMapBaseLayerGRBOrtho extends VlMapBaseLayer {
    constructor() {
        super();
        this.setAttribute('url', 'https://tile.informatievlaanderen.be/ws/raadpleegdiensten/wmts');
        this.setAttribute('layer', 'omwrgbmrvl');
        this.setAttribute('title', 'GRB ortho laag');
    }
}

(() => {
    loadScript('VlMap-openlayers', '/node_modules/vl-mapactions/lib/openlayers/dist/ol.js');
    loadScript('VlMap-proj4', '/node_modules/proj4/dist/proj4.js');
    loadScript('VlMap-mapactions', '/node_modules/vl-mapactions/dist/mapactions-min.js', () => {
        customElements.define('vl-map', VlMap);
        customElements.define('vl-map-baselayer', VlMapBaseLayer);
        customElements.define('vl-map-baselayer-grb-gray', VlMapBaseLayerGRBGray);
        customElements.define('vl-map-baselayer-grb', VlMapBaseLayerGRB);
        customElements.define('vl-map-baselayer-grb-ortho', VlMapBaseLayerGRBOrtho);
    });
  
    function loadScript(id, src, onload) {
        if (!document.head.querySelector('#' + id)) {
            const script = document.createElement('script');
            script.setAttribute('id', id);
            script.setAttribute('src', src);
            script.async = false;
            script.defer = false;
            script.onload = onload;
            document.head.appendChild(script);
        }
    }
})();

export { VlMap, VlMapBaseLayer, VlMapBaseLayerGRB, VlMapBaseLayerGRBGray, VlMapBaseLayerGRBOrtho };
=======
import{VlElement as e}from"../../../../../../node_modules/vl-ui-core/vl-core.js";class t extends(e(HTMLElement)){constructor(){super("\n            <style>\n                @import '../style.css';\n\n                :host {\n                    display: block;\n                    position: relative;\n                }\n            </style>\n\n            <div id=\"map\"></div>\n        ")}get map(){return this._map}get disableEscapeKey(){return null!=this.getAttribute("disable-escape-key")}get _geoJSON(){return this.__geoJSON||(this.__geoJSON=new ol.format.GeoJSON),this.__geoJSON}get _mapElement(){return this._shadow.querySelector("#map")}get _projection(){return new ol.proj.Projection({code:"EPSG:31370",extent:this._extent})}get _extent(){return[9928,66928,272072,329072]}connectedCallback(){this.__initializeCoordinateSystem(),this._map=new acd.ol.CustomMap({actions:[],disableEscapeKey:this.disableEscapeKey,customLayers:{baseLayerGroup:this.__createLayerGroup("Basis lagen",[]),overviewMapLayers:[],overlayGroup:this.__createLayerGroup("Lagen",[])},projection:this._projection,target:this._mapElement}),this._map.initializeView()}__createLayerGroup(e,t){return new ol.layer.Group({title:e,layers:t})}__initializeCoordinateSystem(){proj4.defs("EPSG:31370","+proj=lcc +lat_1=51.16666723333333 +lat_2=49.8333339 +lat_0=90 +lon_0=4.367486666666666 +x_0=150000.013 +y_0=5400088.438 +ellps=intl +towgs84=-106.869,52.2978,-103.724,0.3366,-0.457,1.8422,-1.2747 +units=m +no_defs")}}class r extends(e(HTMLElement)){connectedCallback(){this._map.addBaseLayerAndOverlayMapLayer(this._createBaseLayer(),this._createBaseLayer())}get type(){return this.getAttribute("type")||"wmts"}get url(){return this.getAttribute("url")}get layer(){return this.getAttribute("layer")}get title(){return this.getAttribute("title")}get _map(){if(this.parentNode)return this.parentNode.map}get _projection(){if(this.parentNode)return this.parentNode._projection}get _WMTSSource(){return this._wmtsSource=this._wmtsSource||this._createWMTSSource(),this._wmtsSource}get _vectorSource(){return this._createdVectorSource=this._createdVectorSource||this._createVectorSource(),this._createdVectorSource}_createWMTSSource(){let e=ol.extent.getWidth(this._projection.getExtent())/256,t=new Array(16),r=new Array(16);for(let s=0;s<16;++s)t[s]=e/Math.pow(2,s),r[s]=s;return new ol.source.WMTS({url:this.url,layer:this.layer,matrixSet:"BPL72VL",format:"image/png",projection:this._projection,tileGrid:new ol.tilegrid.WMTS({extent:this._projection.getExtent(),origin:ol.extent.getTopLeft(this._projection.getExtent()),resolutions:t,matrixIds:r}),style:""})}_createVectorSource(){var e=this;return new ol.source.Vector({format:new ol.format.GeoJSON({defaultDataProjection:e._projection}),url:function(){return e.url},strategy:ol.loadingstrategy.bbox})}_createBaseLayer(){switch(this.type){case"wmts":return new ol.layer.Tile({title:this.title,type:"base",source:this._WMTSSource});case"wfs":return new ol.layer.Vector({source:this._vectorSource,style:new ol.style.Style({stroke:new ol.style.Stroke({color:"rgba(0, 0, 0, 1.0)",width:1}),fill:new ol.style.Fill({color:"rgba(255, 0, 0, 1.0)"})})})}}}class s extends r{constructor(){super(),this.setAttribute("url","https://tile.informatievlaanderen.be/ws/raadpleegdiensten/wmts"),this.setAttribute("layer","grb_bsk_grijs"),this.setAttribute("title","GRB basis laag grijs")}}class o extends r{constructor(){super(),this.setAttribute("url","https://tile.informatievlaanderen.be/ws/raadpleegdiensten/wmts"),this.setAttribute("layer","grb_bsk"),this.setAttribute("title","GRB basis laag")}}class i extends r{constructor(){super(),this.setAttribute("url","https://tile.informatievlaanderen.be/ws/raadpleegdiensten/wmts"),this.setAttribute("layer","omwrgbmrvl"),this.setAttribute("title","GRB ortho laag")}}(()=>{function e(e,t,r){if(!document.head.querySelector("#"+e)){const s=document.createElement("script");s.setAttribute("id",e),s.setAttribute("src",t),s.async=!1,s.defer=!1,s.onload=r,document.head.appendChild(s)}}e("VlMap-openlayers","/node_modules/vl-mapactions/lib/openlayers/dist/ol.js"),e("VlMap-proj4","/node_modules/proj4/dist/proj4.js"),e("VlMap-mapactions","/node_modules/vl-mapactions/dist/mapactions-min.js",()=>{customElements.define("vl-map",t),customElements.define("vl-map-baselayer",r),customElements.define("vl-map-baselayer-grb-gray",s),customElements.define("vl-map-baselayer-grb",o),customElements.define("vl-map-baselayer-grb-ortho",i)})})();export{t as VlMap,r as VlMapBaseLayer,o as VlMapBaseLayerGRB,s as VlMapBaseLayerGRBGray,i as VlMapBaseLayerGRBOrtho};
>>>>>>> f76dbb20ddd0f74dd2c062c24bd5ca07bfaaed0a
