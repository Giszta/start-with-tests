import { renderHook, waitFor } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'
import { resetUsersCache, useCachedUsers } from './useCachedUsers'

describe('useCachedUsers', () => {
  beforeEach(() => {
    resetUsersCache()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  test('zapisuje wynik do cache', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => [{ id: 1, name: 'Anna' }]
    } as Response)

    const { result } = renderHook(() => useCachedUsers('team-a'))

    await waitFor(() => {
      expect(result.current.data).toEqual([{ id: 1, name: 'Anna' }])
    })
  })

  test('używa cache bez kolejnego fetcha', async () => {
    const fetchSpy = vi.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => [{ id: 1, name: 'Anna' }]
    } as Response)

    const first = renderHook(() => useCachedUsers('team-a'))

    await waitFor(() => {
      expect(first.result.current.data).toHaveLength(1)
    })

    const second = renderHook(() => useCachedUsers('team-a'))

    expect(second.result.current.data).toEqual([{ id: 1, name: 'Anna' }])
    expect(fetchSpy).toHaveBeenCalledTimes(1)
  })

  test('obsługuje błąd fetcha', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValue({
      ok: false
    } as Response)

    const { result } = renderHook(() => useCachedUsers('team-a'))

    await waitFor(() => {
      expect(result.current.error).toBe('Failed to fetch cached users')
    })
  })
})