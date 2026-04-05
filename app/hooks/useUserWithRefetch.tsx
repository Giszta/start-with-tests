import { useCallback, useEffect, useState } from 'react'

type User = {
    id: number
    name: string
}

type UseUserWithRefetchResult = {
    data: User | null
    loading: boolean
    error: string | null
    refetch: () => Promise<void>
}

export function useUserWithRefetch(userId: string | null): UseUserWithRefetchResult {
    const [data, setData] = useState<User | null>(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const fetchUser = useCallback(async () => {
        if (!userId) {
        setData(null)
        setLoading(false)
        setError(null)
        return
        }

        setLoading(true)
        setError(null)

        try {
        const response = await fetch(`/api/users/${userId}`)

        if (!response.ok) {
            throw new Error('Failed to fetch user')
        }

        const result: User = await response.json()
        setData(result)
        } catch (error) {
        setError(error instanceof Error ? error.message : 'Unknown error')
        } finally {
        setLoading(false)
        }
    }, [userId])

    useEffect(() => {
        void fetchUser()
    }, [fetchUser])

    return {
        data,
        loading,
        error,
        refetch: fetchUser
    }
}