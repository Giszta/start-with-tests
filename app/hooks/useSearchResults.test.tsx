import { renderHook, waitFor } from '@testing-library/react'
import { afterEach, describe, expect, test, vi } from 'vitest'
import { useSearchResults } from './useSearchResults'

describe('useSearchResults', () => {
    afterEach(() => {
        vi.restoreAllMocks()
    })

    test('should fetch search results', async () => {
        vi.spyOn(global, 'fetch').mockResolvedValue({
        ok: true,
        json: async () => [
            { id: 1, label: 'React' }
        ]
        } as Response)

        const { result } = renderHook(() => useSearchResults('react'))

        await waitFor(() => {
        expect(result.current.data[0]?.label).toBe('React')
        })
    })

    test('should not fetch for empty query', () => {
        const fetchSpy = vi.spyOn(global, 'fetch')

        const { result } = renderHook(() => useSearchResults('   '))

        expect(fetchSpy).not.toHaveBeenCalled()
        expect(result.current.data).toEqual([])
    })

    test('should handle fetch error', async () => {
        vi.spyOn(global, 'fetch').mockResolvedValue({
        ok: false
        } as Response)

        const { result } = renderHook(() => useSearchResults('react'))

        await waitFor(() => {
        expect(result.current.error).toBe('Failed to fetch search results')
        })
    })
})