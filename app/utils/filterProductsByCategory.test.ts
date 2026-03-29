import { describe, expect, test } from 'vitest';
import {
  filterProductsByCategory,
  type Product,
} from './filterProductsByCategory';

describe('filterProductsByCategory', () => {
  const products: Product[] = [
    { id: 1, name: 'Laptop', category: 'Elektronika', price: 3000 },
    { id: 2, name: 'Myszka', category: 'Elektronika', price: 120 },
    { id: 3, name: 'Krzesło', category: 'Meble', price: 500 },
  ];

  test('zwraca tylko produkty z wybranej kategorii', () => {
    const result = filterProductsByCategory(products, 'Elektronika');

    expect(result).toEqual([
      { id: 1, name: 'Laptop', category: 'Elektronika', price: 3000 },
      { id: 2, name: 'Myszka', category: 'Elektronika', price: 120 },
    ]);
  });

  test('ignoruje wielkość liter w kategorii', () => {
    const result = filterProductsByCategory(products, 'elektronika');

    expect(result).toEqual([
      { id: 1, name: 'Laptop', category: 'Elektronika', price: 3000 },
      { id: 2, name: 'Myszka', category: 'Elektronika', price: 120 },
    ]);
  });

  test('usuwa spacje z początku i końca kategorii', () => {
    const result = filterProductsByCategory(products, '  Meble  ');

    expect(result).toEqual([
      { id: 3, name: 'Krzesło', category: 'Meble', price: 500 },
    ]);
  });

  test('zwraca pustą tablicę, gdy nie znaleziono produktów', () => {
    const result = filterProductsByCategory(products, 'Sport');

    expect(result).toEqual([]);
  });

  test('zwraca wszystkie produkty, gdy kategoria jest pusta', () => {
    const result = filterProductsByCategory(products, '');

    expect(result).toEqual(products);
  });
});