import { render, screen } from '@testing-library/react';
import { OrdersList } from './OrdersList';
import { describe, expect, test, vi } from 'vitest';

describe('OrdersList', () => {
    test('renderuje zamówienia', async () => {
        vi.spyOn(global, 'fetch').mockResolvedValue({
        ok: true,
        json: async () => [{ id: 1, number: 'ORD-001', total: 250 }],
        } as Response);

        render(<OrdersList />);

        expect(await screen.findByText('ORD-001 - 250 zł')).toBeInTheDocument();
    });
});