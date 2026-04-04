import { useEffect, useState } from 'react'

type Todo = {
    id: number
    title: string
    completed: boolean
}

export function useTodos() {
    const [data, setData] = useState<Todo[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        let isCancelled = false

        async function fetchTodos() {
        setLoading(true)
        setError(null)

        try {
            const response = await fetch('/api/todos')

            if (!response.ok) {
            throw new Error('Failed to fetch todos')
            }

            const todos: Todo[] = await response.json()

            if (!isCancelled) {
            setData(todos)
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

        fetchTodos()

        return () => {
        isCancelled = true
        }
    }, [])

    return { data, loading, error }
}