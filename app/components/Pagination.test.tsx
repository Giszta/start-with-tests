import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Pagination } from './Pagination';
import { describe, expect, test, vi } from 'vitest';

describe('Pagination', () => {
    test('renderuje aktualny numer strony', () => {
        render(<Pagination currentPage={2} totalPages={5} onPageChange={() => {}} />);
        expect(screen.getByText('Strona 2 z 5')).toBeInTheDocument();
    });

    test('blokuje przycisk poprzednia na pierwszej stronie', () => {
        render(<Pagination currentPage={1} totalPages={5} onPageChange={() => {}} />);
        expect(screen.getByRole('button', { name: 'Poprzednia' })).toBeDisabled();
    });
    test('blokuje przycisk następna na ostatniej stronie', () => {
        render(<Pagination currentPage={5} totalPages={5} onPageChange={() => {}} />);
        expect(screen.getByRole('button', { name: 'Następna' })).toBeDisabled();
    });
    test('wywołuje zmianę strony po kliknięciu', async () => {
        const user = userEvent.setup();
        const handleChange = vi.fn();

        render(<Pagination currentPage={2} totalPages={5} onPageChange={handleChange} />);
        await user.click(screen.getByRole('button', { name: 'Następna' }));

        expect(handleChange).toHaveBeenCalledWith(3);
    });
    test('nie wywołuje zmiany strony po kliknięciu zablokowanego przycisku', async () => {
        const user = userEvent.setup();
        const handleChange = vi.fn();

        render(<Pagination currentPage={1} totalPages={5} onPageChange={handleChange} />);
        await user.click(screen.getByRole('button', { name: 'Poprzednia' }));
        expect(handleChange).not.toHaveBeenCalled();
    });
    
});