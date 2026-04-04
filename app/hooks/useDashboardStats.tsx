import { useEffect, useState } from 'react'

type DashboardStats = {
    usersCount: number
    salesCount: number
    ordersCount: number
}

export function useDashboardStats() {
    const [data, setData] = useState<DashboardStats | null>(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        let isCancelled = false

        async function fetchStats() {
        setLoading(true)
        setError(null)

        try {
            const response = await fetch('/api/dashboard/stats')

            if (!response.ok) {
            throw new Error('Failed to fetch dashboard stats')
            }

            const stats: DashboardStats = await response.json()

            if (!isCancelled) {
            setData(stats)
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

        fetchStats()

        return () => {
        isCancelled = true
        }
    }, [])

    return { data, loading, error }
}