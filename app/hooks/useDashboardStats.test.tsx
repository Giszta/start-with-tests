import { renderHook, waitFor } from '@testing-library/react'
import { afterEach, describe, expect, test, vi } from 'vitest'
import { useDashboardStats } from './useDashboardStats'

describe('useDashboardStats', () => {
    afterEach(() => {
        vi.restoreAllMocks()
    })

    test('should fetch dashboard stats', async () => {
        vi.spyOn(global, 'fetch').mockResolvedValue({
        ok: true,
        json: async () => ({
            usersCount: 10,
            salesCount: 20,
            ordersCount: 30
        })
        } as Response)

        const { result } = renderHook(() => useDashboardStats())

        await waitFor(() => {
        expect(result.current.data?.ordersCount).toBe(30)
        })
    })

    test('should handle error', async () => {
        vi.spyOn(global, 'fetch').mockResolvedValue({
        ok: false
        } as Response)

        const { result } = renderHook(() => useDashboardStats())

        await waitFor(() => {
        expect(result.current.error).toBe('Failed to fetch dashboard stats')
        })
    })

    test('should return numeric stats', async () => {
        vi.spyOn(global, 'fetch').mockResolvedValue({
        ok: true,
        json: async () => ({
            usersCount: 10,
            salesCount: 20,
            ordersCount: 30
        })
        } as Response)

        const { result } = renderHook(() => useDashboardStats())

        await waitFor(() => {
        expect(typeof result.current.data?.usersCount).toBe('number')
        })
    })
})