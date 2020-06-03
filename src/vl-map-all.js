import {define, awaitScript} from '/node_modules/vl-ui-core/dist/vl-core.js';

import {VlMap} from '/src/vl-map.js';
import {VlMapOverviewMap} from '/src/vl-map-overview-map.js';
import {VlMapLayer} from '/src/vl-map-layer.js';
import {VlMapBaseLayer} from '/src/vl-map-baselayer.js';
import {VlMapBaseLayerGRBGray} from '/src/vl-map-baselayer-grb-gray.js';
import {VlMapBaseLayerGRB} from '/src/vl-map-baselayer-grb.js';
import {VlMapBaseLayerGRBOrtho} from '/src/vl-map-baselayer-grb-ortho.js';
import {VlMapAction} from '/src/vl-map-action.js';
import {VlMapSelectAction} from '/src/vl-map-select-action.js';
import {VlMapLayerStyle} from '/src/vl-map-layer-style.js';
import {VlMapLayerCircleStyle} from '/src/vl-map-layer-circle-style.js';
import {VlMapSearch} from '/src/vl-map-search.js';

Promise.all([
  awaitScript('vl-map-openlayers', '/node_modules/vl-mapactions/lib/openlayers/dist/ol.js'),
  awaitScript('vl-map-proj4', '/node_modules/proj4/dist/proj4.js'),
  awaitScript('vl-map-mapactions', '/node_modules/vl-mapactions/dist/mapactions-min.js'),
]).then(() => {
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

export {
  VlMap,
  VlMapOverviewMap,
  VlMapLayer,
  VlMapBaseLayer,
  VlMapBaseLayerGRBGray,
  VlMapBaseLayerGRB,
  VlMapBaseLayerGRBOrtho,
  VlMapAction,
  VlMapSelectAction,
  VlMapLayerStyle,
  VlMapLayerCircleStyle,
  VlMapSearch,
};
