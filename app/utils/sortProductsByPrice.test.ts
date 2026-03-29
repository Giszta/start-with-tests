import { describe, expect, test } from 'vitest';
import { sortProductsByPrice, type Product } from './sortProductsByPrice';

describe('sortProductsByPrice', () => {
  test('sortuje produkty rosnąco po cenie', () => {
    const products: Product[] = [
      { id: 1, name: 'Laptop', price: 3000 },
      { id: 2, name: 'Myszka', price: 100 },
      { id: 3, name: 'Klawiatura', price: 200 },
    ];

    const result = sortProductsByPrice(products);

    expect(result).toEqual([
      { id: 2, name: 'Myszka', price: 100 },
      { id: 3, name: 'Klawiatura', price: 200 },
      { id: 1, name: 'Laptop', price: 3000 },
    ]);
  });

  test('zwraca pustą tablicę, gdy wejściowa tablica jest pusta', () => {
    expect(sortProductsByPrice([])).toEqual([]);
  });

  test('nie modyfikuje oryginalnej tablicy', () => {
    const products: Product[] = [
      { id: 1, name: 'Laptop', price: 3000 },
      { id: 2, name: 'Myszka', price: 100 },
    ];

    const original = [...products];

    sortProductsByPrice(products);

    expect(products).toEqual(original);
  });

  test('zachowuje poprawną kolejność dla produktów o tej samej cenie', () => {
    const products: Product[] = [
      { id: 1, name: 'Produkt A', price: 100 },
      { id: 2, name: 'Produkt B', price: 100 },
      { id: 3, name: 'Produkt C', price: 50 },
    ];

    const result = sortProductsByPrice(products);

    expect(result).toEqual([
      { id: 3, name: 'Produkt C', price: 50 },
      { id: 1, name: 'Produkt A', price: 100 },
      { id: 2, name: 'Produkt B', price: 100 },
    ]);
  });
});