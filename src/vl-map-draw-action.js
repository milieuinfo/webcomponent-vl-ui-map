import {VlMapLayerAction} from '/src/vl-map-layer-action.js';
import {VlMapVectorLayer} from '/src/vl-map-vector-layer.js';
import {VlCompositeVectorLayer} from '/node_modules/vl-mapactions/dist/vl-mapactions.js';

/**
 * VlMapDrawAction
 * @class
 * @classdesc De abstracte kaart teken actie component.
 *
 * @extends VlMapLayerAction
 *
 * @see {@link https://www.github.com/milieuinfo/webcomponent-vl-ui-map/releases/latest|Release notes}
 * @see {@link https://www.github.com/milieuinfo/webcomponent-vl-ui-map/issues|Issues}
 * @see {@link https://webcomponenten.omgeving.vlaanderen.be/demo/vl-map-draw-actions.html|Demo}
 */
export class VlMapDrawAction extends VlMapLayerAction {
  /**
   * Zet de functie die wordt uitgevoerd na het uitvoeren van de teken actie
   *
   * @param {Function} callback functie met volgende argumenten:
   *                            - {ol.Feature} de getekende feature
   *                            - {Function} reject callback zonder argument waarbij de feature terug wordt verwijderd
   */
  onDraw(callback) {
    this.__callback = callback;
  }

  get __drawOptions() {
    if (this.dataset.vlSnapping !== undefined) {
      const snappingLayers = this.__snappingLayers;
      if (snappingLayers.length == 0) {
        return {snapping: true};
      } else {
        return {
          snapping: {
            layer: this.__createSnappingLayer(),
            pixelTolerance: this.dataset.vlSnappingPixelTolerance || 10,
            node: false,
            vertex: false,
          },
        };
      }
    } else {
      return {};
    }
  }

  __createSnappingLayer() {
    const snappingLayer = new VlCompositeVectorLayer(this.__snappingLayers.map((layer) => layer._layer), {});
    const firstVectorLayer = this.__snappingLayers[0];
    snappingLayer.setStyle(firstVectorLayer.style);
    firstVectorLayer.addEventListener(VlMapVectorLayer.EVENTS.styleChanged, (event) => {
      snappingLayer.setStyle(event.target.style);
    });
    return snappingLayer;
  }

  get __snappingLayers() {
    return Array.from(this.querySelectorAll('vl-map-wfs-layer'));
  }
}
