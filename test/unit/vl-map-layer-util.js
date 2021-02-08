const LAYER_SELECTOR = '[data-vl-is-layer]';

export function testOpvragenVanTitel(fixture, expectedTitle) {
  test('kan een attribuut, titel, opvragen van de kaartlaag op basis van zijn sleutel', async () => {
    const map = fixture();
    await map.ready;
    const layer = getLayer(map);

    assert.equal(layer.get('title'), expectedTitle);
    assert.equal(layer.get('title'), layer._layer.get('title'));
  });
}

export function testVisibility(fixture) {
  test('kan de zichtbaarheid van de kaartlaag opvragen en wijzigen', async () => {
    const map = fixture();
    await map.ready;
    const layer = getLayer(map);

    assert.isTrue(layer.visible);
    assert.isTrue(layer._layer.getVisible());

    layer.visible = false;
    assert.isFalse(layer.visible);
    assert.isFalse(layer._layer.getVisible());
  });
}

export function testIDs(fixture, expectedNumberOfLayers) {
  test('elke kaartlaag zal een id krijgen', async () => {
    const map = fixture();
    await map.ready;
    const layers = getLayers(map);

    assert.lengthOf(layers, expectedNumberOfLayers);
    layers.forEach((layer, index) => assert(layer.layer.get('id'), index + 1));
  });
}

export function testToevoegingAanMap(fixture) {
  test('de kaartlaag zal toegevoegd worden aan de map', async () => {
    const map = fixture();
    await map.ready;

    const layerElement = getLayer(map);

    const layers = map.map.getOverlayLayers();
    assert.lengthOf(layers, 1);

    const layer = layers[0];
    assert.equal(layer, layerElement.layer);
    assert.equal(layer.get('title'), layerElement.getAttribute('name'));
    assert.equal(layer.getMinResolution(), layerElement.getAttribute('min-resolution'));
    assert.equal(layer.getMaxResolution(), layerElement.getAttribute('max-resolution'));
  });
}

export function testVisibilityAtResolution(fixture, minVisibility, maxVisibility) {
  minVisibility = minVisibility || 0;
  maxVisibility = maxVisibility || Infinity;

  test(`er kan gecontroleerd worden of de kaartlaag zichtbaar is op een bepaalde resolutie (minVisibility = ${minVisibility}, maxVisibility = ${maxVisibility})`, async () => {
    const map = fixture();
    await map.ready;
    const layer = getLayer(map);

    if (minVisibility > 0) {
      assert.isFalse(layer.isVisibleAtResolution(null));
    }

    const visibleResolutions = range(
        minVisibility,
        maxVisibility === Infinity ? minVisibility + 10 : maxVisibility,
    );
    let invisibleResolutions = range(0, minVisibility);
    if (maxVisibility !== Infinity) {
      invisibleResolutions = invisibleResolutions.concat(range(maxVisibility, maxVisibility + 5));
    }

    invisibleResolutions.forEach((resolution) =>
      assert.isFalse(
          layer.isVisibleAtResolution(resolution),
          `zou niet zichtbaar mogen zijn op resolutie ${resolution}`,
      ),
    );
    visibleResolutions.forEach((resolution) =>
      assert.isTrue(
          layer.isVisibleAtResolution(resolution),
          `zou zichtbaar moeten zijn op resolutie ${resolution}`,
      ),
    );
  });
}

function getLayer(map) {
  return map.querySelector(LAYER_SELECTOR);
}

function getLayers(map) {
  return map.querySelectorAll(LAYER_SELECTOR);
}

function range(minInclusive, maxExclusive) {
  return Array.from({length: maxExclusive - minInclusive}, (x, i) => i + minInclusive);
}
