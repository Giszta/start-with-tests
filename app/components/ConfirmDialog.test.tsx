import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ConfirmDialog } from './ConfirmDialog';
import { describe, expect, test, vi } from 'vitest';

describe('ConfirmDialog', () => {
    test('obsługuje potwierdzenie i anulowanie', async () => {
        const user = userEvent.setup();
        const onConfirm = vi.fn();
        const onCancel = vi.fn();

        render(
        <ConfirmDialog
            open
            title="Czy usunąć?"
            onConfirm={onConfirm}
            onCancel={onCancel}
        />
        );

        await user.click(screen.getByRole('button', { name: 'Potwierdź' }));
        await user.click(screen.getByRole('button', { name: 'Anuluj' }));

        expect(onConfirm).toHaveBeenCalledTimes(1);
        expect(onCancel).toHaveBeenCalledTimes(1);
    });
});