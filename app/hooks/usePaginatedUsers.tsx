import { useEffect, useState } from 'react'

type User = {
    id: number
    name: string
}

type PaginatedUsersResponse = {
    items: User[]
    page: number
    total: number
    pageSize: number
}

export function usePaginatedUsers(initialPage = 1, pageSize = 10) {
    const [data, setData] = useState<User[]>([])
    const [page, setPage] = useState(initialPage)
    const [total, setTotal] = useState(0)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        let isCancelled = false

        async function fetchUsers() {
        setLoading(true)
        setError(null)

        try {
            const response = await fetch(`/api/users?page=${page}&pageSize=${pageSize}`)

            if (!response.ok) {
            throw new Error('Failed to fetch paginated users')
            }

            const result: PaginatedUsersResponse = await response.json()

            if (!isCancelled) {
            setData(result.items)
            setTotal(result.total)
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
    }, [page, pageSize])

    return {
        data,
        page,
        total,
        pageSize,
        totalPages: Math.ceil(total / pageSize),
        loading,
        error,
        setPage
    }
}