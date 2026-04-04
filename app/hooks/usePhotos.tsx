import { useEffect, useState } from 'react'

type Photo = {
    id: number
    title: string
    url: string
}

export function usePhotos(albumId: string | null) {
    const [data, setData] = useState<Photo[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        if (!albumId) {
        setData([])
        setLoading(false)
        setError(null)
        return
        }

        let isCancelled = false

        async function fetchPhotos() {
        setLoading(true)
        setError(null)

        try {
            const response = await fetch(`/api/albums/${albumId}/photos`)

            if (!response.ok) {
            throw new Error('Failed to fetch photos')
            }

            const photos: Photo[] = await response.json()

            if (!isCancelled) {
            setData(photos)
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

        fetchPhotos()

        return () => {
        isCancelled = true
        }
    }, [albumId])

    return { data, loading, error }
}