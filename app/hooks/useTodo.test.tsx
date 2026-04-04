import { renderHook, waitFor } from '@testing-library/react'
import { afterEach, describe, expect, test, vi } from 'vitest'
import { useTodo } from './useTodo'

describe('useTodo', () => {
    afterEach(() => {
        vi.restoreAllMocks()
    })

    test('should fetch one todo', async () => {
        vi.spyOn(global, 'fetch').mockResolvedValue({
        ok: true,
        json: async () => ({ id: 1, title: 'Task 1', completed: true })
        } as Response)

        const { result } = renderHook(() => useTodo('1'))

        await waitFor(() => {
        expect(result.current.data?.completed).toBe(true)
        })
    })

    test('should handle fetch error', async () => {
        vi.spyOn(global, 'fetch').mockResolvedValue({
        ok: false
        } as Response)

        const { result } = renderHook(() => useTodo('1'))

        await waitFor(() => {
        expect(result.current.error).toBe('Failed to fetch todo')
        })
    })

    test('should not fetch when todoId is null', () => {
        const fetchSpy = vi.spyOn(global, 'fetch')

        renderHook(() => useTodo(null))

        expect(fetchSpy).not.toHaveBeenCalled()
    })
})