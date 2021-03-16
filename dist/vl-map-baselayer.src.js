import {define, vlElement} from 'vl-ui-core';
import {
  OlGeoJSON,
  OlLoadingstrategy,
  OlStyle,
  OlStyleFill,
  OlStyleStroke,
  OlTileLayer,
  OlVectorLayer,
  OlVectorSource,
  OlWMTSSource
} from 'vl-mapactions/dist/vl-mapactions.js';

import {optionsFromCapabilities} from 'ol/source/WMTS.js';
import WMTSCapabilities from 'ol/format/WMTSCapabilities.js';

/**
 * VlMapBaseLayer
 * @class
 * @classdesc De kaart basis laag component.
 *
 * @extends HTMLElement
 * @mixes vlElement
 *
 * @property {(wmts | wfs )} data-vl-type - Attribuut wordt gebruikt om aan te geven wat het type is van de kaartlaag.
 * @property {string} data-vl-url - Attribuut geeft aan via welke URL gebruikt wordt om de kaartlaag op te halen.
 * @property {string} data-vl-layer - Attribuut geeft aan wat de kaartlaag identifier is.
 * @property {string} data-vl-title - Attribuut bepaalt de titel van de kaartlaag.
 *
 * @see {@link https://www.github.com/milieuinfo/webcomponent-vl-ui-map/releases/latest|Release notes}
 * @see {@link https://www.github.com/milieuinfo/webcomponent-vl-ui-map/issues|Issues}
 * @see {@link https://webcomponenten.omgeving.vlaanderen.be/demo/vl-map.html|Demo}
 */
export class VlMapBaseLayer extends vlElement(HTMLElement) {
  async connectedCallback() {
    await this._configureMap();
  }

  /**
   * Geeft het kaartlaag type terug.
   *
   * @Return {string}
   */
  get type() {
    return this.getAttribute('type') || 'wmts';
  }

  /**
   * Geeft de kaartlaag URL terug.
   *
   * @Return {string}
   */
  get url() {
    return this.getAttribute('url');
  }

  /**
   * Geeft de kaartlaag identifier terug.
   *
   * @Return {string}
   */
  get layer() {
    return this.getAttribute('layer');
  }

  /**
   * Geeft de kaartlaag titel terug.
   *
   * @Return {string}
   */
  get title() {
    return this.getAttribute('title');
  }

  get _map() {
    if (this.parentNode) {
      return this.parentNode.map;
    }
  }

  get _projection() {
    if (this.parentNode) {
      return this.parentNode._projection;
    }
  }

  async _WMTSSource() {
    this._wmtsSource = this._wmtsSource || await this._createWMTSSource();
    return this._wmtsSource;
  }

  get _vectorSource() {
    this._createdVectorSource = this._createdVectorSource || this._createVectorSource();
    return this._createdVectorSource;
  }

  async _configureMap() {
    if (this._map) {
      this._map.addBaseLayerAndOverlayMapLayer(await this._createBaseLayer(), await this._createBaseLayer());
      // nodig anders is map initially blanc
      this._map.render();
    }
  }

  async _createWMTSSource() {
    const params = {
      'request': 'getcapabilities',
      'service': 'wmts',
      'version': '1.0.0',
    };

    const urlConstruct = new URL(this.url);
    urlConstruct.search = new URLSearchParams(params);

    const response = await fetch(urlConstruct.href).then((response) => response.text());
    const parser = new WMTSCapabilities();
    const val = optionsFromCapabilities(parser.read(response), {
      layer: this.layer,
      matrixSet: 'BPL72VL',
    });
    return new OlWMTSSource(val);
  }

  _createVectorSource() {
    const self = this;
    return new OlVectorSource({
      format: new OlGeoJSON({
        dataProjection: self._projection,
      }),
      url: function() {
        return self.url + '&typeName=' + self.layer;
      },
      strategy: OlLoadingstrategy.bbox,
    });
  }

  async _createBaseLayer() {
    switch (this.type) {
      case 'wmts':
        return new OlTileLayer({
          title: this.title,
          type: 'base',
          source: await this._WMTSSource(),
        });
      case 'wfs':
        return new OlVectorLayer({
          source: this._vectorSource,
          style: new OlStyle({
            stroke: new OlStyleStroke({
              color: 'rgba(0, 0, 0, 1.0)',
              width: 1,
            }),
            fill: new OlStyleFill({
              color: 'rgba(255, 0, 0, 1.0)',
            }),
          }),
        });
    }
  }
}

define('vl-map-baselayer', VlMapBaseLayer);

