import {VlRegisterElement} from '/node_modules/vl-ui-core/vl-core.js';
import {VlMap} from "./src/vl-map";
import {VlMapLayer} from "./src/vl-map-layer";
import {VlMapBaseLayer} from "./src/vl-map-baselayer";
import {VlMapBaseLayerGRBGray} from "./src/vl-map-baselayer-grb-gray";
import {VlMapBaseLayerGRB} from "./src/vl-map-baselayer-grb";
import {VlMapBaseLayerGRBOrtho} from "./src/vl-map-baselayer-grb-ortho";
import {VlMapAction} from "./src/vl-map-action";
import {VlMapSelectAction} from "./src/vl-map-select-action";
import {VlMapLayerStyle} from "./src/vl-map-layer-style";
import {VlMapLayerCircleStyle} from "./src/vl-map-layer-circle-style";

(() => {
    loadScript('VlMap-openlayers', '/node_modules/vl-mapactions/lib/openlayers/dist/ol.js');
    loadScript('VlMap-proj4', '/node_modules/proj4/dist/proj4.js');
    loadScript('VlMap-mapactions', '/node_modules/vl-mapactions/dist/mapactions-min.js', () => {
        VlRegisterElement(() => {
            customElements.define('vl-map', VlMap);
            customElements.define('vl-map-layer', VlMapLayer);
            customElements.define('vl-map-baselayer', VlMapBaseLayer);
            customElements.define('vl-map-baselayer-grb-gray', VlMapBaseLayerGRBGray);
            customElements.define('vl-map-baselayer-grb', VlMapBaseLayerGRB);
            customElements.define('vl-map-baselayer-grb-ortho', VlMapBaseLayerGRBOrtho);
            customElements.define('vl-map-action', VlMapAction);
            customElements.define('vl-map-select-action', VlMapSelectAction);
            customElements.define('vl-map-layer-style', VlMapLayerStyle);
            customElements.define('vl-map-layer-circle-style', VlMapLayerCircleStyle);
        });
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

export * from "./src/vl-map";
export * from "./src/vl-map-layer";
export * from "./src/vl-map-baselayer";
export * from "./src/vl-map-baselayer-grb-gray";
export * from "./src/vl-map-baselayer-grb";
export * from "./src/vl-map-baselayer-grb-ortho";
export * from "./src/vl-map-action";
export * from "./src/vl-map-select-action";
export * from "./src/vl-map-layer-style";
export * from "./src/vl-map-layer-circle-style";