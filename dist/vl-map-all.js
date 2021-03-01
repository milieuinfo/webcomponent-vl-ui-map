import {awaitScript, define} from '/node_modules/vl-ui-core/dist/vl-core.js';

import {VlMap} from '/node_modules/vl-ui-map/dist/vl-map.js';
import {VlMapOverviewMap} from '/node_modules/vl-ui-map/dist/vl-map-overview-map.js';
import {VlMapLayer} from '/node_modules/vl-ui-map/dist/vl-map-layer.js';
import {VlMapVectorLayer} from '/node_modules/vl-ui-map/dist/vl-map-vector-layer.js';
import {VlMapFeaturesLayer} from '/node_modules/vl-ui-map/dist/vl-map-features-layer.js';
import {VlMapTiledWmsLayer} from '/node_modules/vl-ui-map/dist/vl-map-tiled-wms-layer.js';
import {VlMapImageWmsLayer} from '/node_modules/vl-ui-map/dist/vl-map-image-wms-layer.js';
import {VlMapWfsLayer} from '/node_modules/vl-ui-map/dist/vl-map-wfs-layer.js';
import {VlMapWmtsLayer} from '/node_modules/vl-ui-map/dist/vl-map-wmts-layer.js';
import {VlMapBaseLayer} from '/node_modules/vl-ui-map/dist/vl-map-baselayer.js';
import {VlMapBaseLayerGRBGray} from '/node_modules/vl-ui-map/dist/vl-map-baselayer-grb-gray.js';
import {VlMapBaseLayerGRB} from '/node_modules/vl-ui-map/dist/vl-map-baselayer-grb.js';
import {VlMapBaseLayerGRBOrtho} from '/node_modules/vl-ui-map/dist/vl-map-baselayer-grb-ortho.js';
import {VlMapAction} from '/node_modules/vl-ui-map/dist/vl-map-action.js';
import {VlMapLayerAction} from '/node_modules/vl-ui-map/dist/vl-map-layer-action.js';
import {VlMapSelectAction} from '/node_modules/vl-ui-map/dist/vl-map-select-action.js';
import {VlMapDeleteAction} from '/node_modules/vl-ui-map/dist/vl-map-delete-action.js';
import {VlMapDrawPointAction} from '/node_modules/vl-ui-map/dist/vl-map-draw-point-action.js';
import {VlMapDrawLineAction} from '/node_modules/vl-ui-map/dist/vl-map-draw-line-action.js';
import {VlMapDrawPolygonAction} from '/node_modules/vl-ui-map/dist/vl-map-draw-polygon-action.js';
import {VlMapLayerStyle} from '/node_modules/vl-ui-map/dist/vl-map-layer-style.js';
import {VlMapLayerCircleStyle} from '/node_modules/vl-ui-map/dist/vl-map-layer-circle-style.js';
import {VlMapSearch} from '/node_modules/vl-ui-map/dist/vl-map-search.js';
import {VlMapSideSheet} from '/node_modules/vl-ui-map/dist/vl-map-side-sheet.js';
import {VlMapLayerSwitcher} from '/node_modules/vl-ui-map/dist/vl-map-layer-switcher.js';
import {VlMapSideSheetMenu} from '/node_modules/vl-ui-map/dist/vl-map-side-sheet-menu.js';
import {VlMapSideSheetMenuItem} from '/node_modules/vl-ui-map/dist/vl-map-side-sheet-menu-item.js';
import {VlMapModifyAction} from '/node_modules/vl-ui-map/dist/vl-map-modify-action.js';
import {VlSelectLocation} from '/node_modules/vl-ui-map/dist/vl-select-location.js';

Promise.all([
  awaitScript('vl-map-proj4', '/node_modules/proj4/dist/proj4.js'),
]).then(() => {
  define('vl-map', VlMap);
  define('vl-map-overview-map', VlMapOverviewMap);
  define('vl-map-features-layer', VlMapFeaturesLayer);
  define('vl-map-tiled-wms-layer', VlMapTiledWmsLayer);
  define('vl-map-image-wms-layer', VlMapImageWmsLayer);
  define('vl-map-wfs-layer', VlMapWfsLayer);
  define('vl-map-wmts-layer', VlMapWmtsLayer);
  define('vl-map-baselayer', VlMapBaseLayer);
  define('vl-map-baselayer-grb-gray', VlMapBaseLayerGRBGray);
  define('vl-map-baselayer-grb', VlMapBaseLayerGRB);
  define('vl-map-baselayer-grb-ortho', VlMapBaseLayerGRBOrtho);
  define('vl-map-action', VlMapAction);
  define('vl-map-layer-action', VlMapLayerAction);
  define('vl-map-select-action', VlMapSelectAction);
  define('vl-map-delete-action', VlMapDeleteAction);
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
  define('vl-map-modify-action', VlMapModifyAction);
});

export {
  VlMap,
  VlMapOverviewMap,
  VlMapLayer,
  VlMapVectorLayer,
  VlMapFeaturesLayer,
  VlMapImageWmsLayer,
  VlMapTiledWmsLayer,
  VlMapWfsLayer,
  VlMapWmtsLayer,
  VlMapBaseLayer,
  VlMapBaseLayerGRBGray,
  VlMapBaseLayerGRB,
  VlMapBaseLayerGRBOrtho,
  VlMapAction,
  VlMapLayerAction,
  VlMapSelectAction,
  VlMapDeleteAction,
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
  VlMapModifyAction,
  VlSelectLocation,
};
