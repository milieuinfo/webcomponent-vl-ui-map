import {define, awaitScript} from 'vl-ui-core';

import {VlMap} from 'vl-ui-map/build/node/vl-map.js';
import {VlMapOverviewMap} from 'vl-ui-map/build/node/vl-map-overview-map.js';
import {VlMapLayer} from 'vl-ui-map/build/node/vl-map-layer.js';
import {VlMapBaseLayer} from 'vl-ui-map/build/node/vl-map-baselayer.js';
import {VlMapBaseLayerGRBGray} from 'vl-ui-map/build/node/vl-map-baselayer-grb-gray.js';
import {VlMapBaseLayerGRB} from 'vl-ui-map/build/node/vl-map-baselayer-grb.js';
import {VlMapBaseLayerGRBOrtho} from 'vl-ui-map/build/node/vl-map-baselayer-grb-ortho.js';
import {VlMapAction} from 'vl-ui-map/build/node/vl-map-action.js';
import {VlMapSelectAction} from 'vl-ui-map/build/node/vl-map-select-action.js';
import {VlMapLayerStyle} from 'vl-ui-map/build/node/vl-map-layer-style.js';
import {VlMapLayerCircleStyle} from 'vl-ui-map/build/node/vl-map-layer-circle-style.js';
import {VlMapSearch} from 'vl-ui-map/build/node/vl-map-search.js';

Promise.all([
  awaitScript('vl-map-openlayers', 'vl-mapactions/lib/openlayers/dist/ol.js'),
  awaitScript('vl-map-proj4', 'proj4/dist/proj4.js'),
  awaitScript('vl-map-mapactions', 'vl-mapactions/dist/mapactions-min.js'),
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
