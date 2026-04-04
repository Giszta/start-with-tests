import { useEffect, useState } from 'react'

type Profile = {
    id: number
    username: string
    avatar: string
}

export function useProfile() {
    const [data, setData] = useState<Profile | null>(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        let isCancelled = false

        async function fetchProfile() {
        setLoading(true)
        setError(null)

        try {
            const response = await fetch('/api/profile')

            if (!response.ok) {
            throw new Error('Failed to fetch profile')
            }

            const profile: Profile = await response.json()

            if (!isCancelled) {
            setData(profile)
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

        fetchProfile()

        return () => {
        isCancelled = true
        }
    }, [])

    return { data, loading, error }
}