import { renderHook, waitFor } from '@testing-library/react'
import { afterEach, describe, expect, test, vi } from 'vitest'
import { useComments } from './useComments'


describe('useComments', () => {
    afterEach(() => {
        vi.restoreAllMocks()
    })

    test('should fetch comments for post', async () => {
        vi.spyOn(global, 'fetch').mockResolvedValue({
        ok: true,
        json: async () => [
            { id: 1, body: 'Nice post' },
            { id: 2, body: 'Thanks' }
        ]
        } as Response)

        const { result } = renderHook(() => useComments('1'))

        await waitFor(() => {
        expect(result.current.data).toHaveLength(2)
        })
    })

    test('should handle error', async () => {
        vi.spyOn(global, 'fetch').mockResolvedValue({
        ok: false
        } as Response)

        const { result } = renderHook(() => useComments('1'))

        await waitFor(() => {
        expect(result.current.error).toBe('Failed to fetch comments')
        })
    })

    test('should not fetch when postId is null', () => {
        const fetchSpy = vi.spyOn(global, 'fetch')

        renderHook(() => useComments(null))

        expect(fetchSpy).not.toHaveBeenCalled()
    })
})