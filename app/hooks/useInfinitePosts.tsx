import { useEffect, useState } from 'react'

type Post = {
    id: number
    title: string
}

type InfinitePostsResponse = {
    items: Post[]
    hasMore: boolean
}

export function useInfinitePosts() {
    const [data, setData] = useState<Post[]>([])
    const [page, setPage] = useState(1)
    const [hasMore, setHasMore] = useState(true)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        let isCancelled = false

        async function fetchPage() {
        if (!hasMore) {
            return
        }

        setLoading(true)
        setError(null)

        try {
            const response = await fetch(`/api/posts?page=${page}`)

            if (!response.ok) {
            throw new Error('Failed to fetch infinite posts')
            }

            const result: InfinitePostsResponse = await response.json()

            if (!isCancelled) {
            setData((prev) => [...prev, ...result.items])
            setHasMore(result.hasMore)
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

        void fetchPage()

        return () => {
        isCancelled = true
        }
    }, [page, hasMore])

    function loadMore() {
        if (!loading && hasMore) {
        setPage((prev) => prev + 1)
        }
    }

    return { data, hasMore, loading, error, loadMore }
}