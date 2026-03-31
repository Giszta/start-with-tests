// src/components/ErrorAwareProfile.test.tsx
import { render, screen } from '@testing-library/react';
import { ErrorAwareProfile } from './ErrorAwareProfile';
import { describe, expect, test, vi } from 'vitest';

describe('ErrorAwareProfile', () => {
    test('renderuje komunikat błędu po nieudanym fetchu', async () => {
        vi.spyOn(global, 'fetch').mockRejectedValue(new Error('fail'));

        render(<ErrorAwareProfile />);

        expect(await screen.findByRole('alert')).toHaveTextContent(
        'Nie udało się pobrać profilu'
        );
    });
});