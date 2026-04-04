import { renderHook, waitFor } from '@testing-library/react'
import { afterEach, describe, expect, test, vi } from 'vitest'
import { useProducts } from './useProducts'

describe('useProducts', () => {
    afterEach(() => {
        vi.restoreAllMocks()
    })

    test('should fetch products', async () => {
        vi.spyOn(global, 'fetch').mockResolvedValue({
        ok: true,
        json: async () => [
            { id: 1, name: 'Keyboard', price: 99 },
            { id: 2, name: 'Mouse', price: 49 }
        ]
        } as Response)

        const { result } = renderHook(() => useProducts())

        await waitFor(() => {
        expect(result.current.data).toHaveLength(2)
        })

        expect(result.current.data[0]?.name).toBe('Keyboard')
    })

    test('should handle fetch error', async () => {
        vi.spyOn(global, 'fetch').mockResolvedValue({
        ok: false
        } as Response)

        const { result } = renderHook(() => useProducts())

        await waitFor(() => {
        expect(result.current.error).toBe('Failed to fetch products')
        })
    })

    test('should start with empty array', () => {
        vi.spyOn(global, 'fetch').mockImplementation(() => new Promise(() => {}))

        const { result } = renderHook(() => useProducts())

        expect(result.current.data).toEqual([])
    })
})