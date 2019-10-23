import { define, awaitScript } from '/node_modules/vl-ui-core/vl-core.js';
import { VlMap } from "./src/vl-map";
import { VlMapOverviewMap } from "./src/vl-map-overview-map";
import { VlMapLayer } from "./src/vl-map-layer";
import { VlMapBaseLayer } from "./src/vl-map-baselayer";
import { VlMapBaseLayerGRBGray } from "./src/vl-map-baselayer-grb-gray";
import { VlMapBaseLayerGRB } from "./src/vl-map-baselayer-grb";
import { VlMapBaseLayerGRBOrtho } from "./src/vl-map-baselayer-grb-ortho";
import { VlMapAction } from "./src/vl-map-action";
import { VlMapSelectAction } from "./src/vl-map-select-action";
import { VlMapLayerStyle } from "./src/vl-map-layer-style";
import { VlMapLayerCircleStyle } from "./src/vl-map-layer-circle-style";
import { VlMapSearch } from "./src/vl-map-search";

Promise.all([
    awaitScript('vl-map-openlayers', '/node_modules/vl-mapactions/lib/openlayers/dist/ol.js'),
    awaitScript('vl-map-proj4', '/node_modules/proj4/dist/proj4.js'),
    awaitScript('vl-map-mapactions', '/node_modules/vl-mapactions/dist/mapactions-min.js')]
).then(() => {
    define('vl-map', VlMap);
    define('vl-map-overview-map', VlMapOverviewMap);
    define('vl-map-layer', VlMapLayer);
    define('vl-map-baselayer', VlMapBaseLayer);
    define('vl-map-baselayer-grb-gray', VlMapBaseLayerGRBGray);
    define('vl-map-baselayer-grb', VlMapBaseLayerGRB);
    define('vl-map-baselayer-grb-ortho', VlMapBaseLayerGRBOrtho);
    define('vl-map-action', VlMapAction);
    define('vl-map-select-action', VlMapSelectAction);
    define('vl-map-layer-style', VlMapLayerStyle);
    define('vl-map-layer-circle-style', VlMapLayerCircleStyle);
    define('vl-map-search', VlMapSearch);
});

export * from "./src/vl-map";
export * from "./src/vl-map-overview-map";
export * from "./src/vl-map-layer";
export * from "./src/vl-map-baselayer";
export * from "./src/vl-map-baselayer-grb-gray";
export * from "./src/vl-map-baselayer-grb";
export * from "./src/vl-map-baselayer-grb-ortho";
export * from "./src/vl-map-action";
export * from "./src/vl-map-select-action";
export * from "./src/vl-map-layer-style";
export * from "./src/vl-map-layer-circle-style";
export * from "./src/vl-map-search";
