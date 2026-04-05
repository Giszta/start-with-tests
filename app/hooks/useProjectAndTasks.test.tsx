import { renderHook, waitFor } from '@testing-library/react'
import { afterEach, describe, expect, test, vi } from 'vitest'
import { useProjectAndTasks } from './useProjectAndTasks'

describe('useProjectAndTasks', () => {
    afterEach(() => {
        vi.restoreAllMocks()
    })

    test('pobiera projekt i jego taski', async () => {
        vi.spyOn(global, 'fetch')
        .mockResolvedValueOnce({
            ok: true,
            json: async () => ({ id: 7, name: 'Nauka programowania' })
        } as Response)
        .mockResolvedValueOnce({
            ok: true,
            json: async () => [{ id: 1, title: 'Setup repo' }]
        } as Response)

        const { result } = renderHook(() => useProjectAndTasks('nauka-programowania'))

        await waitFor(() => {
        expect(result.current.project?.id).toBe(7)
        expect(result.current.tasks[0]?.title).toBe('Setup repo')
        })
    })

    test('obsługuje błąd pobierania projektu', async () => {
        vi.spyOn(global, 'fetch').mockResolvedValue({ ok: false } as Response)

        const { result } = renderHook(() => useProjectAndTasks('nauka-programowania'))

        await waitFor(() => {
        expect(result.current.error).toBe('Failed to fetch project')
        })
    })

    test('obsługuje błąd pobierania tasków', async () => {
        vi.spyOn(global, 'fetch')
        .mockResolvedValueOnce({
            ok: true,
            json: async () => ({ id: 7, name: 'Nauka programowania' })
        } as Response)
        .mockResolvedValueOnce({ ok: false } as Response)

        const { result } = renderHook(() => useProjectAndTasks('nauka-programowania'))

        await waitFor(() => {
        expect(result.current.error).toBe('Failed to fetch tasks')
        })
    })
})