import { useEffect, useState } from 'react'

type Comment = {
    id: number
    body: string
}

export function useComments(postId: string | null) {
    const [data, setData] = useState<Comment[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        if (!postId) {
        setData([])
        setLoading(false)
        setError(null)
        return
        }

        let isCancelled = false

        async function fetchComments() {
        setLoading(true)
        setError(null)

        try {
            const response = await fetch(`/api/posts/${postId}/comments`)

            if (!response.ok) {
            throw new Error('Failed to fetch comments')
            }

            const comments: Comment[] = await response.json()

            if (!isCancelled) {
            setData(comments)
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

        fetchComments()

        return () => {
        isCancelled = true
        }
    }, [postId])

    return { data, loading, error }
    }