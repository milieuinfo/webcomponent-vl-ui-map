import {define} from 'vl-ui-core';
import {VlMapDrawAction} from '../dist/vl-map-draw-action.src.js';
import {VlDrawAction, OlGeometryType, VlCompositeVectorLayer} from 'vl-mapactions/dist/vl-mapactions.js';

/**
 * VlMapDrawPointAction
 * @class
 * @classdesc De kaart teken actie component.
 *
 * @extends VlMapDrawAction
 *
 * @see {@link https://www.github.com/milieuinfo/webcomponent-vl-ui-map/releases/latest|Release notes}
 * @see {@link https://www.github.com/milieuinfo/webcomponent-vl-ui-map/issues|Issues}
 * @see {@link https://webcomponenten.omgeving.vlaanderen.be/demo/vl-map-draw-actions.html|Demo}
 */
export class VlMapDrawPointAction extends VlMapDrawAction {
  _createAction(layer) {
    const options = {};
    if (this.dataset.vlSnapping !== undefined) {
      const wfsLayers = Array.from(this.querySelectorAll('vl-map-wfs-layer')).map((layer) => layer._layer);
      if (wfsLayers.length == 0) {
        options.snapping = true;
      } else {
        const snappingLayer = new VlCompositeVectorLayer(wfsLayers, {title: 'Snapping Layer'});
        const firstVectorLayer = Array.from(this.querySelectorAll('vl-map-wfs-layer'))[0];
        snappingLayer.setStyle(firstVectorLayer.style);
        firstVectorLayer.addEventListener('style-changed', (event) => {
          snappingLayer.setStyle(event.target.style);
        });
        options.snapping = {
          layer: snappingLayer,
          pixelTolerance: this.dataset.vlSnappingPixelTolerance || 10,
          node: false,
          vertex: false,
        };
      }
    }
    return new VlDrawAction(layer, OlGeometryType.POINT, this._callback, options);
  }
}

define('vl-map-draw-point-action', VlMapDrawPointAction);

