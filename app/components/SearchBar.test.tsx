import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SearchBar } from './SearchBar';
import { describe, expect, test, vi } from 'vitest';

describe('SearchBar', () => {
    test('renderuje pole wyszukiwania', () => {
        render(<SearchBar value="" onChange={() => {}} />);
        expect(screen.getByLabelText('Szukaj')).toBeInTheDocument();
    });

    test('wywołuje onChange podczas wpisywania', async () => {
        const user = userEvent.setup();
        const handleChange = vi.fn();

        render(<SearchBar value="" onChange={handleChange} />);
        await user.type(screen.getByLabelText('Szukaj'), 'react');

        expect(handleChange).toHaveBeenCalled();
    });
});