import { render, screen } from '@testing-library/react';
import { ActivityTimeline } from './ActivityTimeline';
import { describe, expect, test, vi } from 'vitest';

describe('ActivityTimeline', () => {
    test('renderuje aktywności', async () => {
        vi.spyOn(global, 'fetch').mockResolvedValue({
        ok: true,
        json: async () => [{ id: 1, label: 'Dodano produkt' }],
        } as Response);

        render(<ActivityTimeline />);

        expect(await screen.findByText('Dodano produkt')).toBeInTheDocument();
    });
});