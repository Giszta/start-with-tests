import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Modal } from './Modal';
import { describe, expect, test, vi } from 'vitest';

describe('Modal', () => {
    test('nie renderuje się gdy open=false', () => {
        render(
        <Modal open={false} title="Szczegóły" onClose={() => {}}>
            Treść
        </Modal>
        );

        expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });

    test('renderuje się gdy open=true', () => {
        render(
        <Modal open title="Szczegóły" onClose={() => {}}>
            Treść
        </Modal>
        );

        expect(screen.getByRole('dialog', { name: 'Szczegóły' })).toBeInTheDocument();
        expect(screen.getByText('Treść')).toBeInTheDocument();
    });

    test('wywołuje onClose po kliknięciu', async () => {
        const user = userEvent.setup();
        const handleClose = vi.fn();

        render(
        <Modal open title="Szczegóły" onClose={handleClose}>
            Treść
        </Modal>
        );

        await user.click(screen.getByRole('button', { name: 'Zamknij' }));
        expect(handleClose).toHaveBeenCalledTimes(1);
    });
});