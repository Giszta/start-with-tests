import { renderHook, waitFor } from '@testing-library/react'
import { afterEach, describe, expect, it, test, vi } from 'vitest'
import { useProfile } from './useProfile'

describe('useProfile', () => {
    afterEach(() => {
        vi.restoreAllMocks()
    })

    test('should fetch profile', async () => {
        vi.spyOn(global, 'fetch').mockResolvedValue({
        ok: true,
        json: async () => ({ id: 1, username: 'giszta', avatar: '/avatar.png' })
        } as Response)

        const { result } = renderHook(() => useProfile())

        await waitFor(() => {
        expect(result.current.data?.username).toBe('giszta')
        })
    })

    test('should handle error', async () => {
        vi.spyOn(global, 'fetch').mockResolvedValue({
        ok: false
        } as Response)

        const { result } = renderHook(() => useProfile())

        await waitFor(() => {
        expect(result.current.error).toBe('Failed to fetch profile')
        })
    })

    test('should return avatar field', async () => {
        vi.spyOn(global, 'fetch').mockResolvedValue({
        ok: true,
        json: async () => ({ id: 1, username: 'giszta', avatar: '/avatar.png' })
        } as Response)

        const { result } = renderHook(() => useProfile())

        await waitFor(() => {
        expect(result.current.data?.avatar).toBe('/avatar.png')
        })
    })
})