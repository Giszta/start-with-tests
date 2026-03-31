import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { RetryableUsersList } from './RetryableUsersList';
import { describe, expect, test, vi } from 'vitest';

describe('RetryableUsersList', () => {
    test('po błędzie pozwala ponowić pobieranie', async () => {
        const user = userEvent.setup();

        const fetchMock = vi
        .spyOn(global, 'fetch')
        .mockRejectedValueOnce(new Error('fail'))
        .mockResolvedValueOnce({
            ok: true,
            json: async () => [{ id: 1, name: 'Jan' }],
        } as Response);

        render(<RetryableUsersList />);

        expect(await screen.findByRole('alert')).toHaveTextContent('Błąd pobierania');

        await user.click(screen.getByRole('button', { name: 'Spróbuj ponownie' }));

        expect(await screen.findByText('Jan')).toBeInTheDocument();
        expect(fetchMock).toHaveBeenCalledTimes(2);
    });
});