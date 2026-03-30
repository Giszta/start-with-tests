import { describe, expect, test } from 'vitest';
import { getVisiblePageNumbers } from './getVisiblePageNumbers';

describe('getVisiblePageNumbers', () => {
  test('zwraca strony wokół aktualnej strony', () => {
    expect(getVisiblePageNumbers(5, 10, 1)).toEqual([4, 5, 6]);
  });

  test('nie wychodzi poniżej 1', () => {
    expect(getVisiblePageNumbers(1, 10, 1)).toEqual([1, 2]);
  });

  test('nie wychodzi powyżej totalPages', () => {
    expect(getVisiblePageNumbers(10, 10, 1)).toEqual([9, 10]);
  });

  test('działa dla siblingCount = 2', () => {
    expect(getVisiblePageNumbers(5, 10, 2)).toEqual([3, 4, 5, 6, 7]);
  });

  test('rzuca błąd dla niepoprawnych danych', () => {
    expect(() => getVisiblePageNumbers(0, 10, 1)).toThrow(
      'Niepoprawne dane paginacji'
    );
  });
});