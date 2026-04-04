import { renderHook, waitFor } from '@testing-library/react'
import { afterEach, describe, expect, test, vi } from 'vitest'
import { useOrders } from './useOrders'

describe('useOrders', () => {
    afterEach(() => {
        vi.restoreAllMocks()
    })

    test('should fetch orders for user', async () => {
        vi.spyOn(global, 'fetch').mockResolvedValue({
        ok: true,
        json: async () => [
            { id: 1, total: 200, status: 'paid' }
        ]
        } as Response)

        const { result } = renderHook(() => useOrders('1'))

        await waitFor(() => {
        expect(result.current.data[0]?.status).toBe('paid')
        })
    })

    test('should handle error', async () => {
        vi.spyOn(global, 'fetch').mockResolvedValue({
        ok: false
        } as Response)

        const { result } = renderHook(() => useOrders('1'))

        await waitFor(() => {
        expect(result.current.error).toBe('Failed to fetch orders')
        })
    })

    test('should not fetch without userId', () => {
        const fetchSpy = vi.spyOn(global, 'fetch')

        renderHook(() => useOrders(null))

        expect(fetchSpy).not.toHaveBeenCalled()
    })
})