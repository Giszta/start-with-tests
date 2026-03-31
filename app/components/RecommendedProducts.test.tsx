import { render, screen } from '@testing-library/react';
import { RecommendedProducts } from './RecommendedProducts';
import { describe, expect, test, vi } from 'vitest';

describe('RecommendedProducts', () => {
    test('renderuje rekomendowane produkty', async () => {
        vi.spyOn(global, 'fetch').mockResolvedValue({
        ok: true,
        json: async () => [{ id: 1, name: 'Monitor' }],
        } as Response);

        render(<RecommendedProducts />);

        expect(await screen.findByText('Monitor')).toBeInTheDocument();
        expect(screen.getByText('Polecane produkty')).toBeInTheDocument();
    });
});