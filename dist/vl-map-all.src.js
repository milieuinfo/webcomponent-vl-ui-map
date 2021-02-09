import {define, awaitScript} from 'vl-ui-core';

import {VlMap} from '../dist/vl-map.src.js';
import {VlMapOverviewMap} from '../dist/vl-map-overview-map.src.js';
import {VlMapLayer} from '../dist/vl-map-layer.src.js';
import {VlMapBaseLayer} from '../dist/vl-map-baselayer.src.js';
import {VlMapBaseLayerGRBGray} from '../dist/vl-map-baselayer-grb-gray.src.js';
import {VlMapBaseLayerGRB} from '../dist/vl-map-baselayer-grb.src.js';
import {VlMapBaseLayerGRBOrtho} from '../dist/vl-map-baselayer-grb-ortho.src.js';
import {VlMapAction} from '../dist/vl-map-action.src.js';
import {VlMapLayerAction} from '../dist/vl-map-layer-action.src.js';
import {VlMapSelectAction} from '../dist/vl-map-select-action.src.js';
import {VlMapDrawPointAction} from '../dist/vl-map-draw-point-action.src.js';
import {VlMapDrawLineAction} from '../dist/vl-map-draw-line-action.src.js';
import {VlMapDrawPolygonAction} from '../dist/vl-map-draw-polygon-action.src.js';
import {VlMapLayerStyle} from '../dist/vl-map-layer-style.src.js';
import {VlMapLayerCircleStyle} from '../dist/vl-map-layer-circle-style.src.js';
import {VlMapSearch} from '../dist/vl-map-search.src.js';
import {VlMapSideSheet} from '../dist/vl-map-side-sheet.src.js';
import {VlMapLayerSwitcher} from '../dist/vl-map-layer-switcher.src.js';
import {VlMapPane} from '../dist/vl-map-sidesheet-menu-item.src.js';

Promise.all([
  awaitScript('vl-map-proj4', 'proj4/dist/proj4.js'),
]).then(() => {
  define('vl-map', VlMap);
  define('vl-map-overview-map', VlMapOverviewMap);
  define('vl-map-layer', VlMapLayer);
  define('vl-map-baselayer', VlMapBaseLayer);
  define('vl-map-baselayer-grb-gray', VlMapBaseLayerGRBGray);
  define('vl-map-baselayer-grb', VlMapBaseLayerGRB);
  define('vl-map-baselayer-grb-ortho', VlMapBaseLayerGRBOrtho);
  define('vl-map-action', VlMapAction);
  define('vl-map-layer-action', VlMapLayerAction);
  define('vl-map-select-action', VlMapSelectAction);
  define('vl-map-draw-point-action', VlMapDrawPointAction);
  define('vl-map-draw-line-action', VlMapDrawLineAction);
  define('vl-map-draw-polygon-action', VlMapDrawPolygonAction);
  define('vl-map-layer-style', VlMapLayerStyle);
  define('vl-map-layer-circle-style', VlMapLayerCircleStyle);
  define('vl-map-search', VlMapSearch);
  define('vl-map-side-sheet', VlMapSideSheet);
  define('vl-map-layer-switcher', VlMapLayerSwitcher);
  define('vl-map-pane', VlMapPane);
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
  VlMapLayerAction,
  VlMapSelectAction,
  VlMapDrawPointAction,
  VlMapDrawLineAction,
  VlMapDrawPolygonAction,
  VlMapLayerStyle,
  VlMapLayerCircleStyle,
  VlMapSearch,
  VlMapSideSheet,
  VlMapLayerSwitcher,
  VlMapPane,
};

