import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Tabs } from './Tabs';
import { describe, expect, test } from 'vitest';

describe('Tabs', () => {
    const tabs = [
        { id: 'profile', label: 'Profil', content: 'Zawartość profilu' },
        { id: 'settings', label: 'Ustawienia', content: 'Zawartość ustawień' },
    ];

    test('renderuje pierwszą zakładkę jako aktywną', () => {
        render(<Tabs tabs={tabs} />);
        expect(screen.getByRole('tabpanel')).toHaveTextContent('Zawartość profilu');
    });

    test('zmienia aktywną zakładkę po kliknięciu', async () => {
        const user = userEvent.setup();
        render(<Tabs tabs={tabs} />);

        await user.click(screen.getByRole('tab', { name: 'Ustawienia' }));

        expect(screen.getByRole('tabpanel')).toHaveTextContent('Zawartość ustawień');
    });
});