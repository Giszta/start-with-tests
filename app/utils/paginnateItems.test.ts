import { describe, expect, test } from 'vitest';
import { paginateItems } from './paginateItems';

describe('paginateItems', () => {
  const items = [1, 2, 3, 4, 5, 6, 7];

  test('zwraca pierwszą stronę', () => {
    expect(paginateItems(items, 1, 3)).toEqual([1, 2, 3]);
  });

  test('zwraca drugą stronę', () => {
    expect(paginateItems(items, 2, 3)).toEqual([4, 5, 6]);
  });

  test('zwraca ostatnie elementy dla niepełnej strony', () => {
    expect(paginateItems(items, 3, 3)).toEqual([7]);
  });

  test('zwraca pustą tablicę, gdy strona jest poza zakresem', () => {
    expect(paginateItems(items, 4, 3)).toEqual([]);
  });

  test('rzuca błąd dla currentPage mniejszego niż 1', () => {
    expect(() => paginateItems(items, 0, 3)).toThrow(
      'currentPage musi być większe od 0'
    );
  });

  test('rzuca błąd dla itemsPerPage mniejszego niż 1', () => {
    expect(() => paginateItems(items, 1, 0)).toThrow(
      'itemsPerPage musi być większe od 0'
    );
  });
});