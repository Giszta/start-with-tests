import { renderHook, waitFor } from '@testing-library/react'
import { afterEach, describe, expect, test, vi } from 'vitest'
import { useUserPosts } from './useUserPosts'

describe('useUserPosts', () => {
    afterEach(() => {
        vi.restoreAllMocks()
    })

    test('pobiera użytkownika i potem jego posty', async () => {
        vi.spyOn(global, 'fetch')
        .mockResolvedValueOnce({
            ok: true,
            json: async () => ({ id: 1, name: 'Anna' })
        } as Response)
        .mockResolvedValueOnce({
            ok: true,
            json: async () => [{ id: 1, title: 'Post 1' }]
        } as Response)

        const { result } = renderHook(() => useUserPosts('1'))

        await waitFor(() => {
        expect(result.current.user?.name).toBe('Anna')
        expect(result.current.posts[0]?.title).toBe('Post 1')
        })
    })

    test('nie pobiera postów, gdy pierwszy request kończy się błędem', async () => {
        const fetchSpy = vi.spyOn(global, 'fetch').mockResolvedValue({
        ok: false
        } as Response)

        const { result } = renderHook(() => useUserPosts('1'))

        await waitFor(() => {
        expect(result.current.error).toBe('Failed to fetch user')
        })

        expect(fetchSpy).toHaveBeenCalledTimes(1)
    })

    test('obsługuje błąd drugiego requestu', async () => {
        vi.spyOn(global, 'fetch')
        .mockResolvedValueOnce({
            ok: true,
            json: async () => ({ id: 1, name: 'Anna' })
        } as Response)
        .mockResolvedValueOnce({
            ok: false
        } as Response)

        const { result } = renderHook(() => useUserPosts('1'))

        await waitFor(() => {
        expect(result.current.error).toBe('Failed to fetch user posts')
        })
    })
})