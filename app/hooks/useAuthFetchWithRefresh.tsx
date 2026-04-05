import { useCallback, useState } from 'react'

type Profile = {
    id: number
    username: string
}

type RefreshTokenFn = () => Promise<string>

export function useAuthFetchWithRefresh(initialToken: string, refreshToken: RefreshTokenFn) {
    const [token, setToken] = useState(initialToken)
    const [data, setData] = useState<Profile | null>(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const fetchProfile = useCallback(async () => {
        setLoading(true)
        setError(null)

        async function request(currentToken: string) {
        return fetch('/api/profile', {
            headers: {
            Authorization: `Bearer ${currentToken}`
            }
        })
        }

        try {
        let response = await request(token)

        if (response.status === 401) {
            const newToken = await refreshToken()
            setToken(newToken)
            response = await request(newToken)
        }

        if (!response.ok) {
            throw new Error('Failed to fetch profile with refresh')
        }

        const result: Profile = await response.json()
        setData(result)
        } catch (error) {
        setError(error instanceof Error ? error.message : 'Unknown error')
        } finally {
        setLoading(false)
        }
    }, [refreshToken, token])

    return { data, loading, error, fetchProfile }
}