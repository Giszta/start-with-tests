import { describe, expect, test } from 'vitest';
import { validateRequiredFields } from './validateRequiredFields';

describe('validateRequiredFields', () => {
  test('zwraca pusty obiekt, gdy wszystkie pola są poprawne', () => {
    expect(
      validateRequiredFields({
        firstName: 'Jan',
        lastName: 'Kowalski',
      })
    ).toEqual({});
  });

  test('zwraca błąd dla pustych pól', () => {
    expect(
      validateRequiredFields({
        firstName: '',
        lastName: 'Nowak',
      })
    ).toEqual({
      firstName: 'To pole jest wymagane',
    });
  });

  test('traktuje same spacje jako puste pole', () => {
    expect(
      validateRequiredFields({
        email: '   ',
      })
    ).toEqual({
      email: 'To pole jest wymagane',
    });
  });

  test('zwraca błędy dla wielu pól jednocześnie', () => {
    expect(
      validateRequiredFields({
        firstName: '',
        lastName: ' ',
        email: 'test@example.com',
      })
    ).toEqual({
      firstName: 'To pole jest wymagane',
      lastName: 'To pole jest wymagane',
    });
  });
});