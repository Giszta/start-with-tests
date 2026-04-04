import { renderHook, waitFor } from '@testing-library/react'
import { afterEach, describe, expect, test, vi } from 'vitest'
import { useUser } from './useUser'


describe('useUser', () => {
    afterEach(() => {
        vi.restoreAllMocks()
    })

    test('should fetch user data', async () => {
        vi.spyOn(global, 'fetch').mockResolvedValue({
        ok: true,
        json: async () => ({ id: 1, name: 'John', email: 'john@example.com' })
        } as Response)

        const { result } = renderHook(() => useUser('1'))

        expect(result.current.loading).toBe(true)

        await waitFor(() => {
        expect(result.current.loading).toBe(false)
        })

        expect(result.current.data).toEqual({
        id: 1,
        name: 'John',
        email: 'john@example.com'
        })
        expect(result.current.error).toBeNull()
    })

    test('should handle fetch error', async () => {
        vi.spyOn(global, 'fetch').mockResolvedValue({
        ok: false
        } as Response)

        const { result } = renderHook(() => useUser('1'))

        await waitFor(() => {
        expect(result.current.error).toBe('Failed to fetch user')
        })

        expect(result.current.data).toBeNull()
        expect(result.current.loading).toBe(false)
    })

    test('should not fetch when userId is null', () => {
        const fetchSpy = vi.spyOn(global, 'fetch')

        const { result } = renderHook(() => useUser(null))

        expect(fetchSpy).not.toHaveBeenCalled()
        expect(result.current).toEqual({
        data: null,
        loading: false,
        error: null
        })
    })
})