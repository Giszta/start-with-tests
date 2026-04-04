import { renderHook, waitFor } from '@testing-library/react'
import { afterEach, describe, expect, it, test, vi } from 'vitest'
import { useMessage } from './useMessage'

describe('useMessage', () => {
    afterEach(() => {
        vi.restoreAllMocks()
    })

    test('should fetch message', async () => {
        vi.spyOn(global, 'fetch').mockResolvedValue({
        ok: true,
        json: async () => ({ id: 1, text: 'Hi there' })
        } as Response)

        const { result } = renderHook(() => useMessage('1'))

        await waitFor(() => {
        expect(result.current.data?.text).toBe('Hi there')
        })
    })

    test('should handle error', async () => {
        vi.spyOn(global, 'fetch').mockResolvedValue({
        ok: false
        } as Response)

        const { result } = renderHook(() => useMessage('1'))

        await waitFor(() => {
        expect(result.current.error).toBe('Failed to fetch message')
        })
    })

    test('should not fetch without messageId', () => {
        const fetchSpy = vi.spyOn(global, 'fetch')

        renderHook(() => useMessage(null))

        expect(fetchSpy).not.toHaveBeenCalled()
    })
})