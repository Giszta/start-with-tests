import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LoginForm } from './LoginForm';
import { describe, expect, vi, test } from 'vitest';

describe('LoginForm', () => {
  test('renderuje pola formularza i przycisk', () => {
    render(<LoginForm onSubmit={() => {}} />);

    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Hasło')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Zaloguj' })).toBeInTheDocument();
  });

  test('pokazuje błędy walidacji dla niepoprawnych danych', async () => {
    const user = userEvent.setup();
    const handleSubmit = vi.fn();

    render(<LoginForm onSubmit={handleSubmit} />);

    await user.type(screen.getByLabelText('Email'), 'zly-email');
    await user.type(screen.getByLabelText('Hasło'), '123');
    await user.click(screen.getByRole('button', { name: 'Zaloguj' }));

    expect(screen.getByText('Podaj poprawny email')).toBeInTheDocument();
    expect(
      screen.getByText('Hasło musi zawierać co najmniej 6 znaków')
    ).toBeInTheDocument();

    expect(handleSubmit).not.toHaveBeenCalled();
  });

  test('wywołuje onSubmit dla poprawnych danych', async () => {
    const user = userEvent.setup();
    const handleSubmit = vi.fn();

    render(<LoginForm onSubmit={handleSubmit} />);

    await user.type(screen.getByLabelText('Email'), 'jan@example.com');
    await user.type(screen.getByLabelText('Hasło'), 'secret123');
    await user.click(screen.getByRole('button', { name: 'Zaloguj' }));

    expect(handleSubmit).toHaveBeenCalledTimes(1);
    expect(handleSubmit).toHaveBeenCalledWith({
      email: 'jan@example.com',
      password: 'secret123',
    });
  });
});