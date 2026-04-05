import { useEffect, useState } from 'react'

type UseFetchWithAbortResult<T> = {
    data: T | null
    loading: boolean
    error: string | null
}

export function useFetchWithAbort<T>(url: string | null): UseFetchWithAbortResult<T> {
    const [data, setData] = useState<T | null>(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        if (!url) {
        setData(null)
        setLoading(false)
        setError(null)
        return
        }

        const controller = new AbortController()

        async function fetchData() {
        setLoading(true)
        setError(null)

        try {
            const response = await fetch(url, { signal: controller.signal })

            if (!response.ok) {
            throw new Error('Failed to fetch data')
            }

            const result: T = await response.json()
            setData(result)
        } catch (error) {
            if (error instanceof DOMException && error.name === 'AbortError') {
            return
            }

            setError(error instanceof Error ? error.message : 'Unknown error')
        } finally {
            if (!controller.signal.aborted) {
            setLoading(false)
            }
        }
        }

        void fetchData()

        return () => {
        controller.abort()
        }
    }, [url])

    return { data, loading, error }
}