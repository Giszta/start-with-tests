import { useEffect, useState } from 'react'

type Country = {
    code: string
    name: string
}

export function useCountries() {
    const [data, setData] = useState<Country[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        let isCancelled = false

        async function fetchCountries() {
        setLoading(true)
        setError(null)

        try {
            const response = await fetch('/api/countries')

            if (!response.ok) {
            throw new Error('Failed to fetch countries')
            }

            const countries: Country[] = await response.json()

            if (!isCancelled) {
            setData(countries)
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

        fetchCountries()

        return () => {
        isCancelled = true
        }
    }, [])

    return { data, loading, error }
}