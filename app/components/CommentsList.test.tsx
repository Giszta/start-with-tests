import { render, screen } from '@testing-library/react';
import { CommentsList } from './CommentsList';
import { describe, expect, test, vi } from 'vitest';

describe('CommentsList', () => {
    test('renderuje komentarze', async () => {
        vi.spyOn(global, 'fetch').mockResolvedValue({
        ok: true,
        json: async () => [
            { id: 1, author: 'Anna', body: 'Super wpis' },
        ],
        } as Response);

        render(<CommentsList />);

        expect(await screen.findByText('Anna')).toBeInTheDocument();
        expect(screen.getByText('Super wpis')).toBeInTheDocument();
    });
});