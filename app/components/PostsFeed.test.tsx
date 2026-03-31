import { render, screen } from '@testing-library/react';
import { PostsFeed } from './PostsFeed';
import { describe, expect, test, vi } from 'vitest';

describe('PostsFeed', () => {
    test('renderuje posty z API', async () => {
        vi.spyOn(global, 'fetch').mockResolvedValue({
        ok: true,
        json: async () => [
            { id: 1, title: 'Pierwszy post' },
            { id: 2, title: 'Drugi post' },
        ],
        } as Response);

        render(<PostsFeed />);

        expect(await screen.findByText('Pierwszy post')).toBeInTheDocument();
        expect(screen.getByText('Drugi post')).toBeInTheDocument();
    });
});