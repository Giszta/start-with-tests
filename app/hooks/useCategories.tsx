import { useEffect, useState } from 'react'

type Category = {
    id: number
    name: string
}

export function useCategories() {
    const [data, setData] = useState<Category[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        let isCancelled = false

        async function fetchCategories() {
        setLoading(true)
        setError(null)

        try {
            const response = await fetch('/api/categories')

            if (!response.ok) {
            throw new Error('Failed to fetch categories')
            }

            const categories: Category[] = await response.json()

            if (!isCancelled) {
            setData(categories)
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

        fetchCategories()

        return () => {
        isCancelled = true
        }
    }, [])

    return { data, loading, error }
}