import { useCallback, useEffect, useState } from 'react'

type Ticket = {
    id: string
    subject: string
}

type TicketsResponse = {
    items: Ticket[]
    total: number
}

export function usePaginatedTicketsWithRefetch(initialPage = 1, pageSize = 10) {
    const [data, setData] = useState<Ticket[]>([])
    const [page, setPage] = useState(initialPage)
    const [total, setTotal] = useState(0)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const fetchTickets = useCallback(async () => {
        setLoading(true)
        setError(null)

        try {
        const response = await fetch(`/api/tickets?page=${page}&pageSize=${pageSize}`)

        if (!response.ok) {
            throw new Error('Failed to fetch tickets')
        }

        const result: TicketsResponse = await response.json()
        setData(result.items)
        setTotal(result.total)
        } catch (error) {
        setError(error instanceof Error ? error.message : 'Unknown error')
        } finally {
        setLoading(false)
        }
    }, [page, pageSize])

    useEffect(() => {
        void fetchTickets()
    }, [fetchTickets])

    return {
        data,
        page,
        pageSize,
        total,
        totalPages: Math.ceil(total / pageSize),
        loading,
        error,
        setPage,
        refetch: fetchTickets
    }
}