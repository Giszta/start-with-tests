import { render, screen } from '@testing-library/react';
import { TodoList } from './TodoList';
import { describe, expect, test, vi } from 'vitest';

describe('TodoList', () => {
    test('renderuje zadania i statusy', async () => {
        vi.spyOn(global, 'fetch').mockResolvedValue({
        ok: true,
        json: async () => [{ id: 1, title: 'Nauka testów', completed: true }],
        } as Response);

        render(<TodoList />);

        expect(await screen.findByText('Nauka testów - Gotowe')).toBeInTheDocument();
    });
});