import {define, awaitScript} from '/node_modules/vl-ui-core/dist/vl-core.js';

import {VlMap} from '/src/vl-map.js';
import {VlMapOverviewMap} from '/src/vl-map-overview-map.js';
import {VlMapLayer} from '/src/vl-map-layer.js';
import {VlMapBaseLayer} from '/src/vl-map-baselayer.js';
import {VlMapBaseLayerGRBGray} from '/src/vl-map-baselayer-grb-gray.js';
import {VlMapBaseLayerGRB} from '/src/vl-map-baselayer-grb.js';
import {VlMapBaseLayerGRBOrtho} from '/src/vl-map-baselayer-grb-ortho.js';
import {VlMapAction} from '/src/vl-map-action.js';
import {VlMapLayerAction} from '/src/vl-map-layer-action.js';
import {VlMapSelectAction} from '/src/vl-map-select-action.js';
import {VlMapDrawPointAction} from '/src/vl-map-draw-point-action.js';
import {VlMapDrawLineAction} from '/src/vl-map-draw-line-action.js';
import {VlMapDrawPolygonAction} from '/src/vl-map-draw-polygon-action.js';
import {VlMapLayerStyle} from '/src/vl-map-layer-style.js';
import {VlMapLayerCircleStyle} from '/src/vl-map-layer-circle-style.js';
import {VlMapSearch} from '/src/vl-map-search.js';
import {VlMapSideSheet} from '/src/vl-map-side-sheet.js';
import {VlMapLayerSwitcher} from '/src/vl-map-layer-switcher.js';
import {VlMapSideSheetMenu} from '/src/vl-map-side-sheet-menu.js';
import {VlMapSideSheetMenuItem} from '/src/vl-map-side-sheet-menu-item.js';
import {VlMapDeleteAction} from '/src/vl-map-delete-action.js';

Promise.all([
  awaitScript('vl-map-proj4', '/node_modules/proj4/dist/proj4.js'),
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
  define('vl-map-side-sheet-menu', VlMapSideSheetMenu);
  define('vl-map-side-sheet-menu-item', VlMapSideSheetMenuItem);
  define('vl-map-delete-action', VlMapDeleteAction);
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
  VlMapSideSheetMenu,
  VlMapSideSheetMenuItem,
  VlMapDeleteAction,
};
