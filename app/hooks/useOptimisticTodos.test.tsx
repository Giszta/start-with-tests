import { act, renderHook } from '@testing-library/react'
import { afterEach, describe, expect, test, vi } from 'vitest'
import { useOptimisticTodos } from './useOptimisticTodos'

describe('useOptimisticTodos', () => {
    afterEach(() => {
        vi.restoreAllMocks()
    })

    test('dodaje todo optymistycznie od razu', async () => {
        vi.spyOn(global, 'fetch').mockImplementation(
        () => new Promise(() => {}) as Promise<Response>
        )

        const { result } = renderHook(() => useOptimisticTodos([]))

        act(() => {
        void result.current.addTodo('Nowe zadanie')
        })

        expect(result.current.data).toHaveLength(1)
        expect(result.current.data[0]?.title).toBe('Nowe zadanie')
    })

    test('podmienia optymistyczny wpis po sukcesie', async () => {
        vi.spyOn(global, 'fetch').mockResolvedValue({
        ok: true,
        json: async () => ({ id: 101, title: 'Nowe zadanie' })
        } as Response)

        const { result } = renderHook(() => useOptimisticTodos([]))

        await act(async () => {
        await result.current.addTodo('Nowe zadanie')
        })

        expect(result.current.data).toEqual([{ id: 101, title: 'Nowe zadanie' }])
    })

    test('robi rollback po błędzie', async () => {
        vi.spyOn(global, 'fetch').mockResolvedValue({
        ok: false
        } as Response)

        const { result } = renderHook(() => useOptimisticTodos([]))

        await act(async () => {
        await result.current.addTodo('Nowe zadanie')
        })

        expect(result.current.data).toEqual([])
        expect(result.current.error).toBe('Failed to create todo')
    })
})