import { useEffect, useState } from 'react'

type User = {
    id: number
    name: string
}

export function useUsers() {
    const [data, setData] = useState<User[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        let isCancelled = false

        async function fetchUsers() {
        setLoading(true)
        setError(null)

        try {
            const response = await fetch('/api/users')

            if (!response.ok) {
            throw new Error('Failed to fetch users')
            }

            const users: User[] = await response.json()

            if (!isCancelled) {
            setData(users)
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

        fetchUsers()

        return () => {
        isCancelled = true
        }
    }, [])

    return { data, loading, error }
}