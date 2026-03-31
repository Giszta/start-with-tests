import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SearchUsers } from './SearchUsers';
import { describe, expect, test, vi } from 'vitest';


describe('SearchUsers', () => {
    test('fetchuje i renderuje wyniki wyszukiwania', async () => {
        const user = userEvent.setup();

        vi.spyOn(global, 'fetch').mockResolvedValue({
        ok: true,
        json: async () => [{ id: 1, name: 'Jan' }],
        } as Response);

        render(<SearchUsers />);

        await user.type(screen.getByLabelText('Szukaj użytkownika'), 'ja');

        expect(await screen.findByText('Jan')).toBeInTheDocument();
    });
});