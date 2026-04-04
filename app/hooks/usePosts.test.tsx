import { renderHook, waitFor } from '@testing-library/react'
import { afterEach, describe, expect, test, vi } from 'vitest'
import { usePosts } from './usePosts'

describe('usePosts', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  test('should fetch posts', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => [
        { id: 1, title: 'Post 1' },
        { id: 2, title: 'Post 2' }
      ]
    } as Response)

    const { result } = renderHook(() => usePosts())

    expect(result.current.loading).toBe(true)

    await waitFor(() => {
      expect(result.current.data).toHaveLength(2)
    })

    expect(result.current.error).toBeNull()
    expect(result.current.loading).toBe(false)
  })

  test('should handle fetch failure', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValue({
      ok: false
    } as Response)

    const { result } = renderHook(() => usePosts())

    await waitFor(() => {
      expect(result.current.error).toBe('Failed to fetch posts')
    })
  })

  test('should return empty list initially', () => {
    vi.spyOn(global, 'fetch').mockImplementation(() => new Promise(() => {}))

    const { result } = renderHook(() => usePosts())

    expect(result.current.data).toEqual([])
    expect(result.current.loading).toBe(true)
    expect(result.current.error).toBeNull()
  })
})