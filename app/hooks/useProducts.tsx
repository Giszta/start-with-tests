import { useEffect, useState } from 'react'

type Product = {
    id: number
    name: string
    price: number
}

export function useProducts() {
    const [data, setData] = useState<Product[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        let isCancelled = false

        async function fetchProducts() {
        setLoading(true)
        setError(null)

        try {
            const response = await fetch('/api/products')

            if (!response.ok) {
            throw new Error('Failed to fetch products')
            }

            const products: Product[] = await response.json()

            if (!isCancelled) {
            setData(products)
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

        fetchProducts()

        return () => {
        isCancelled = true
        }
    }, [])

    return { data, loading, error }
}