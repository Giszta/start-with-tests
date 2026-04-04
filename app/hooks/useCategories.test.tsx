import { renderHook, waitFor } from '@testing-library/react'
import { afterEach, describe, expect, test, vi } from 'vitest'
import { useCategories } from './useCategories'

describe('useCategories', () => {
    afterEach(() => {
        vi.restoreAllMocks()
    })

    test('should fetch categories', async () => {
        vi.spyOn(global, 'fetch').mockResolvedValue({
        ok: true,
        json: async () => [
            { id: 1, name: 'Electronics' },
            { id: 2, name: 'Books' }
        ]
        } as Response)

        const { result } = renderHook(() => useCategories())

        await waitFor(() => {
        expect(result.current.data).toHaveLength(2)
        })
    })

    test('should handle error', async () => {
        vi.spyOn(global, 'fetch').mockResolvedValue({
        ok: false
        } as Response)

        const { result } = renderHook(() => useCategories())

        await waitFor(() => {
        expect(result.current.error).toBe('Failed to fetch categories')
        })
    })

    test('should handle empty list', async () => {
        vi.spyOn(global, 'fetch').mockResolvedValue({
        ok: true,
        json: async () => []
        } as Response)

        const { result } = renderHook(() => useCategories())

        await waitFor(() => {
        expect(result.current.data).toEqual([])
        })
    })
})