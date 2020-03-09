import { VlElement } from "/node_modules/vl-ui-core/dist/vl-core.js";

/**
 * VlMap
 * @class
 * @classdesc De kaart component.
 *
 * @extends VlElement
 * 
 * @property {boolean} disable-escape-key - Attribuut wordt gebruikt om ervoor te zorgen dat de escape toets niet gebruikt kan worden.
 * @property {boolean} disable-rotation - Attribuut wordt gebruikt om ervoor te zorgen dat het niet mogelijk is om de kaart te draaien.
 * @property {boolean} disable-mouse-wheel-zoom - Attribuut wordt gebruikt om ervoor te zorgen dat het niet mogelijk is om de kaart in te zoomen met het muiswiel.
 *
 * @see {@link https://www.github.com/milieuinfo/webcomponent-vl-ui-map/releases/latest|Release notes}
 * @see {@link https://www.github.com/milieuinfo/webcomponent-vl-ui-map/issues|Issues}
 * @see {@link https://webcomponenten.omgeving.vlaanderen.be/demo/vl-map.html|Demo}
 */
export class VlMap extends VlElement(HTMLElement) {
    constructor() {
        super(`
            <style>
@charset "UTF-8";.ol-box{box-sizing:border-box;border-radius:2px;border:2px solid #00f}.ol-mouse-position{top:8px;right:8px;position:absolute}.ol-scale-line{background:rgba(0,60,136,.3);border-radius:4px;bottom:8px;left:8px;padding:2px;position:absolute}.ol-scale-line-inner{border:1px solid #eee;border-top:none;color:#eee;font-size:10px;text-align:center;margin:1px;will-change:contents,width}.ol-overlay-container{will-change:left,right,top,bottom}.ol-unsupported{display:none}.ol-viewport .ol-unselectable{-webkit-touch-callout:none;-webkit-user-select:none;-khtml-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;-webkit-tap-highlight-color:transparent}.ol-control{position:absolute;background-color:rgba(255,255,255,.4);border-radius:4px;padding:2px}.ol-control:hover{background-color:rgba(255,255,255,.6)}.ol-zoom{top:.5em;left:.5em}.ol-rotate{top:.5em;right:.5em;transition:opacity .25s linear,visibility 0s linear}.ol-rotate.ol-hidden{opacity:0;visibility:hidden;transition:opacity .25s linear,visibility 0s linear .25s}.ol-zoom-extent{top:4.643em;left:.5em}.ol-full-screen{right:.5em;top:.5em}@media print{.ol-control{display:none}}.ol-control button{display:block;margin:1px;padding:0;color:#fff;font-size:1.14em;font-weight:700;text-decoration:none;text-align:center;height:1.375em;width:1.375em;line-height:.4em;background-color:rgba(0,60,136,.5);border:none;border-radius:2px}.ol-control button::-moz-focus-inner{border:none;padding:0}.ol-zoom-extent button{line-height:1.4em}.ol-compass{display:block;font-weight:400;font-size:1.2em;will-change:transform}.ol-touch .ol-control button{font-size:1.5em}.ol-touch .ol-zoom-extent{top:5.5em}.ol-control button:focus,.ol-control button:hover{text-decoration:none;background-color:rgba(0,60,136,.7)}.ol-zoom .ol-zoom-in{border-radius:2px 2px 0 0}.ol-zoom .ol-zoom-out{border-radius:0 0 2px 2px}.ol-attribution{text-align:right;bottom:.5em;right:.5em;max-width:calc(100% - 1.3em)}.ol-attribution ul{margin:0;padding:0 .5em;font-size:.7rem;line-height:1.375em;color:#000;text-shadow:0 0 2px #fff}.ol-attribution li{display:inline;list-style:none;line-height:inherit}.ol-attribution li:not(:last-child):after{content:" "}.ol-attribution img{max-height:2em;max-width:inherit;vertical-align:middle}.ol-attribution button,.ol-attribution ul{display:inline-block}.ol-attribution.ol-collapsed ul{display:none}.ol-attribution.ol-logo-only ul{display:block}.ol-attribution:not(.ol-collapsed){background:rgba(255,255,255,.8)}.ol-attribution.ol-uncollapsible{bottom:0;right:0;border-radius:4px 0 0;height:1.1em;line-height:1em}.ol-attribution.ol-logo-only{background:0 0;bottom:.4em;height:1.1em;line-height:1em}.ol-attribution.ol-uncollapsible img{margin-top:-.2em;max-height:1.6em}.ol-attribution.ol-logo-only button,.ol-attribution.ol-uncollapsible button{display:none}.ol-zoomslider{top:4.5em;left:.5em;height:200px}.ol-zoomslider button{position:relative;height:10px}.ol-touch .ol-zoomslider{top:5.5em}.ol-overviewmap{left:.5em;bottom:.5em}.ol-overviewmap.ol-uncollapsible{bottom:0;left:0;border-radius:0 4px 0 0}.ol-overviewmap .ol-overviewmap-map,.ol-overviewmap button{display:inline-block}.ol-overviewmap .ol-overviewmap-map{border:1px solid #7b98bc;height:150px;margin:2px;width:150px}.ol-overviewmap:not(.ol-collapsed) button{bottom:1px;left:2px;position:absolute}.ol-overviewmap.ol-collapsed .ol-overviewmap-map,.ol-overviewmap.ol-uncollapsible button{display:none}.ol-overviewmap:not(.ol-collapsed){background:rgba(255,255,255,.8)}.ol-overviewmap-box{border:2px dotted rgba(0,60,136,.7)}@font-face{font-family:"Glyphicons Halflings";src:url(../../../node_modules/bootstrap-sass/assets/fonts/bootstrap/glyphicons-halflings-regular.eot);src:url(../../../node_modules/bootstrap-sass/assets/fonts/bootstrap/glyphicons-halflings-regular.eot?#iefix) format("embedded-opentype"),url(../../../node_modules/bootstrap-sass/assets/fonts/bootstrap/glyphicons-halflings-regular.woff2) format("woff2"),url(../../../node_modules/bootstrap-sass/assets/fonts/bootstrap/glyphicons-halflings-regular.woff) format("woff"),url(../../../node_modules/bootstrap-sass/assets/fonts/bootstrap/glyphicons-halflings-regular.ttf) format("truetype"),url(../../../node_modules/bootstrap-sass/assets/fonts/bootstrap/glyphicons-halflings-regular.svg#glyphicons_halflingsregular) format("svg")}.glyphicon,.info-tooltip .close,.info-tooltip .icon{position:relative;top:1px;display:inline-block;font-family:"Glyphicons Halflings";font-style:normal;font-weight:400;line-height:1;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}.glyphicon-asterisk:before{content:"*"}.glyphicon-plus:before{content:"+"}.glyphicon-eur:before,.glyphicon-euro:before{content:"€"}.glyphicon-minus:before{content:"−"}.glyphicon-cloud:before{content:"☁"}.glyphicon-envelope:before{content:"✉"}.glyphicon-pencil:before{content:"✏"}.glyphicon-glass:before{content:""}.glyphicon-music:before{content:""}.glyphicon-search:before{content:""}.glyphicon-heart:before{content:""}.glyphicon-star:before{content:""}.glyphicon-star-empty:before{content:""}.glyphicon-user:before{content:""}.glyphicon-film:before{content:""}.glyphicon-th-large:before{content:""}.glyphicon-th:before{content:""}.glyphicon-th-list:before{content:""}.glyphicon-ok:before{content:""}.glyphicon-remove:before,.info-tooltip .close:before{content:""}.glyphicon-zoom-in:before{content:""}.glyphicon-zoom-out:before{content:""}.glyphicon-off:before{content:""}.glyphicon-signal:before{content:""}.glyphicon-cog:before{content:""}.glyphicon-trash:before{content:""}.glyphicon-home:before{content:""}.glyphicon-file:before{content:""}.glyphicon-time:before{content:""}.glyphicon-road:before{content:""}.glyphicon-download-alt:before{content:""}.glyphicon-download:before{content:""}.glyphicon-upload:before{content:""}.glyphicon-inbox:before{content:""}.glyphicon-play-circle:before{content:""}.glyphicon-repeat:before{content:""}.glyphicon-refresh:before,.info-tooltip .icon:before{content:""}.glyphicon-list-alt:before{content:""}.glyphicon-lock:before{content:""}.glyphicon-flag:before{content:""}.glyphicon-headphones:before{content:""}.glyphicon-volume-off:before{content:""}.glyphicon-volume-down:before{content:""}.glyphicon-volume-up:before{content:""}.glyphicon-qrcode:before{content:""}.glyphicon-barcode:before{content:""}.glyphicon-tag:before{content:""}.glyphicon-tags:before{content:""}.glyphicon-book:before{content:""}.glyphicon-bookmark:before{content:""}.glyphicon-print:before{content:""}.glyphicon-camera:before{content:""}.glyphicon-font:before{content:""}.glyphicon-bold:before{content:""}.glyphicon-italic:before{content:""}.glyphicon-text-height:before{content:""}.glyphicon-text-width:before{content:""}.glyphicon-align-left:before{content:""}.glyphicon-align-center:before{content:""}.glyphicon-align-right:before{content:""}.glyphicon-align-justify:before{content:""}.glyphicon-list:before{content:""}.glyphicon-indent-left:before{content:""}.glyphicon-indent-right:before{content:""}.glyphicon-facetime-video:before{content:""}.glyphicon-picture:before{content:""}.glyphicon-map-marker:before{content:""}.glyphicon-adjust:before{content:""}.glyphicon-tint:before{content:""}.glyphicon-edit:before{content:""}.glyphicon-share:before{content:""}.glyphicon-check:before{content:""}.glyphicon-move:before{content:""}.glyphicon-step-backward:before{content:""}.glyphicon-fast-backward:before{content:""}.glyphicon-backward:before{content:""}.glyphicon-play:before{content:""}.glyphicon-pause:before{content:""}.glyphicon-stop:before{content:""}.glyphicon-forward:before{content:""}.glyphicon-fast-forward:before{content:""}.glyphicon-step-forward:before{content:""}.glyphicon-eject:before{content:""}.glyphicon-chevron-left:before{content:""}.glyphicon-chevron-right:before{content:""}.glyphicon-plus-sign:before{content:""}.glyphicon-minus-sign:before{content:""}.glyphicon-remove-sign:before{content:""}.glyphicon-ok-sign:before{content:""}.glyphicon-question-sign:before{content:""}.glyphicon-info-sign:before{content:""}.glyphicon-screenshot:before{content:""}.glyphicon-remove-circle:before{content:""}.glyphicon-ok-circle:before{content:""}.glyphicon-ban-circle:before{content:""}.glyphicon-arrow-left:before{content:""}.glyphicon-arrow-right:before{content:""}.glyphicon-arrow-up:before{content:""}.glyphicon-arrow-down:before{content:""}.glyphicon-share-alt:before{content:""}.glyphicon-resize-full:before{content:""}.glyphicon-resize-small:before{content:""}.glyphicon-exclamation-sign:before{content:""}.glyphicon-gift:before{content:""}.glyphicon-leaf:before{content:""}.glyphicon-fire:before{content:""}.glyphicon-eye-open:before{content:""}.glyphicon-eye-close:before{content:""}.glyphicon-warning-sign:before{content:""}.glyphicon-plane:before{content:""}.glyphicon-calendar:before{content:""}.glyphicon-random:before{content:""}.glyphicon-comment:before{content:""}.glyphicon-magnet:before{content:""}.glyphicon-chevron-up:before{content:""}.glyphicon-chevron-down:before{content:""}.glyphicon-retweet:before{content:""}.glyphicon-shopping-cart:before{content:""}.glyphicon-folder-close:before{content:""}.glyphicon-folder-open:before{content:""}.glyphicon-resize-vertical:before{content:""}.glyphicon-resize-horizontal:before{content:""}.glyphicon-hdd:before{content:""}.glyphicon-bullhorn:before{content:""}.glyphicon-bell:before{content:""}.glyphicon-certificate:before{content:""}.glyphicon-thumbs-up:before{content:""}.glyphicon-thumbs-down:before{content:""}.glyphicon-hand-right:before{content:""}.glyphicon-hand-left:before{content:""}.glyphicon-hand-up:before{content:""}.glyphicon-hand-down:before{content:""}.glyphicon-circle-arrow-right:before{content:""}.glyphicon-circle-arrow-left:before{content:""}.glyphicon-circle-arrow-up:before{content:""}.glyphicon-circle-arrow-down:before{content:""}.glyphicon-globe:before{content:""}.glyphicon-wrench:before{content:""}.glyphicon-tasks:before{content:""}.glyphicon-filter:before{content:""}.glyphicon-briefcase:before{content:""}.glyphicon-fullscreen:before{content:""}.glyphicon-dashboard:before{content:""}.glyphicon-paperclip:before{content:""}.glyphicon-heart-empty:before{content:""}.glyphicon-link:before{content:""}.glyphicon-phone:before{content:""}.glyphicon-pushpin:before{content:""}.glyphicon-usd:before{content:""}.glyphicon-gbp:before{content:""}.glyphicon-sort:before{content:""}.glyphicon-sort-by-alphabet:before{content:""}.glyphicon-sort-by-alphabet-alt:before{content:""}.glyphicon-sort-by-order:before{content:""}.glyphicon-sort-by-order-alt:before{content:""}.glyphicon-sort-by-attributes:before{content:""}.glyphicon-sort-by-attributes-alt:before{content:""}.glyphicon-unchecked:before{content:""}.glyphicon-expand:before{content:""}.glyphicon-collapse-down:before{content:""}.glyphicon-collapse-up:before{content:""}.glyphicon-log-in:before{content:""}.glyphicon-flash:before{content:""}.glyphicon-log-out:before{content:""}.glyphicon-new-window:before{content:""}.glyphicon-record:before{content:""}.glyphicon-save:before{content:""}.glyphicon-open:before{content:""}.glyphicon-saved:before{content:""}.glyphicon-import:before{content:""}.glyphicon-export:before{content:""}.glyphicon-send:before{content:""}.glyphicon-floppy-disk:before{content:""}.glyphicon-floppy-saved:before{content:""}.glyphicon-floppy-remove:before{content:""}.glyphicon-floppy-save:before{content:""}.glyphicon-floppy-open:before{content:""}.glyphicon-credit-card:before{content:""}.glyphicon-transfer:before{content:""}.glyphicon-cutlery:before{content:""}.glyphicon-header:before{content:""}.glyphicon-compressed:before{content:""}.glyphicon-earphone:before{content:""}.glyphicon-phone-alt:before{content:""}.glyphicon-tower:before{content:""}.glyphicon-stats:before{content:""}.glyphicon-sd-video:before{content:""}.glyphicon-hd-video:before{content:""}.glyphicon-subtitles:before{content:""}.glyphicon-sound-stereo:before{content:""}.glyphicon-sound-dolby:before{content:""}.glyphicon-sound-5-1:before{content:""}.glyphicon-sound-6-1:before{content:""}.glyphicon-sound-7-1:before{content:""}.glyphicon-copyright-mark:before{content:""}.glyphicon-registration-mark:before{content:""}.glyphicon-cloud-download:before{content:""}.glyphicon-cloud-upload:before{content:""}.glyphicon-tree-conifer:before{content:""}.glyphicon-tree-deciduous:before{content:""}.glyphicon-cd:before{content:""}.glyphicon-save-file:before{content:""}.glyphicon-open-file:before{content:""}.glyphicon-level-up:before{content:""}.glyphicon-copy:before{content:""}.glyphicon-paste:before{content:""}.glyphicon-alert:before{content:""}.glyphicon-equalizer:before{content:""}.glyphicon-king:before{content:""}.glyphicon-queen:before{content:""}.glyphicon-pawn:before{content:""}.glyphicon-bishop:before{content:""}.glyphicon-knight:before{content:""}.glyphicon-baby-formula:before{content:""}.glyphicon-tent:before{content:"⛺"}.glyphicon-blackboard:before{content:""}.glyphicon-bed:before{content:""}.glyphicon-apple:before{content:""}.glyphicon-erase:before{content:""}.glyphicon-hourglass:before{content:"⌛"}.glyphicon-lamp:before{content:""}.glyphicon-duplicate:before{content:""}.glyphicon-piggy-bank:before{content:""}.glyphicon-scissors:before{content:""}.glyphicon-bitcoin:before{content:""}.glyphicon-btc:before{content:""}.glyphicon-xbt:before{content:""}.glyphicon-yen:before{content:"¥"}.glyphicon-jpy:before{content:"¥"}.glyphicon-ruble:before{content:"₽"}.glyphicon-rub:before{content:"₽"}.glyphicon-scale:before{content:""}.glyphicon-ice-lolly:before{content:""}.glyphicon-ice-lolly-tasted:before{content:""}.glyphicon-education:before{content:""}.glyphicon-option-horizontal:before{content:""}.glyphicon-option-vertical:before{content:""}.glyphicon-menu-hamburger:before{content:""}.glyphicon-modal-window:before{content:""}.glyphicon-oil:before{content:""}.glyphicon-grain:before{content:""}.glyphicon-sunglasses:before{content:""}.glyphicon-text-size:before{content:""}.glyphicon-text-color:before{content:""}.glyphicon-text-background:before{content:""}.glyphicon-object-align-top:before{content:""}.glyphicon-object-align-bottom:before{content:""}.glyphicon-object-align-horizontal:before{content:""}.glyphicon-object-align-left:before{content:""}.glyphicon-object-align-vertical:before{content:""}.glyphicon-object-align-right:before{content:""}.glyphicon-triangle-right:before{content:""}.glyphicon-triangle-left:before{content:""}.glyphicon-triangle-bottom:before{content:""}.glyphicon-triangle-top:before{content:""}.glyphicon-console:before{content:""}.glyphicon-superscript:before{content:""}.glyphicon-subscript:before{content:""}.glyphicon-menu-left:before{content:""}.glyphicon-menu-right:before{content:""}.glyphicon-menu-down:before{content:""}.glyphicon-menu-up:before{content:""}.ol-zoom .ol-zoom-out{margin-top:204px}.ol-zoomslider{background-color:transparent;top:2.3em;left:.58em}.ol-touch .ol-zoom .ol-zoom-out{margin-top:212px}.ol-zoom-in.ol-has-tooltip:focus [role=tooltip],.ol-zoom-in.ol-has-tooltip:hover [role=tooltip]{top:3px}.ol-zoom-out.ol-has-tooltip:focus [role=tooltip],.ol-zoom-out.ol-has-tooltip:hover [role=tooltip]{top:232px}.ol-scale-line{border:1px solid #222}.ol-overviewmap{margin-bottom:30px;border:1px solid #222}.ol-overviewmap .ol-overviewmap-map{cursor:pointer;height:100px;width:100px;box-sizing:border-box;margin:0}.ol-overviewmap button{display:none}.ol-control.layer-switcher,.ol-control.ol-zoom{border:1px solid #222}.ol-control.layer-switcher{opacity:.9;margin-top:50px}.ol-control.layer-switcher button{background-image:none;font-family:"Glyphicons Halflings";display:inline-block;font-style:normal;font-weight:400;line-height:1;color:#333;font-size:25px}.ol-control.layer-switcher button:before{content:""}.ol-control.layer-switcher button:focus{outline:0}.ol-control.layer-switcher button:focus~.panel{display:block}.ol-control.layer-switcher .panel{margin-bottom:0}.ol-control.layer-switcher .panel ul{margin-bottom:0;padding:5px 8px}.ol-control.layer-switcher .panel ul li input{width:auto;margin-right:10px}.ol-control.layer-switcher .panel ul li label{float:none;clear:none;margin-bottom:0}.info-tooltip{position:relative;color:#fff;background-color:#000;padding:5px 10px;opacity:.8;border-radius:5px;font-size:.8em}.info-tooltip .icon{-animation:spin .7s infinite linear;-webkit-animation:spin2 .7s infinite linear}.info-tooltip .close{position:absolute;top:5px;right:5px;color:#fff;opacity:.6;font-size:10px}.info-tooltip .close:hover{opacity:1}@-webkit-keyframes spin2{from{-webkit-transform:rotate(0)}to{-webkit-transform:rotate(360deg)}}@keyframes spin{from{transform:scale(1) rotate(0)}to{transform:scale(1) rotate(360deg)}}.info-tooltip .arrow{position:absolute;display:block;width:0;height:0;border-color:transparent;border-style:solid;left:50%;margin-left:-6px;border-bottom-width:0;border-top-color:#000;bottom:-11px;border-width:6px}.measure-tooltip{position:absolute;color:#fff;background-color:#000;padding:5px 10px;opacity:.8;border-radius:5px;font-size:.8em;bottom:20px;white-space:nowrap;pointer-events:none}

            </style>
            <style>
                :host {
                    display: none;
                    position: relative;
                    --vl-map--margin-top: 0px;
                }
                
                #map {
                    height: calc(var(--vl-map-height, 500px) - var(--vl-map--margin-top)); 
                    width: 100%;
                }
                
                .ol-zoom, .ol-zoomslider, .ol-rotate {
                    margin-top: var(--vl-map--margin-top) !important;
                }
                
                .ol-overlaycontainer-stopevent > .ol-zoom {
                    border-radius: 0;
                }
                
                .ol-overlaycontainer-stopevent > .ol-overviewmap {
                    border-radius: 0;
                    width: 100px;
                    height: 100px;
                }
                
                .ol-overlaycontainer-stopevent > .ol-scale-line {
                    border-radius: 0;
                    background-color: white;
                }
                
                .ol-overlaycontainer-stopevent > .ol-scale-line .ol-scale-line-inner {
                    border-color: black;
                    color: black;
                }
                
                .ol-overlaycontainer-stopevent > .ol-control {
                    margin-top: 0;
                }
                
                .ol-overlaycontainer-stopevent > .ol-zoomslider {
                    background: none;
                }
                
                .ol-overlaycontainer-stopevent > .ol-zoomslider .ol-zoomslider-thumb {
                    margin-bottom: 5px;
                }
            </style>

            <div id="map"></div>
        `);

        this.__prepareReadyPromises();
    }

