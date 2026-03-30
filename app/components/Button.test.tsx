import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from './Button';
import { describe, expect, test, vi } from 'vitest';

describe('Button', () => {
  test('renderuje tekst przycisku', () => {
    render(<Button>Zapisz</Button>);
    expect(screen.getByRole('button', { name: 'Zapisz' })).toBeInTheDocument();
  });

  test('wywołuje onClick po kliknięciu', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();

    render(<Button onClick={handleClick}>Zapisz</Button>);
    await user.click(screen.getByRole('button', { name: 'Zapisz' }));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('jest zablokowany, gdy disabled=true', () => {
    render(<Button disabled>Zapisz</Button>);
    expect(screen.getByRole('button', { name: 'Zapisz' })).toBeDisabled();
  });
});