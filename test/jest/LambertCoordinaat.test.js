import LambertCoordinaat from "../../src/lambert-coordinaat";

describe('Lambert Coördinaat', () => {
  
  test('of - een vrije tekst', () => {
    let result = LambertCoordinaat.of("test");
    
    expect(result).toBeUndefined();
  });
  
  test('of - "null"', () => {
    let result = LambertCoordinaat.of(null);
    
    expect(result).toBeUndefined();
  });
  
  test('of - "undefined"', () => {
    let result = LambertCoordinaat.of(undefined);
    
    expect(result).toBeUndefined();
  });
  
  test('of - een lege string', () => {
    let result = LambertCoordinaat.of("");
    
    expect(result).toBeUndefined();
  });
  
  test('of - een geldige coördinaat', () => {
    let lambertCoordinaat = LambertCoordinaat.of("123456.78, 345232.04");
    
    expect(lambertCoordinaat).not.toBeNull();
    expect(lambertCoordinaat.x).toBe(123456.78);
    expect(lambertCoordinaat.y).toBe(345232.04);
    expect(lambertCoordinaat.toString()).toBe("123456.78, 345232.04");
  });
  
  test('of - geldige coordinaat met haakjes, gescheiden door puntkomma', () => {
    let lambertCoordinaat = LambertCoordinaat.of("(123456.78; 345232.04)");
    
    expect(lambertCoordinaat).not.toBeNull();
    expect(lambertCoordinaat.x).toBe(123456.78);
    expect(lambertCoordinaat.y).toBe(345232.04);
    expect(lambertCoordinaat.toString()).toBe("123456.78, 345232.04");
  });
  
});

describe('Lambert Coördinaat - RegEx', () => {
  
  test('Matched met: een geldige coördinaat', () => {
    let searchInput = "104719.27, 192387.25";
    
    let result = searchInput.match(LambertCoordinaat.REGEX);
    
    expect(result[0]).toBe(searchInput);
    expect(result[1]).toBe("104719.27");
    expect(result[2]).toBe("192387.25");
  });
  
  test('Matched met: een x-coördinaat zonder decimaal getal', () => {
    let searchInput = "104719, 192387.25";
    
    let result = searchInput.match(LambertCoordinaat.REGEX);
    
    expect(result[0]).toBe(searchInput);
    expect(result[1]).toBe("104719");
    expect(result[2]).toBe("192387.25");
  });
  
  test('Matched met: een x en y-coördinaat zonder decimaal getal', () => {
    let searchInput = "104719, 192387";
    
    let result = searchInput.match(LambertCoordinaat.REGEX);
    
    expect(result[0]).toBe(searchInput);
    expect(result[1]).toBe("104719");
    expect(result[2]).toBe("192387");
  });
  
  test('Matched met: een y-coördinaat zonder decimaal getal', () => {
    let searchInput = "104719.27, 192387";
    
    let result = searchInput.match(LambertCoordinaat.REGEX);
    
    expect(result[0]).toBe(searchInput);
    expect(result[1]).toBe("104719.27");
    expect(result[2]).toBe("192387");
  });
  
  test('Matched met: een coördinaat met gehele getallen', () => {
    let searchInput = "104, 19";
    
    let result = searchInput.match(LambertCoordinaat.REGEX);
    
    expect(result[0]).toBe(searchInput);
    expect(result[1]).toBe("104");
    expect(result[2]).toBe("19");
  });
  
  test('Matched met: een coördinaat gescheiden door een punt komma', () => {
    let searchInput = "104719.27; 192387.25";
    
    let result = searchInput.match(LambertCoordinaat.REGEX);
    
    expect(result[0]).toBe(searchInput);
    expect(result[1]).toBe("104719.27");
    expect(result[2]).toBe("192387.25");
  });
  
  test('Matched met: een coördinaat gescheiden door een komma', () => {
    let searchInput = "104719.27, 192387.25";
    
    let result = searchInput.match(LambertCoordinaat.REGEX);
    
    expect(result[0]).toBe(searchInput);
    expect(result[1]).toBe("104719.27");
    expect(result[2]).toBe("192387.25");
  });
  
  test('Matched met: een coördinaat met haakjes', () => {
    let searchInput = "(104719.27; 192387.25)";
    
    let result = searchInput.match(LambertCoordinaat.REGEX);
    
    expect(result[0]).toBe(searchInput);
    expect(result[1]).toBe("104719.27");
    expect(result[2]).toBe("192387.25");
  });
  
  test('Matched met: een coördinaat met enkel een starthaakje', () => {
    let searchInput = "(104719.27; 192387.25";
    
    let result = searchInput.match(LambertCoordinaat.REGEX);
    
    expect(result[0]).toBe(searchInput);
    expect(result[1]).toBe("104719.27");
    expect(result[2]).toBe("192387.25");
  });
  
  test('Matched met: een coördinaat met enkel een eindhaakje', () => {
    let searchInput = "104719.27; 192387.25)";
    
    let result = searchInput.match(LambertCoordinaat.REGEX);
    
    expect(result[0]).toBe(searchInput);
    expect(result[1]).toBe("104719.27");
    expect(result[2]).toBe("192387.25");
  });
  
  test('Matched met: een coördinaat met spaties ervoor', () => {
    let searchInput = "     104719.27; 192387.25)";
    
    let result = searchInput.match(LambertCoordinaat.REGEX);
    
    expect(result[0]).toBe(searchInput);
    expect(result[1]).toBe("104719.27");
    expect(result[2]).toBe("192387.25");
  });
  
  test('Matched met: een coördinaat zonder spatie na het scheidingsteken', () => {
    let searchInput = "     104719.27;192387.25)";
    
    let result = searchInput.match(LambertCoordinaat.REGEX);
    
    expect(result[0]).toBe(searchInput);
    expect(result[1]).toBe("104719.27");
    expect(result[2]).toBe("192387.25");
  });
  
  test('Matched niet met: een vrije tekst', () => {
    let searchInput = "Gent";
    
    let result = searchInput.match(LambertCoordinaat.REGEX);
    
    expect(result).toBeNull();
  });
  
  test('Matched niet met: een lege string', () => {
    let searchInput = "";
    
    let result = searchInput.match(LambertCoordinaat.REGEX);
    
    expect(result).toBeNull();
  });
  
  test('Matched niet met: een spatie', () => {
    let searchInput = " ";
    
    let result = searchInput.match(LambertCoordinaat.REGEX);
    
    expect(result).toBeNull();
  });
  
});