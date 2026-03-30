import { render, screen } from '@testing-library/react';
import { DataTable } from './DataTable';
import { describe, expect, test } from 'vitest';

describe('DataTable', () => {
    test('renderuje nagłówki i dane', () => {
        render(
        <DataTable
            columns={[
            { key: 'name', header: 'Imię' },
            { key: 'email', header: 'Email' },
            ]}
            data={[
            { id: 1, name: 'Jan', email: 'jan@example.com' },
            { id: 2, name: 'Anna', email: 'anna@example.com' },
            ]}
        />
        );

        expect(screen.getByText('Imię')).toBeInTheDocument();
        expect(screen.getByText('Email')).toBeInTheDocument();
        expect(screen.getByText('Jan')).toBeInTheDocument();
        expect(screen.getByText('anna@example.com')).toBeInTheDocument();
    });
});