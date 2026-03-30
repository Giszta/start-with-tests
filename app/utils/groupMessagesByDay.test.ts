import { describe, expect, test } from 'vitest';
import { groupMessagesByDay, type Message } from './groupMessagesByDay';

describe('groupMessagesByDay', () => {
  test('grupuje wiadomości po dniu', () => {
    const messages: Message[] = [
      { id: 1, text: 'Hej', createdAt: '2026-03-29T10:00:00Z' },
      { id: 2, text: 'Cześć', createdAt: '2026-03-29T12:30:00Z' },
      { id: 3, text: 'Siema', createdAt: '2026-03-28T09:00:00Z' },
    ];

    expect(groupMessagesByDay(messages)).toEqual({
      '2026-03-29': [
        { id: 1, text: 'Hej', createdAt: '2026-03-29T10:00:00Z' },
        { id: 2, text: 'Cześć', createdAt: '2026-03-29T12:30:00Z' },
      ],
      '2026-03-28': [
        { id: 3, text: 'Siema', createdAt: '2026-03-28T09:00:00Z' },
      ],
    });
  });

  test('zwraca pusty obiekt dla pustej tablicy', () => {
    expect(groupMessagesByDay([])).toEqual({});
  });

  test('rzuca błąd dla niepoprawnej daty', () => {
    expect(() =>
      groupMessagesByDay([
        { id: 1, text: 'Hej', createdAt: 'invalid-date' },
      ])
    ).toThrow('Niepoprawna data wiadomości');
  });
});