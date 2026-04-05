import { renderHook, waitFor } from '@testing-library/react'
import { afterEach, describe, expect, test, vi } from 'vitest'
import { useAuthenticatedProfile } from './useAuthenticatedProfile'

describe('useAuthenticatedProfile', () => {
    afterEach(() => {
        vi.restoreAllMocks()
    })

    test('dołącza token do nagłówka Authorization', async () => {
        const fetchSpy = vi.spyOn(global, 'fetch').mockResolvedValue({
        ok: true,
        json: async () => ({ id: 1, username: 'giszta' })
        } as Response)

        renderHook(() => useAuthenticatedProfile('secret-token'))

        await waitFor(() => {
        expect(fetchSpy).toHaveBeenCalled()
        })

        expect(fetchSpy).toHaveBeenCalledWith('/api/profile', {
        headers: {
            Authorization: 'Bearer secret-token'
        }
        })
    })

    test('pobiera profil po poprawnym tokenie', async () => {
        vi.spyOn(global, 'fetch').mockResolvedValue({
        ok: true,
        json: async () => ({ id: 1, username: 'giszta' })
        } as Response)

        const { result } = renderHook(() => useAuthenticatedProfile('secret-token'))

        await waitFor(() => {
        expect(result.current.data).toEqual({ id: 1, username: 'giszta' })
        })
    })

    test('zwraca błąd bez tokenu', () => {
        const { result } = renderHook(() => useAuthenticatedProfile(null))

        expect(result.current.error).toBe('Missing auth token')
        expect(result.current.data).toBeNull()
    })
})