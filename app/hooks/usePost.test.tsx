import { renderHook, waitFor } from '@testing-library/react'
import { afterEach, describe, expect, test, vi } from 'vitest'
import { usePost } from './usePost'

describe('usePost', () => {
    afterEach(() => {
        vi.restoreAllMocks()
    })

    test('should fetch a single post', async () => {
        vi.spyOn(global, 'fetch').mockResolvedValue({
        ok: true,
        json: async () => ({ id: 1, title: 'Post 1', body: 'Body' })
        } as Response)

        const { result } = renderHook(() => usePost('1'))

        await waitFor(() => {
        expect(result.current.data?.id).toBe(1)
        })

        expect(result.current.error).toBeNull()
        expect(result.current.loading).toBe(false)
    })

    test('should not fetch when postId is null', () => {
        const fetchSpy = vi.spyOn(global, 'fetch')

        const { result } = renderHook(() => usePost(null))

        expect(fetchSpy).not.toHaveBeenCalled()
        expect(result.current).toEqual({
        data: null,
        loading: false,
        error: null
        })
    })

    test('should handle error when request fails', async () => {
        vi.spyOn(global, 'fetch').mockResolvedValue({
        ok: false
        } as Response)

        const { result } = renderHook(() => usePost('1'))

        await waitFor(() => {
        expect(result.current.error).toBe('Failed to fetch post')
        })
    })
})