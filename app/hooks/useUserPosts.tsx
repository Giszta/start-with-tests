import { useEffect, useState } from 'react'

type User = {
    id: number
    name: string
}

type Post = {
    id: number
    title: string
}

export function useUserPosts(userId: string | null) {
    const [user, setUser] = useState<User | null>(null)
    const [posts, setPosts] = useState<Post[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        if (!userId) {
        setUser(null)
        setPosts([])
        setLoading(false)
        setError(null)
        return
        }

        let isCancelled = false

        async function fetchData() {
        setLoading(true)
        setError(null)

        try {
            const userResponse = await fetch(`/api/users/${userId}`)

            if (!userResponse.ok) {
            throw new Error('Failed to fetch user')
            }

            const userResult: User = await userResponse.json()

            if (!isCancelled) {
            setUser(userResult)
            }

            const postsResponse = await fetch(`/api/users/${userResult.id}/posts`)

            if (!postsResponse.ok) {
            throw new Error('Failed to fetch user posts')
            }

            const postsResult: Post[] = await postsResponse.json()

            if (!isCancelled) {
            setPosts(postsResult)
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

        void fetchData()

        return () => {
        isCancelled = true
        }
    }, [userId])

    return { user, posts, loading, error }
}