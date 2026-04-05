import { act, renderHook, waitFor } from '@testing-library/react'
import { afterEach, describe, expect, test, vi } from 'vitest'
import { useInfinitePosts } from './useInfinitePosts'

describe('useInfinitePosts', () => {
    afterEach(() => {
        vi.restoreAllMocks()
    })

    test('pobiera pierwszą stronę', async () => {    vi.spyOn(global, 'fetch').mockResolvedValue({
        ok: true,
        json: async () => ({ items: [{ id: 1, title: 'Post 1' }], hasMore: true })
        } as Response)

        const { result } = renderHook(() => useInfinitePosts())

        await waitFor(() => {
        expect(result.current.data).toEqual([{ id: 1, title: 'Post 1' }])
        })
    })

    test('doładowuje kolejną stronę', async () => {
        vi.spyOn(global, 'fetch')
        .mockResolvedValueOnce({
            ok: true,
            json: async () => ({ items: [{ id: 1, title: 'Post 1' }], hasMore: true })
        } as Response)
        .mockResolvedValueOnce({
            ok: true,
            json: async () => ({ items: [{ id: 2, title: 'Post 2' }], hasMore: false })
        } as Response)

        const { result } = renderHook(() => useInfinitePosts())

        await waitFor(() => {
        expect(result.current.data).toHaveLength(1)
        })

        act(() => {
        result.current.loadMore()
        })

        await waitFor(() => {
        expect(result.current.data).toEqual([
            { id: 1, title: 'Post 1' },
            { id: 2, title: 'Post 2' }
        ])
        })
    })

    test('zatrzymuje ładowanie po końcu listy', async () => {
        const fetchSpy = vi.spyOn(global, 'fetch').mockResolvedValue({
        ok: true,
        json: async () => ({ items: [{ id: 1, title: 'Post 1' }], hasMore: false })
        } as Response)

        const { result } = renderHook(() => useInfinitePosts())

        await waitFor(() => {
        expect(result.current.hasMore).toBe(false)
        })

        act(() => {
        result.current.loadMore()
        })

        expect(fetchSpy).toHaveBeenCalledTimes(1)
    })
})