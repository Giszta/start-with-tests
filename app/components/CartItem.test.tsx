import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CartItem } from './CartItem';
import { describe, expect, test, vi } from 'vitest';

describe('CartItem', () => {
  test('renderuje nazwę i ilość', () => {
    render(
      <CartItem
        name="Laptop"
        quantity={2}
        onIncrease={() => {}}
        onDecrease={() => {}}
      />
    );

    expect(screen.getByText('Laptop')).toBeInTheDocument();
    expect(screen.getByText('Ilość: 2')).toBeInTheDocument();
  });

  test('obsługuje przyciski zwiększania i zmniejszania', async () => {
    const user = userEvent.setup();
    const onIncrease = vi.fn();
    const onDecrease = vi.fn();

    render(
      <CartItem
        name="Laptop"
        quantity={2}
        onIncrease={onIncrease}
        onDecrease={onDecrease}
      />
    );

    await user.click(screen.getByRole('button', { name: '+' }));
    await user.click(screen.getByRole('button', { name: '-' }));

    expect(onIncrease).toHaveBeenCalledTimes(1);
    expect(onDecrease).toHaveBeenCalledTimes(1);
  });
});