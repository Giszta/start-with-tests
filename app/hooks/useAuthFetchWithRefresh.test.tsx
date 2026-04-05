import { act, renderHook, waitFor } from '@testing-library/react'
import { afterEach, describe, expect, test, vi } from 'vitest'
import { useAuthFetchWithRefresh } from './useAuthFetchWithRefresh'

describe('useAuthFetchWithRefresh', () => {
    afterEach(() => {
        vi.restoreAllMocks()
    })

    test('wysyła request z tokenem', async () => {
        const fetchSpy = vi.spyOn(global, 'fetch').mockResolvedValue({
        ok: true,
        status: 200,
        json: async () => ({ id: 1, username: 'giszta' })
        } as Response)

        const refreshToken = vi.fn(async () => 'new-token')
        const { result } = renderHook(() =>
        useAuthFetchWithRefresh('old-token', refreshToken)
        )

        await act(async () => {
        await result.current.fetchProfile()
        })

        expect(fetchSpy).toHaveBeenCalledWith('/api/profile', {
        headers: {
            Authorization: 'Bearer old-token'
        }
        })
    })

    test('robi retry po odświeżeniu tokenu', async () => {
        vi.spyOn(global, 'fetch')
        .mockResolvedValueOnce({ ok: false, status: 401 } as Response)
        .mockResolvedValueOnce({
            ok: true,
            status: 200,
            json: async () => ({ id: 1, username: 'giszta' })
        } as Response)

        const refreshToken = vi.fn(async () => 'new-token')
        const { result } = renderHook(() =>
        useAuthFetchWithRefresh('old-token', refreshToken)
        )

        await act(async () => {
        await result.current.fetchProfile()
        })

        expect(refreshToken).toHaveBeenCalledTimes(1)
        expect(result.current.data).toEqual({ id: 1, username: 'giszta' })
    })

    test('zwraca błąd gdy refresh się nie uda', async () => {
        vi.spyOn(global, 'fetch').mockResolvedValue({ ok: false, status: 401 } as Response)

        const refreshToken = vi.fn(async () => {
        throw new Error('Refresh failed')
        })

        const { result } = renderHook(() =>
        useAuthFetchWithRefresh('old-token', refreshToken)
        )

        await act(async () => {
        await result.current.fetchProfile()
        })

        await waitFor(() => {
        expect(result.current.error).toBe('Refresh failed')
        })
    })
})