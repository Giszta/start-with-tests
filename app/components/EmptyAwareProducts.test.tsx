import { render, screen } from '@testing-library/react';
import { EmptyAwareProducts } from './EmptyAwareProducts';
import { describe, expect, test, vi } from 'vitest';

describe('EmptyAwareProducts', () => {
    test('pokazuje pusty stan dla pustej listy', async () => {
        vi.spyOn(global, 'fetch').mockResolvedValue({
        ok: true,
        json: async () => [],
        } as Response);

        render(<EmptyAwareProducts />);

        expect(await screen.findByText('Brak produktów')).toBeInTheDocument();
    });
});