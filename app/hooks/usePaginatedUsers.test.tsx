import { act, renderHook, waitFor } from '@testing-library/react'
import { afterEach, describe, expect, test, vi } from 'vitest'
import { usePaginatedUsers } from './usePaginatedUsers'

describe('usePaginatedUsers', () => {
    afterEach(() => {
        vi.restoreAllMocks()
    })

    test('pobiera pierwszą stronę', async () => {
        vi.spyOn(global, 'fetch').mockResolvedValue({
        ok: true,
        json: async () => ({
            items: [{ id: 1, name: 'Anna' }],
            page: 1,
            total: 25,
            pageSize: 10
        })
        } as Response)

        const { result } = renderHook(() => usePaginatedUsers())

        await waitFor(() => {
        expect(result.current.data).toEqual([{ id: 1, name: 'Anna' }])
        })

        expect(result.current.totalPages).toBe(3)
    })

    test('pozwala przejść na kolejną stronę', async () => {
        vi.spyOn(global, 'fetch')
        .mockResolvedValueOnce({
            ok: true,
            json: async () => ({ items: [{ id: 1, name: 'Anna' }], page: 1, total: 20, pageSize: 10 })
        } as Response)
        .mockResolvedValueOnce({
            ok: true,
            json: async () => ({ items: [{ id: 11, name: 'Jan' }], page: 2, total: 20, pageSize: 10 })
        } as Response)

        const { result } = renderHook(() => usePaginatedUsers())

        await waitFor(() => {
        expect(result.current.data[0]?.id).toBe(1)
        })

        act(() => {
        result.current.setPage(2)
        })

        await waitFor(() => {
        expect(result.current.data[0]?.id).toBe(11)
        })
    })

    test('obsługuje błąd API', async () => {
        vi.spyOn(global, 'fetch').mockResolvedValue({
        ok: false
        } as Response)

        const { result } = renderHook(() => usePaginatedUsers())

        await waitFor(() => {
        expect(result.current.error).toBe('Failed to fetch paginated users')
        })
    })
})