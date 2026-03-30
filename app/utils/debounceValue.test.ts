import { debounceValue } from './debounceValue';
import { describe, expect, test, vi } from 'vitest';

describe('debounceValue', () => {
  test('wywołuje callback po określonym czasie', () => {
    vi.useFakeTimers();

    const callback = vi.fn();
    const debounced = debounceValue(callback, 300);

    debounced('react');

    expect(callback).not.toHaveBeenCalled();

    vi.advanceTimersByTime(300);

    expect(callback).toHaveBeenCalledWith('react');
    expect(callback).toHaveBeenCalledTimes(1);

    vi.useRealTimers();
  });

  test('wywołuje callback tylko raz dla ostatniej wartości', () => {
    vi.useFakeTimers();

    const callback = vi.fn();
    const debounced = debounceValue(callback, 300);

    debounced('r');
    debounced('re');
    debounced('react');

    vi.advanceTimersByTime(300);

    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith('react');

    vi.useRealTimers();
  });

  test('rzuca błąd dla ujemnego delay', () => {
    expect(() => debounceValue(() => {}, -1)).toThrow(
      'delay nie może być ujemny'
    );
  });
});