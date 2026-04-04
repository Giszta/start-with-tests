import { useEffect, useState } from 'react'

type Order = {
    id: number
    total: number
    status: string
}

export function useOrders(userId: string | null) {
    const [data, setData] = useState<Order[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        if (!userId) {
        setData([])
        setLoading(false)
        setError(null)
        return
        }

        let isCancelled = false

        async function fetchOrders() {
        setLoading(true)
        setError(null)

        try {
            const response = await fetch(`/api/users/${userId}/orders`)

            if (!response.ok) {
            throw new Error('Failed to fetch orders')
            }

            const orders: Order[] = await response.json()

            if (!isCancelled) {
            setData(orders)
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

        fetchOrders()

        return () => {
        isCancelled = true
        }
    }, [userId])

    return { data, loading, error }
}