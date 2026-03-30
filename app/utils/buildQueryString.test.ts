import { describe, expect, test } from 'vitest';
import { buildQueryString } from './buildQueryString';

describe('buildQueryString', () => {
  test('buduje query string z prostych parametrów', () => {
    expect(buildQueryString({ page: 2, search: 'react' })).toBe(
      '?page=2&search=react'
    );
  });

  test('pomija undefined, null i pusty string', () => {
    expect(
      buildQueryString({
        page: 1,
        search: '',
        category: undefined,
        active: null,
      })
    ).toBe('?page=1');
  });

  test('obsługuje boolean', () => {
    expect(buildQueryString({ archived: false })).toBe('?archived=false');
  });

  test('zwraca pusty string, gdy nie ma poprawnych parametrów', () => {
    expect(buildQueryString({ search: '', page: undefined })).toBe('');
  });
});