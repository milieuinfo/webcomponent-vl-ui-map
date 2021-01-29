import LambertCoordinaat from '../../src/lambert-coordinaat';

describe('Lambert Coördinaat', () => {
  test('of - een vrije tekst', () => {
    const result = LambertCoordinaat.of('test');

    expect(result).toBeUndefined();
  });

  test('of - "null"', () => {
    const result = LambertCoordinaat.of(null);

    expect(result).toBeUndefined();
  });

  test('of - "undefined"', () => {
    const result = LambertCoordinaat.of(undefined);

    expect(result).toBeUndefined();
  });

  test('of - een lege string', () => {
    const result = LambertCoordinaat.of('');

    expect(result).toBeUndefined();
  });

  test('of - een geldige coördinaat', () => {
    const lambertCoordinaat = LambertCoordinaat.of('123456.78, 345232.04');

    expect(lambertCoordinaat).not.toBeNull();
    expect(lambertCoordinaat.x).toBe(123456.78);
    expect(lambertCoordinaat.y).toBe(345232.04);
    expect(lambertCoordinaat.toString()).toBe('123456.78, 345232.04');
  });

  test('of - geldige coordinaat met haakjes, gescheiden door puntkomma', () => {
    const lambertCoordinaat = LambertCoordinaat.of('(123456.78; 345232.04)');

    expect(lambertCoordinaat).not.toBeNull();
    expect(lambertCoordinaat.x).toBe(123456.78);
    expect(lambertCoordinaat.y).toBe(345232.04);
    expect(lambertCoordinaat.toString()).toBe('123456.78, 345232.04');
  });
});

describe('Lambert Coördinaat - RegEx', () => {
  test('Matched met: een geldige coördinaat', () => {
    const searchInput = '104719.27, 192387.25';

    const result = searchInput.match(LambertCoordinaat.REGEX);

    expect(result[0]).toBe(searchInput);
    expect(result[1]).toBe('104719.27');
    expect(result[2]).toBe('192387.25');
  });

  test('Matched met: een x-coördinaat zonder decimaal getal', () => {
    const searchInput = '104719, 192387.25';

    const result = searchInput.match(LambertCoordinaat.REGEX);

    expect(result[0]).toBe(searchInput);
    expect(result[1]).toBe('104719');
    expect(result[2]).toBe('192387.25');
  });

  test('Matched met: een x en y-coördinaat zonder decimaal getal', () => {
    const searchInput = '104719, 192387';

    const result = searchInput.match(LambertCoordinaat.REGEX);

    expect(result[0]).toBe(searchInput);
    expect(result[1]).toBe('104719');
    expect(result[2]).toBe('192387');
  });

  test('Matched met: een y-coördinaat zonder decimaal getal', () => {
    const searchInput = '104719.27, 192387';

    const result = searchInput.match(LambertCoordinaat.REGEX);

    expect(result[0]).toBe(searchInput);
    expect(result[1]).toBe('104719.27');
    expect(result[2]).toBe('192387');
  });

  test('Matched met: een coördinaat met gehele getallen', () => {
    const searchInput = '104, 19';

    const result = searchInput.match(LambertCoordinaat.REGEX);

    expect(result[0]).toBe(searchInput);
    expect(result[1]).toBe('104');
    expect(result[2]).toBe('19');
  });

  test('Matched met: een coördinaat gescheiden door een punt komma', () => {
    const searchInput = '104719.27; 192387.25';

    const result = searchInput.match(LambertCoordinaat.REGEX);

    expect(result[0]).toBe(searchInput);
    expect(result[1]).toBe('104719.27');
    expect(result[2]).toBe('192387.25');
  });

  test('Matched met: een coördinaat gescheiden door een komma', () => {
    const searchInput = '104719.27, 192387.25';

    const result = searchInput.match(LambertCoordinaat.REGEX);

    expect(result[0]).toBe(searchInput);
    expect(result[1]).toBe('104719.27');
    expect(result[2]).toBe('192387.25');
  });

  test('Matched met: een coördinaat met haakjes', () => {
    const searchInput = '(104719.27; 192387.25)';

    const result = searchInput.match(LambertCoordinaat.REGEX);

    expect(result[0]).toBe(searchInput);
    expect(result[1]).toBe('104719.27');
    expect(result[2]).toBe('192387.25');
  });

  test('Matched met: een coördinaat met enkel een starthaakje', () => {
    const searchInput = '(104719.27; 192387.25';

    const result = searchInput.match(LambertCoordinaat.REGEX);

    expect(result[0]).toBe(searchInput);
    expect(result[1]).toBe('104719.27');
    expect(result[2]).toBe('192387.25');
  });

  test('Matched met: een coördinaat met enkel een eindhaakje', () => {
    const searchInput = '104719.27; 192387.25)';

    const result = searchInput.match(LambertCoordinaat.REGEX);

    expect(result[0]).toBe(searchInput);
    expect(result[1]).toBe('104719.27');
    expect(result[2]).toBe('192387.25');
  });

  test('Matched met: een coördinaat met spaties ervoor', () => {
    const searchInput = '     104719.27; 192387.25)';

    const result = searchInput.match(LambertCoordinaat.REGEX);

    expect(result[0]).toBe(searchInput);
    expect(result[1]).toBe('104719.27');
    expect(result[2]).toBe('192387.25');
  });

  test('Matched met: een coördinaat zonder spatie na het scheidingsteken', () => {
    const searchInput = '     104719.27;192387.25)';

    const result = searchInput.match(LambertCoordinaat.REGEX);

    expect(result[0]).toBe(searchInput);
    expect(result[1]).toBe('104719.27');
    expect(result[2]).toBe('192387.25');
  });

  test('Matched niet met: een vrije tekst', () => {
    const searchInput = 'Gent';

    const result = searchInput.match(LambertCoordinaat.REGEX);

    expect(result).toBeNull();
  });

  test('Matched niet met: een lege string', () => {
    const searchInput = '';

    const result = searchInput.match(LambertCoordinaat.REGEX);

    expect(result).toBeNull();
  });

  test('Matched niet met: een spatie', () => {
    const searchInput = ' ';

    const result = searchInput.match(LambertCoordinaat.REGEX);

    expect(result).toBeNull();
  });
});
