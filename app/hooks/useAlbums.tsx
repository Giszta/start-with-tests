import { useEffect, useState } from 'react'

type Album = {
    id: number
    title: string
}

export function useAlbums() {
    const [data, setData] = useState<Album[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        let isCancelled = false

        async function fetchAlbums() {
        setLoading(true)
        setError(null)

        try {
            const response = await fetch('/api/albums')

            if (!response.ok) {
            throw new Error('Failed to fetch albums')
            }

            const albums: Album[] = await response.json()

            if (!isCancelled) {
            setData(albums)
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

        fetchAlbums()

        return () => {
        isCancelled = true
        }
    }, [])

    return { data, loading, error }
}