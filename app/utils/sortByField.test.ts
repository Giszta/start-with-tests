import { describe, expect, test } from 'vitest';
import { sortByField } from './sortByField';

describe('sortByField', () => {
  const users = [
    { id: 1, name: 'Jan', age: 30 },
    { id: 2, name: 'Anna', age: 25 },
    { id: 3, name: 'Piotr', age: 35 },
  ];

  test('sortuje rosnąco po polu number', () => {
    expect(sortByField(users, 'age', 'asc')).toEqual([
      { id: 2, name: 'Anna', age: 25 },
      { id: 1, name: 'Jan', age: 30 },
      { id: 3, name: 'Piotr', age: 35 },
    ]);
  });

  test('sortuje malejąco po polu number', () => {
    expect(sortByField(users, 'age', 'desc')).toEqual([
      { id: 3, name: 'Piotr', age: 35 },
      { id: 1, name: 'Jan', age: 30 },
      { id: 2, name: 'Anna', age: 25 },
    ]);
  });

  test('sortuje rosnąco po polu string', () => {
    expect(sortByField(users, 'name', 'asc')).toEqual([
      { id: 2, name: 'Anna', age: 25 },
      { id: 1, name: 'Jan', age: 30 },
      { id: 3, name: 'Piotr', age: 35 },
    ]);
  });

  test('nie mutuje oryginalnej tablicy', () => {
    const original = [...users];

    sortByField(users, 'name');

    expect(users).toEqual(original);
  });
});