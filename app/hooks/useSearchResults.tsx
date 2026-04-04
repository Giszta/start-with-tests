import { useEffect, useState } from 'react'

type SearchResult = {
    id: number
    label: string
}

export function useSearchResults(query: string) {
    const [data, setData] = useState<SearchResult[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        if (!query.trim()) {
        setData([])
        setLoading(false)
        setError(null)
        return
        }

        let isCancelled = false

        async function fetchResults() {
        setLoading(true)
        setError(null)

        try {
            const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`)

            if (!response.ok) {
            throw new Error('Failed to fetch search results')
            }

            const results: SearchResult[] = await response.json()

            if (!isCancelled) {
            setData(results)
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

        fetchResults()

        return () => {
        isCancelled = true
        }
    }, [query])

    return { data, loading, error }
}