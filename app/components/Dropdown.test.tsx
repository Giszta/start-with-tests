import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Dropdown } from './Dropdown';
import { describe, expect, test, vi } from 'vitest';

describe('Dropdown', () => {
    const options = [
        { value: 'pl', label: 'Polski' },
        { value: 'en', label: 'English' },
    ];

    test('renderuje select z opcjami', () => {
        render(<Dropdown label="Język" value="pl" options={options} onChange={() => {}} />);
        expect(screen.getByLabelText('Język')).toBeInTheDocument();
        expect(screen.getByRole('option', { name: 'Polski' })).toBeInTheDocument();
    });

    test('wywołuje onChange po zmianie opcji', async () => {
        const user = userEvent.setup();
        const handleChange = vi.fn();

        render(<Dropdown label="Język" value="pl" options={options} onChange={handleChange} />);
        await user.selectOptions(screen.getByLabelText('Język'), 'en');

        expect(handleChange).toHaveBeenCalledWith('en');
    });
});