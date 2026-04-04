import { useEffect, useState } from 'react'

type Notification = {
    id: number
    message: string
    read: boolean
}

export function useNotifications() {
    const [data, setData] = useState<Notification[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        let isCancelled = false

        async function fetchNotifications() {
        setLoading(true)
        setError(null)

        try {
            const response = await fetch('/api/notifications')

            if (!response.ok) {
            throw new Error('Failed to fetch notifications')
            }

            const notifications: Notification[] = await response.json()

            if (!isCancelled) {
            setData(notifications)
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

        fetchNotifications()

        return () => {
        isCancelled = true
        }
    }, [])

    return { data, loading, error }
}