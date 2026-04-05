import { useEffect, useState } from 'react'

type User = {
  id: number
  name: string
}

const usersCache = new Map<string, User[]>()

export function resetUsersCache() {
  usersCache.clear()
}

export function useCachedUsers(cacheKey: string) {
  const [data, setData] = useState<User[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const cached = usersCache.get(cacheKey)

    if (cached) {
      setData(cached)
      return
    }

    let isCancelled = false

    async function fetchUsers() {
      setLoading(true)
      setError(null)

      try {
        const response = await fetch(`/api/users?cacheKey=${cacheKey}`)

        if (!response.ok) {
          throw new Error('Failed to fetch cached users')
        }

        const result: User[] = await response.json()

        usersCache.set(cacheKey, result)

        if (!isCancelled) {
          setData(result)
        }
      } catch (error) {
        if (!isCancelled) {
          setError(error instanceof Error ? error.message : 'Unknown error')
        }
      } finally {
        if (!isCancelled) {
          setLoading(false)
        }
      }
    }

    void fetchUsers()

    return () => {
      isCancelled = true
    }
  }, [cacheKey])

  return { data, loading, error }
}