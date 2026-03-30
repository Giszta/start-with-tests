import { render, screen } from '@testing-library/react';
import { LoadingSpinner } from './LoadingSpinner';
import { describe, expect, test } from 'vitest';

describe('LoadingSpinner', () => {
  test('renderuje stan ładowania', () => {
    render(<LoadingSpinner />);
    expect(screen.getByRole('status')).toHaveTextContent('Ładowanie...');
  });
});