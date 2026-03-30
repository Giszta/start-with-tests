import { describe, expect, test } from 'vitest';
import { formatDate } from './formatDate';

describe('formatDate', () => {
  test('formatuje datę z stringa ISO', () => {
    expect(formatDate('2026-03-29T12:00:00Z')).toBe('29.03.2026');
  });

  test('formatuje datę z obiektu Date', () => {
    expect(formatDate(new Date('2026-01-05T12:00:00Z'))).toBe('05.01.2026');
  });

  test('obsługuje inny locale', () => {
    expect(formatDate('2026-03-29T12:00:00Z', 'en-GB')).toBe('29/03/2026');
  });

  test('rzuca błąd dla niepoprawnej daty', () => {
    expect(() => formatDate('not-a-date')).toThrow('Niepoprawna data');
  });
});