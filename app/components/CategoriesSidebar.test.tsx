import { render, screen } from '@testing-library/react';
import { CategoriesSidebar } from './CategoriesSidebar';
import { describe, expect, test, vi } from 'vitest';

describe('CategoriesSidebar', () => {
  test('renderuje kategorie', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => [{ id: 1, name: 'Elektronika' }, { id: 2, name: 'Moda' }],
    } as Response);

    render(<CategoriesSidebar />);

    expect(await screen.findByText('Elektronika')).toBeInTheDocument();
    expect(await screen.findByText('Moda')).toBeInTheDocument();
  });
});