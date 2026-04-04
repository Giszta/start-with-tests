import { renderHook, waitFor } from '@testing-library/react'
import { afterEach, describe, expect, it, test, vi } from 'vitest'
import { useNotifications } from './useNotifications'

describe('useNotifications', () => {
    afterEach(() => {
        vi.restoreAllMocks()
    })

    test('should fetch notifications', async () => {
        vi.spyOn(global, 'fetch').mockResolvedValue({
        ok: true,
        json: async () => [
            { id: 1, message: 'Welcome', read: false }
        ]
        } as Response)

        const { result } = renderHook(() => useNotifications())

        await waitFor(() => {
        expect(result.current.data).toHaveLength(1)
        })
    })

    test('should handle error', async () => {
        vi.spyOn(global, 'fetch').mockResolvedValue({
        ok: false
        } as Response)

        const { result } = renderHook(() => useNotifications())

        await waitFor(() => {
        expect(result.current.error).toBe('Failed to fetch notifications')
        })
    })

    test('should set loading initially', () => {
        vi.spyOn(global, 'fetch').mockImplementation(() => new Promise(() => {}))

        const { result } = renderHook(() => useNotifications())

        expect(result.current.loading).toBe(true)
    })
})