import { render, screen } from '@testing-library/react';
import { NotificationsPanel } from './NotificationsPanel';
import { describe, expect, test, vi } from 'vitest';

describe('NotificationsPanel', () => {
    test('renderuje powiadomienia', async () => {
        vi.spyOn(global, 'fetch').mockResolvedValue({
        ok: true,
        json: async () => [{ id: 1, message: 'Masz nowe zamówienie' }],
        } as Response);

        render(<NotificationsPanel />);

        expect(await screen.findByText('Masz nowe zamówienie')).toBeInTheDocument();
    });
});