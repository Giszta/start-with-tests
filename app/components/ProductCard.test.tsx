import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ProductCard } from './ProductCard';
import { describe, expect, test, vi } from 'vitest';

describe('ProductCard', () => {
  test('renderuje dane produktu', () => {
    render(<ProductCard name="Laptop" price="3000 zł" onAddToCart={() => {}} />);
    expect(screen.getByText('Laptop')).toBeInTheDocument();
    expect(screen.getByText('3000 zł')).toBeInTheDocument();
  });

  test('wywołuje dodanie do koszyka', async () => {
    const user = userEvent.setup();
    const handleAdd = vi.fn();

    render(<ProductCard name="Laptop" price="3000 zł" onAddToCart={handleAdd} />);
    await user.click(screen.getByRole('button', { name: 'Dodaj do koszyka' }));

    expect(handleAdd).toHaveBeenCalledTimes(1);
  });
});