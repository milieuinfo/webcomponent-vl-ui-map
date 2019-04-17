import { VlElement } from "/node_modules/vl-ui-core/vl-core.js";

/**
 * VlMapLayer
 * @class
 * @classdesc De kaart layer component. <a href="demo/vl-map.html">Demo</a>.
 *
 * @extends VlElement
 */
export class VlMapLayer extends VlElement(HTMLElement) {
    connectedCallback() {
        this._map.addBaseLayerAndOverlayMapLayer(this._createBaseLayer(), this._createBaseLayer());
    }

    get type() {
        return this.getAttribute('type') || 'wmts';
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
            url: function(extent) {
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