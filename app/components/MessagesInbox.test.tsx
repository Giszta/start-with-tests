import { render, screen } from '@testing-library/react';
import { MessagesInbox } from './MessagesInbox';
import { describe, expect, test, vi } from 'vitest';

describe('MessagesInbox', () => {
    test('renderuje wiadomości', async () => {
        vi.spyOn(global, 'fetch').mockResolvedValue({
        ok: true,
        json: async () => [{ id: 1, subject: 'Spotkanie', from: 'Anna' }],
        } as Response);

        render(<MessagesInbox />);

        expect(await screen.findByText('Spotkanie - Anna')).toBeInTheDocument();
    });
});