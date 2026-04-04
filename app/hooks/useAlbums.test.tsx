import { renderHook, waitFor } from '@testing-library/react'
import { afterEach, describe, expect, test, vi } from 'vitest'
import { useAlbums } from './useAlbums'

describe('useAlbums', () => {
    afterEach(() => {
        vi.restoreAllMocks()
    })

    test('should fetch albums', async () => {
        vi.spyOn(global, 'fetch').mockResolvedValue({
        ok: true,
        json: async () => [
            { id: 1, title: 'Album 1' },
            { id: 2, title: 'Album 2' }
        ]
        } as Response)

        const { result } = renderHook(() => useAlbums())

        await waitFor(() => {
        expect(result.current.data).toHaveLength(2)
        })
    })

    test('should handle error', async () => {
        vi.spyOn(global, 'fetch').mockResolvedValue({
        ok: false
        } as Response)

        const { result } = renderHook(() => useAlbums())

        await waitFor(() => {
        expect(result.current.error).toBe('Failed to fetch albums')
        })
    })

    test('should have initial state', () => {
        vi.spyOn(global, 'fetch').mockImplementation(() => new Promise(() => {}))

        const { result } = renderHook(() => useAlbums())

        expect(result.current.data).toEqual([])
        expect(result.current.loading).toBe(true)
        expect(result.current.error).toBeNull()
    })
})