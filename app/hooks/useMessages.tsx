import { useEffect, useState } from 'react'

type Message = {
    id: number
    text: string
}

export function useMessages() {
    const [data, setData] = useState<Message[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        let isCancelled = false

        async function fetchMessages() {
        setLoading(true)
        setError(null)

        try {
            const response = await fetch('/api/messages')

            if (!response.ok) {
            throw new Error('Failed to fetch messages')
            }

            const messages: Message[] = await response.json()

            if (!isCancelled) {
            setData(messages)
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

        fetchMessages()

        return () => {
        isCancelled = true
        }
    }, [])

    return { data, loading, error }
}