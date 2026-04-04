import { renderHook, waitFor } from '@testing-library/react'
import { afterEach, describe, expect, test, vi } from 'vitest'
import { useTodos } from './useTodos'

describe('useTodos', () => {
    afterEach(() => {
        vi.restoreAllMocks()
    })

    test('should fetch todos', async () => {
        vi.spyOn(global, 'fetch').mockResolvedValue({
        ok: true,
        json: async () => [
            { id: 1, title: 'Task 1', completed: false }
        ]
        } as Response)

        const { result } = renderHook(() => useTodos())

        await waitFor(() => {
        expect(result.current.data).toHaveLength(1)
        })
    })

    test('should handle error', async () => {
        vi.spyOn(global, 'fetch').mockResolvedValue({
        ok: false
        } as Response)

        const { result } = renderHook(() => useTodos())

        await waitFor(() => {
        expect(result.current.error).toBe('Failed to fetch todos')
        })
    })

    test('should expose initial loading state', () => {
        vi.spyOn(global, 'fetch').mockImplementation(() => new Promise(() => {}))

        const { result } = renderHook(() => useTodos())

        expect(result.current.loading).toBe(true)
        expect(result.current.data).toEqual([])
    })
})