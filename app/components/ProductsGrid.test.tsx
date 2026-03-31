import { render, screen } from '@testing-library/react';
import { ProductsGrid } from './ProductsGrid';
import { describe, expect, test, vi } from 'vitest';

describe('ProductsGrid', () => {
    test('renderuje produkty po pobraniu danych', async () => {
        vi.spyOn(global, 'fetch').mockResolvedValue({
        ok: true,
        json: async () => [
            { id: 1, name: 'Laptop', price: 3000 },
            { id: 2, name: 'Myszka', price: 120 },
        ],
        } as Response);

        render(<ProductsGrid />);

        expect(await screen.findByText('Laptop')).toBeInTheDocument();
        expect(screen.getByText('3000 zł')).toBeInTheDocument();
        expect(screen.getByText('Myszka')).toBeInTheDocument();
        expect(screen.getByText('120 zł')).toBeInTheDocument();
    });
});