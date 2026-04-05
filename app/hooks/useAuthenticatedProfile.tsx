import { useEffect, useState } from 'react'

type Profile = {
    id: number
    username: string
}

export function useAuthenticatedProfile(token: string | null) {
    const [data, setData] = useState<Profile | null>(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        if (!token) {
        setData(null)
        setLoading(false)
        setError('Missing auth token')
        return
        }

        let isCancelled = false

        async function fetchProfile() {
        setLoading(true)
        setError(null)

        try {
            const response = await fetch('/api/profile', {
            headers: {
                Authorization: `Bearer ${token}`
            }
            })

            if (!response.ok) {
            throw new Error('Failed to fetch authenticated profile')
            }

            const result: Profile = await response.json()

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

        void fetchProfile()

        return () => {
        isCancelled = true
        }
    }, [token])

    return { data, loading, error }
}