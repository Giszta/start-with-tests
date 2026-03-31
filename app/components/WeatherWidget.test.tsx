import { render, screen } from '@testing-library/react';
import { WeatherWidget } from './WeatherWidget';
import { describe, expect, test, vi } from 'vitest';

describe('WeatherWidget', () => {
    test('renderuje dane pogodowe', async () => {
        vi.spyOn(global, 'fetch').mockResolvedValue({
        ok: true,
        json: async () => ({ city: 'Warszawa', temperature: 18 }),
        } as Response);

        render(<WeatherWidget />);

        expect(await screen.findByText('Warszawa: 18°C')).toBeInTheDocument();
    });
});