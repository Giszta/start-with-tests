import { renderHook, waitFor } from '@testing-library/react'
import { afterEach, describe, expect, it, test, vi } from 'vitest'
import { useMessages } from './useMessages'

describe('useMessages', () => {
    afterEach(() => {
        vi.restoreAllMocks()
    })

    test('should fetch messages', async () => {
        vi.spyOn(global, 'fetch').mockResolvedValue({
        ok: true,
        json: async () => [
            { id: 1, text: 'Hello' }
        ]
        } as Response)

        const { result } = renderHook(() => useMessages())

        await waitFor(() => {
        expect(result.current.data[0]?.text).toBe('Hello')
        })
    })

    test('should handle fetch error', async () => {
        vi.spyOn(global, 'fetch').mockResolvedValue({
        ok: false
        } as Response)

        const { result } = renderHook(() => useMessages())

        await waitFor(() => {
        expect(result.current.error).toBe('Failed to fetch messages')
        })
    })

    test('should start with empty messages', () => {
        vi.spyOn(global, 'fetch').mockImplementation(() => new Promise(() => {}))

        const { result } = renderHook(() => useMessages())

        expect(result.current.data).toEqual([])
    })
})