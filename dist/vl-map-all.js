import {define, awaitScript} from '/node_modules/vl-ui-core/dist/vl-core.js';

import {VlMap} from '/node_modules/vl-ui-map/dist/vl-map.js';
import {VlMapOverviewMap} from '/node_modules/vl-ui-map/dist/vl-map-overview-map.js';
import {VlMapLayer} from '/node_modules/vl-ui-map/dist/vl-map-layer.js';
import {VlMapBaseLayer} from '/node_modules/vl-ui-map/dist/vl-map-baselayer.js';
import {VlMapBaseLayerGRBGray} from '/node_modules/vl-ui-map/dist/vl-map-baselayer-grb-gray.js';
import {VlMapBaseLayerGRB} from '/node_modules/vl-ui-map/dist/vl-map-baselayer-grb.js';
import {VlMapBaseLayerGRBOrtho} from '/node_modules/vl-ui-map/dist/vl-map-baselayer-grb-ortho.js';
import {VlMapAction} from '/node_modules/vl-ui-map/dist/vl-map-action.js';
import {VlMapSelectAction} from '/node_modules/vl-ui-map/dist/vl-map-select-action.js';
import {VlMapLayerStyle} from '/node_modules/vl-ui-map/dist/vl-map-layer-style.js';
import {VlMapLayerCircleStyle} from '/node_modules/vl-ui-map/dist/vl-map-layer-circle-style.js';
import {VlMapSearch} from '/node_modules/vl-ui-map/dist/vl-map-search.js';

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
