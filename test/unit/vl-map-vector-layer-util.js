import {getLayer} from './vl-map-layer-util.js';
import {OlStyle, OlStyleFill} from '/node_modules/vl-mapactions/dist/vl-mapactions.js';

export function testConfigurerenVanStijlMetVlMapLayerStyle(fixture, styleFixture) {
  test('de stijl kan op de layer gezet worden met een VlMapLayerStyle object', async () => {
    const map = fixture();
    const styleElement = styleFixture();
    await map.ready;
    const layer = getLayer(map);

    layer.style = styleElement;

    const style = layer.style()[0];
    assert.equal(style.getFill().getColor(), 'rgba(255,0,0,1)');
    assert.equal(style.getStroke().getColor(), 'rgba(2, 85, 204, 1)');
  });
}

export function testConfigurerenVanStijlMetOlStyle(fixture) {
  test('de stijl kan op de layer gezet worden met een openlayers stijl object', async () => {
    const map = fixture();
    await map.ready;
    const layer = getLayer(map);

    layer.style = new OlStyle({fill: new OlStyleFill({
      color: 'rgba(255,0,0,0,1)',
    })});

    assert.equal(layer.style.getFill().getColor(), 'rgba(255,0,0,0,1)');
  });
}

export function testNullifyStijl(fixture) {
  test('de stijl kan op de layer verwijderd worden met null', async () => {
    const map = fixture();
    await map.ready;
    const layer = getLayer(map);

    layer.style = new OlStyle({fill: new OlStyleFill({
      color: 'rgba(255,0,0,0,1)',
    })});
    layer.style = null;

    assert.isNull(layer.style);
  });
}
