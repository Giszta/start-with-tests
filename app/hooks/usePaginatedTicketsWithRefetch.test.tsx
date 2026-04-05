import { act, renderHook, waitFor } from '@testing-library/react'
import { afterEach, describe, expect, test, vi } from 'vitest'
import { usePaginatedTicketsWithRefetch } from './usePaginatedTicketsWithRefetch'

describe('usePaginatedTicketsWithRefetch', () => {
    afterEach(() => {
        vi.restoreAllMocks()
    })

    test('pobiera stronę ticketów', async () => {
        vi.spyOn(global, 'fetch').mockResolvedValue({
        ok: true,
        json: async () => ({ items: [{ id: 'T1', subject: 'Issue' }], total: 50 })
        } as Response)

        const { result } = renderHook(() => usePaginatedTicketsWithRefetch())

        await waitFor(() => {
        expect(result.current.data[0]?.id).toBe('T1')
        })
    })

    test('pozwala ręcznie odświeżyć dane', async () => {
        const fetchSpy = vi.spyOn(global, 'fetch')
        .mockResolvedValueOnce({
            ok: true,
            json: async () => ({ items: [{ id: 'T1', subject: 'Issue 1' }], total: 50 })
        } as Response)
        .mockResolvedValueOnce({
            ok: true,
            json: async () => ({ items: [{ id: 'T1', subject: 'Issue 1 updated' }], total: 50 })
        } as Response)

        const { result } = renderHook(() => usePaginatedTicketsWithRefetch())

        await waitFor(() => {
        expect(result.current.data[0]?.subject).toBe('Issue 1')
        })

        await act(async () => {
        await result.current.refetch()
        })

        expect(fetchSpy).toHaveBeenCalledTimes(2)
        expect(result.current.data[0]?.subject).toBe('Issue 1 updated')
    })

    test('zachowuje numer aktualnej strony', async () => {
        vi.spyOn(global, 'fetch').mockResolvedValue({
        ok: true,
        json: async () => ({ items: [], total: 50 })
        } as Response)

        const { result } = renderHook(() => usePaginatedTicketsWithRefetch())

        act(() => {
        result.current.setPage(3)
        })

        await waitFor(() => {
        expect(result.current.page).toBe(3)
        })
    })
})