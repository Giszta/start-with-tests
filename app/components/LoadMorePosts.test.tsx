import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LoadMorePosts } from './LoadMorePosts';
import { describe, expect, test, vi } from 'vitest';

describe('LoadMorePosts', () => {
    test('ładuje posty po kliknięciu przycisku', async () => {
        const user = userEvent.setup();

        vi.spyOn(global, 'fetch').mockResolvedValue({
        ok: true,
        json: async () => [{ id: 1, title: 'Nowy post' }],
        } as Response);

        render(<LoadMorePosts />);

        await user.click(screen.getByRole('button', { name: 'Załaduj posty' }));

        expect(await screen.findByText('Nowy post')).toBeInTheDocument();
    });
});