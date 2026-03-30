import { render, screen } from '@testing-library/react';
import { Toast } from './Toast';
import { describe, expect, test } from 'vitest';

describe('Toast', () => {
    test('nie renderuje się gdy visible=false', () => {
        render(<Toast message="Zapisano" visible={false} />);
        expect(screen.queryByRole('status')).not.toBeInTheDocument();
    });

    test('renderuje komunikat gdy visible=true', () => {
        render(<Toast message="Zapisano" visible />);
        expect(screen.getByRole('status')).toHaveTextContent('Zapisano');
    });
});