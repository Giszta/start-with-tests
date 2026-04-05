import { renderHook, waitFor } from '@testing-library/react'
import { describe, expect, test, vi } from 'vitest'
import { useFetchWithAbort } from './useFetchWithAbort'

describe('useFetchWithAbort', () => {
    test('pobiera dane dla podanego url', async () => {
        vi.spyOn(global, 'fetch').mockResolvedValue({
        ok: true,
        json: async () => ({ value: 123 })
        } as Response)

        const { result } = renderHook(() => useFetchWithAbort<{ value: number }>('/api/test'))

        await waitFor(() => {
        expect(result.current.data).toEqual({ value: 123 })
        })
    })

    test('przekazuje signal do fetcha', async () => {
        const fetchSpy = vi.spyOn(global, 'fetch').mockResolvedValue({
        ok: true,
        json: async () => ({ ok: true })
        } as Response)

        renderHook(() => useFetchWithAbort('/api/test'))

        await waitFor(() => {
        expect(fetchSpy).toHaveBeenCalled()
        })

        const options = fetchSpy.mock.calls[0]?.[1] as { signal?: AbortSignal }
        expect(options.signal).toBeDefined()
    })

    test('ignoruje AbortError', async () => {
        vi.spyOn(global, 'fetch').mockRejectedValue(new DOMException('Aborted', 'AbortError'))

        const { result } = renderHook(() => useFetchWithAbort('/api/test'))

        await waitFor(() => {
        expect(result.current.loading).toBe(false)
        })

        expect(result.current.error).toBeNull()
    })
})