import {vlElement, define} from '/node_modules/vl-ui-core/dist/vl-core-all.js';
import '/node_modules/vl-ui-map/dist/vl-map-all.js';

export class VlMapWithSld extends vlElement(HTMLElement) {
  constructor() {
    super();
  }

  connectedCallback() {
    this.__render();
  }

  __render() {
    const template = `
            <vl-map data-vl-allow-fullscreen>
              <vl-map-baselayer-grb-gray></vl-map-baselayer-grb-gray>
<vl-map-tiled-wms-layer
          data-vl-name="Overstromingsgevaarkaarten"
          data-vl-version="1.1.0"
          data-vl-opacity="0.7"
          data-vl-url="https://geoservice.waterinfo.be/wms"
          data-vl-layers="Overstromingsgevaarkaarten-PLUVIAAL:overstroombaar_gebied_PLU_noCC,Overstromingsgevaarkaarten-FLUVIAAL:overstroombaar_gebied_FLU_noCC">
          <vl-map-wms-style
              data-vl-sld='<StyledLayerDescriptor xmlns="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" version="1.0.0" xsi:schemaLocation="http://www.opengis.net/sld StyledLayerDescriptor.xsd">
                <NamedLayer>
                    <Name>Overstromingsgevaarkaarten-PLUVIAAL:overstroombaar_gebied_PLU_noCC</Name>
                    <UserStyle>
                        <FeatureTypeStyle>
                            <Rule>
                                <RasterSymbolizer>
                                    <Opacity>1</Opacity>
                                    <ColorMap type="values">
                                        <ColorMapEntry color="#800080" quantity="10.0"/>
                                        <ColorMapEntry color="#FFFFFF" quantity="100.0" opacity="0"/>
                                        <ColorMapEntry color="#FFFFFF" quantity="1000.0" opacity="0"/>
                                    </ColorMap>
                                </RasterSymbolizer>
                            </Rule>
                        </FeatureTypeStyle>
                    </UserStyle>
                </NamedLayer>
                <NamedLayer>
                    <Name>Overstromingsgevaarkaarten-FLUVIAAL:overstroombaar_gebied_FLU_noCC</Name>
                    <UserStyle>
                        <FeatureTypeStyle>
                            <Rule>
                                <RasterSymbolizer>
                                    <Opacity>1</Opacity>
                                    <ColorMap type="values">
                                        <ColorMapEntry color="#800080" quantity="10.0"/>
                                        <ColorMapEntry color="#FFFFFF" quantity="100.0" opacity="0"/>
                                        <ColorMapEntry color="#FFFFFF" quantity="1000.0" opacity="0"/>
                                    </ColorMap>
                                </RasterSymbolizer>
                            </Rule>
                        </FeatureTypeStyle>
                    </UserStyle>
                </NamedLayer>
            </StyledLayerDescriptor>'></vl-map-wms-style>
        </vl-map-tiled-wms-layer>
            </vl-map>
    `;
    this.shadow(template);
  }
}

Promise.all([
  customElements.whenDefined('vl-map'),
  customElements.whenDefined('vl-map-wms-style'),
]).then(() => {
  define('vl-map-with-sld', VlMapWithSld);
});
