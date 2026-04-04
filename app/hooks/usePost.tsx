import { useEffect, useState } from 'react'

type Post = {
    id: number
    title: string
    body: string
}

export function usePost(postId: string | null) {
    const [data, setData] = useState<Post | null>(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        if (!postId) {
        setData(null)
        setLoading(false)
        setError(null)
        return
        }

        let isCancelled = false

        async function fetchPost() {
        setLoading(true)
        setError(null)

        try {
            const response = await fetch(`/api/posts/${postId}`)

            if (!response.ok) {
            throw new Error('Failed to fetch post')
            }

            const post: Post = await response.json()

            if (!isCancelled) {
            setData(post)
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

        fetchPost()

        return () => {
        isCancelled = true
        }
    }, [postId])

    return { data, loading, error }
}