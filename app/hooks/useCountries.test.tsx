import { renderHook, waitFor } from '@testing-library/react'
import { afterEach, describe, expect, test, vi } from 'vitest'
import { useCountries } from './useCountries'

describe('useCountries', () => {
    afterEach(() => {
        vi.restoreAllMocks()
    })

    test('should fetch countries', async () => {
        vi.spyOn(global, 'fetch').mockResolvedValue({
        ok: true,
        json: async () => [
            { code: 'PL', name: 'Poland' },
            { code: 'DE', name: 'Germany' }
        ]
        } as Response)

        const { result } = renderHook(() => useCountries())

        await waitFor(() => {
        expect(result.current.data).toHaveLength(2)
        })

        expect(result.current.data[0]?.code).toBe('PL')
    })

    test('should handle fetch error', async () => {
        vi.spyOn(global, 'fetch').mockResolvedValue({
        ok: false
        } as Response)

        const { result } = renderHook(() => useCountries())

        await waitFor(() => {
        expect(result.current.error).toBe('Failed to fetch countries')
        })
    })

    test('should expose country name', async () => {
        vi.spyOn(global, 'fetch').mockResolvedValue({
        ok: true,
        json: async () => [
            { code: 'PL', name: 'Poland' }
        ]
        } as Response)

        const { result } = renderHook(() => useCountries())

        await waitFor(() => {
        expect(result.current.data[0]?.name).toBe('Poland')
        })
    })
})