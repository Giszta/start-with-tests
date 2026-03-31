import { render, screen } from '@testing-library/react';
import { TeamMembers } from './TeamMembers';
import { describe, expect, test, vi } from 'vitest';

describe('TeamMembers', () => {
    test('renderuje członków zespołu', async () => {
        vi.spyOn(global, 'fetch').mockResolvedValue({
        ok: true,
        json: async () => [{ id: 1, name: 'Adam', role: 'Frontend Developer' }],
        } as Response);

        render(<TeamMembers />);

        expect(await screen.findByText('Adam - Frontend Developer')).toBeInTheDocument();
    });
});