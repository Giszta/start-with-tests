import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CheckboxGroup } from './CheckboxGroup';
import { describe, expect, test, vi } from 'vitest';

describe('CheckboxGroup', () => {
    const options = [
        { value: 'react', label: 'React' },
        { value: 'ts', label: 'TypeScript' },
    ];

    test('renderuje wszystkie opcje', () => {
        render(<CheckboxGroup options={options} selectedValues={[]} onChange={() => {}} />);
        expect(screen.getByLabelText('React')).toBeInTheDocument();
        expect(screen.getByLabelText('TypeScript')).toBeInTheDocument();
    });

    test('dodaje wartość po zaznaczeniu', async () => {
        const user = userEvent.setup();
        const handleChange = vi.fn();

        render(<CheckboxGroup options={options} selectedValues={[]} onChange={handleChange} />);
        await user.click(screen.getByLabelText('React'));

        expect(handleChange).toHaveBeenCalledWith(['react']);
    });
});