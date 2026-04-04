import { useEffect, useState } from 'react'

type Message = {
    id: number
    text: string
}

export function useMessage(messageId: string | null) {
    const [data, setData] = useState<Message | null>(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        if (!messageId) {
        setData(null)
        setLoading(false)
        setError(null)
        return
        }

        let isCancelled = false

        async function fetchMessage() {
        setLoading(true)
        setError(null)

        try {
            const response = await fetch(`/api/messages/${messageId}`)

            if (!response.ok) {
            throw new Error('Failed to fetch message')
            }

            const message: Message = await response.json()

            if (!isCancelled) {
            setData(message)
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

        fetchMessage()

        return () => {
        isCancelled = true
        }
    }, [messageId])

    return { data, loading, error }
}