import {VlMap} from "./src/vl-map";
import {VlMapLayer} from "./src/vl-map-layer";
import {VlMapLayerGRBGray} from "./src/vl-map-layer-grb-gray";
import {VlMapLayerGRB} from "./src/vl-map-layer-grb";
import {VlMapLayerGRBOrtho} from "./src/vl-map-layer-grb-ortho";

(() => {
    loadScript('VlMap-openlayers.js', '/node_modules/vl-mapactions/lib/openlayers/dist/ol.js');
    loadScript('VlMap-openlayers.js', '/node_modules/proj4/dist/proj4.js');
    loadScriptSynchronous('VlMap-mapactions.js', '/node_modules/vl-mapactions/dist/mapactions.js', () => {
        customElements.define('vl-map', VlMap);
        customElements.define('vl-map-layer', VlMapLayer);
        customElements.define('vl-map-layer-grb-gray', VlMapLayerGRBGray);
        customElements.define('vl-map-layer-grb', VlMapLayerGRB);
        customElements.define('vl-map-layer-grb-ortho', VlMapLayerGRBOrtho);
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

export * from "./src/vl-map";
export * from "./src/vl-map-layer";
export * from "./src/vl-map-layer-grb-gray";
export * from "./src/vl-map-layer-grb";
export * from "./src/vl-map-layer-grb-ortho";