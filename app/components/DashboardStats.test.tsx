import { render, screen } from '@testing-library/react';
import { DashboardStats } from './DashboardStats';
import { describe, expect, test, vi } from 'vitest';

describe('DashboardStats', () => {
  test('renderuje statystyki', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => ({ users: 20, orders: 7 }),
    } as Response);

    render(<DashboardStats />);

    expect(await screen.findByText('Użytkownicy: 20')).toBeInTheDocument();
    expect(screen.getByText('Zamówienia: 7')).toBeInTheDocument();
  });
});