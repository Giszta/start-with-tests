import { renderHook, waitFor } from '@testing-library/react'
import { afterEach, describe, expect, test, vi } from 'vitest'
import { usePhotos } from './usePhotos'

describe('usePhotos', () => {
    afterEach(() => {
        vi.restoreAllMocks()
    })

    test('should fetch photos', async () => {
        vi.spyOn(global, 'fetch').mockResolvedValue({
        ok: true,
        json: async () => [
            { id: 1, title: 'Photo 1', url: '/1.jpg' }
        ]
        } as Response)

        const { result } = renderHook(() => usePhotos('1'))

        await waitFor(() => {
        expect(result.current.data[0]?.title).toBe('Photo 1')
        })
    })

    test('should handle error', async () => {
        vi.spyOn(global, 'fetch').mockResolvedValue({
        ok: false
        } as Response)

        const { result } = renderHook(() => usePhotos('1'))

        await waitFor(() => {
        expect(result.current.error).toBe('Failed to fetch photos')
        })
    })

    test('should not fetch without albumId', () => {
        const fetchSpy = vi.spyOn(global, 'fetch')

        renderHook(() => usePhotos(null))

        expect(fetchSpy).not.toHaveBeenCalled()
    })
})