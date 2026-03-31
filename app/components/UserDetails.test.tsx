import { render, screen } from '@testing-library/react';
import { UserDetails } from './UserDetails';
import { describe, expect, test, vi } from 'vitest';

describe('UserDetails', () => {
    test('renderuje szczegóły użytkownika', async () => {
        vi.spyOn(global, 'fetch').mockResolvedValue({
        ok: true,
        json: async () => ({ id: 1, name: 'Jan', email: 'jan@example.com' }),
        } as Response);

        render(<UserDetails userId={1} />);

        expect(await screen.findByText('Jan')).toBeInTheDocument();
        expect(screen.getByText('jan@example.com')).toBeInTheDocument();
    });
});