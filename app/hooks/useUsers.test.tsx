import { renderHook, waitFor } from '@testing-library/react'
import { afterEach, describe, expect, test, vi } from 'vitest'
import { useUsers } from './useUsers'

describe('useUsers', () => {
    afterEach(() => {
        vi.restoreAllMocks()
    })

    test('should fetch users list', async () => {
        vi.spyOn(global, 'fetch').mockResolvedValue({
        ok: true,
        json: async () => [
            { id: 1, name: 'John' },
            { id: 2, name: 'Kate' }
        ]
        } as Response)

        const { result } = renderHook(() => useUsers())

        await waitFor(() => {
        expect(result.current.loading).toBe(false)
        })

        expect(result.current.data).toEqual([
        { id: 1, name: 'John' },
        { id: 2, name: 'Kate' }
        ])
        expect(result.current.error).toBeNull()
    })

    test('should handle empty users list', async () => {
        vi.spyOn(global, 'fetch').mockResolvedValue({
        ok: true,
        json: async () => []
        } as Response)

        const { result } = renderHook(() => useUsers())

        await waitFor(() => {
        expect(result.current.loading).toBe(false)
        })

        expect(result.current.data).toEqual([])
    })

    test('should handle api error', async () => {
        vi.spyOn(global, 'fetch').mockResolvedValue({
        ok: false
        } as Response)

        const { result } = renderHook(() => useUsers())

        await waitFor(() => {
        expect(result.current.error).toBe('Failed to fetch users')
        })
    })
})