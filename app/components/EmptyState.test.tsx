import { render, screen } from '@testing-library/react';
import { EmptyState } from './EmptyState';
import { describe, expect, test } from 'vitest';

describe('EmptyState', () => {
  test('renderuje tytuł i opis', () => {
    render(<EmptyState title="Brak wyników" description="Spróbuj zmienić filtry" />);

    expect(screen.getByText('Brak wyników')).toBeInTheDocument();
    expect(screen.getByText('Spróbuj zmienić filtry')).toBeInTheDocument();
  });

  test('renderuje sam tytuł, gdy brak opisu', () => {
    render(<EmptyState title="Brak danych" />);
    expect(screen.getByText('Brak danych')).toBeInTheDocument();
  });
});