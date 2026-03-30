import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Accordion } from './Accordion';
import { describe, expect, test } from 'vitest';

describe('Accordion', () => {
    test('domyślnie nie pokazuje treści', () => {
        render(<Accordion title="FAQ" content="Treść odpowiedzi" />);
        expect(screen.queryByText('Treść odpowiedzi')).not.toBeInTheDocument();
    });

    test('pokazuje treść po kliknięciu', async () => {
        const user = userEvent.setup();
        render(<Accordion title="FAQ" content="Treść odpowiedzi" />);

        await user.click(screen.getByRole('button', { name: 'FAQ' }));

        expect(screen.getByText('Treść odpowiedzi')).toBeInTheDocument();
    });
});