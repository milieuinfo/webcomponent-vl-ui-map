import {VlMapLayer} from '/src/vl-map-layer.js';
import {OlWMTSSource, OlWMTSTileGrid, OlTileLayer, OlExtent} from '/node_modules/vl-mapactions/dist/vl-mapactions.js';
/**
 * VlMapWmtsLayer
 * 
 * @class
 * @classdesc Een WMTS (overlay) layer
 * 
 * @extends VlMapBaseLayer
 * 
 * @see {@link https://www.github.com/milieuinfo/webcomponent-vl-ui-map/releases/latest|Release notes}
 * @see {@link https://www.github.com/milieuinfo/webcomponent-vl-ui-map/issues|Issues}
 * @see {@link https://webcomponenten.omgeving.vlaanderen.be/demo/vl-map-wmts-layer.html|Demo}
 */
export class VlMapWmtsLayer extends VlMapLayer {
	  constructor() {
	    super();
	    this._layer = this._createWmtsLayer();
	  }

	  async connectedCallback() {
	    await super.connectedCallback();
	  }
	
	
	  get _projection() {
		  if (this.parentNode) {
			  return this.parentNode._projection;
		  }
	  }

	  get url() {
		  return this.getAttribute('data-vl-url');
	  }

	  _createWmtsLayer() {
		  const size = OlExtent.getWidth(this._projection.getExtent()) / 256;
		  const resolutions = new Array(16);
		  const matrixIds = new Array(16);
		  for (let z = 0; z < 16; ++z) {
			  resolutions[z] = size / Math.pow(2, z);
			  matrixIds[z] = z;
		  }

		  const source = new OlWMTSSource({
			  url: this.url,
			  layer: this.getAttribute('data-vl-layer'),
			  matrixSet: 'BPL72VL',
			  format: 'image/png',
			  projection: this._projection,
			  tileGrid: new OlWMTSTileGrid({
				  extent: this._projection.getExtent(),
				  origin: OlExtent.getTopLeft(this._projection.getExtent()),
				  resolutions: resolutions,
				  matrixIds: matrixIds,
			  }),
			  style: '',
		  });

		  const layer = new OlTileLayer({
			  title: this._name,
			  source: source,
			  minResolution: this._minResolution,
			  maxResolution: this._maxResolution,
		  });
		  layer.set('id', VlMapLayer._counter);
		  return layer;
	  }

}