    /**
     * Geeft een Promise terug die resolved wanneer de kaart klaar is voor verder gebruik.
     *
     * @returns {Promise<void>}
     */
    get ready() {
        return this.__ready;
    }

    __prepareReadyPromises() {
        this.__mapReady = new Promise(resolve => this.__mapReadyResolver = resolve);
        this.__overviewMapReady = new Promise(resolve => this.__overviewMapReadyResolver = resolve);
        this.__ready = Promise.all([this.__mapReady, this.__overviewMapReady]);
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

    get disableMouseWheelZoom() {
        return this.getAttribute('disable-mouse-wheel-zoom') != undefined;
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
            disableMouseWheelZoom: this.disableMouseWheelZoom,
            customLayers: {
                baseLayerGroup: this.__createLayerGroup('Basis lagen', []),
                overviewMapLayers: [],
                overlayGroup: this.__createLayerGroup('Lagen', [])
            },
            projection: this._projection,
            target: this._mapElement
        });

        this._map.initializeView();
        this.__updateMapSizeOnLoad();
        this.__updateOverviewMapSizeOnLoad();
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
        this.__mapReadyResolver();
    }

    __updateOverviewMapSize() {
        if (this._map.overviewMapControl) {
            this._map.overviewMapControl.getOverviewMap().updateSize();
        }
        this.__overviewMapReadyResolver();
    }

    __updateOverviewMapSizeOnLoad() {
        VlMap.__callOnceOnLoad(this.__updateOverviewMapSize.bind(this));
    }

    __updateMapSizeOnLoad() {
        VlMap.__callOnceOnLoad(this.__updateMapSize.bind(this));
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

    static __callOnceOnLoad(callback) {
        if (document.readyState === 'complete') {
            callback();
        } else {
            window.addEventListener('load', callback, { once: true });
        }
    }
}

