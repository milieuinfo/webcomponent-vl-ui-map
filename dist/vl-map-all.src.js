import {define, awaitScript} from 'vl-ui-core';

import {VlMap} from 'vl-ui-accordion/dist/vl-map.src.js';
import {VlMapOverviewMap} from 'vl-ui-accordion/dist/vl-map-overview-map.src.js';
import {VlMapLayer} from 'vl-ui-accordion/dist/vl-map-layer.src.js';
import {VlMapBaseLayer} from 'vl-ui-accordion/dist/vl-map-baselayer.src.js';
import {VlMapBaseLayerGRBGray} from 'vl-ui-accordion/dist/vl-map-baselayer-grb-gray.src.js';
import {VlMapBaseLayerGRB} from 'vl-ui-accordion/dist/vl-map-baselayer-grb.src.js';
import {VlMapBaseLayerGRBOrtho} from 'vl-ui-accordion/dist/vl-map-baselayer-grb-ortho.src.js';
import {VlMapAction} from 'vl-ui-accordion/dist/vl-map-action.src.js';
import {VlMapSelectAction} from 'vl-ui-accordion/dist/vl-map-select-action.src.js';
import {VlMapLayerStyle} from 'vl-ui-accordion/dist/vl-map-layer-style.src.js';
import {VlMapLayerCircleStyle} from 'vl-ui-accordion/dist/vl-map-layer-circle-style.src.js';
import {VlMapSearch} from 'vl-ui-accordion/dist/vl-map-search.src.js';

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

