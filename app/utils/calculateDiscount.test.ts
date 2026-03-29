import { calculateDiscount } from './calculateDiscount';
import { describe, test,expect } from 'vitest';

describe('calculateDiscount', () => {
  test('zwraca tę samą cenę dla rabatu 0%', () => {
    expect(calculateDiscount(100, 0)).toBe(100);
  });

  test('oblicza poprawną cenę po rabacie 10%', () => {
    expect(calculateDiscount(200, 10)).toBe(180);
  });

  test('zwraca 0 dla rabatu 100%', () => {
    expect(calculateDiscount(150, 100)).toBe(0);
  });

  test('zaokrągla wynik do dwóch miejsc po przecinku', () => {
    expect(calculateDiscount(99.99, 15)).toBe(84.99);
  });

  test('rzuca błąd dla ujemnej ceny', () => {
    expect(() => calculateDiscount(-10, 20)).toThrow('Cena nie może być ujemna');
  });

  test('rzuca błąd dla rabatu mniejszego niż 0', () => {
    expect(() => calculateDiscount(100, -1)).toThrow('Procent rabatu musi być między 0 a 100');
  });

  test('rzuca błąd dla rabatu większego niż 100', () => {
    expect(() => calculateDiscount(100, 120)).toThrow('Procent rabatu musi być między 0 a 100');
  });
});