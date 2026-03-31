import { render, screen } from '@testing-library/react';
import { UsersList } from './UsersList';
import { describe, expect, test, vi } from 'vitest';

describe('UsersList', () => {
    test('renderuje listę użytkowników po udanym fetchu', async () => {
        vi.spyOn(global, 'fetch').mockResolvedValue({
        ok: true,
        json: async () => [
            { id: 1, name: 'Jan' },
            { id: 2, name: 'Anna' },
        ],
        } as Response);

        render(<UsersList />);

        expect(screen.getByText('Ładowanie użytkowników...')).toBeInTheDocument();
        expect(await screen.findByText('Jan')).toBeInTheDocument();
        expect(screen.getByText('Anna')).toBeInTheDocument();
    });
});