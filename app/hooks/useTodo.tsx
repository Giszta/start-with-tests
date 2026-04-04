import { useEffect, useState } from 'react'

type Todo = {
    id: number
    title: string
    completed: boolean
}

export function useTodo(todoId: string | null) {
    const [data, setData] = useState<Todo | null>(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        if (!todoId) {
        setData(null)
        setLoading(false)
        setError(null)
        return
        }

        let isCancelled = false

        async function fetchTodo() {
        setLoading(true)
        setError(null)

        try {
            const response = await fetch(`/api/todos/${todoId}`)

            if (!response.ok) {
            throw new Error('Failed to fetch todo')
            }

            const todo: Todo = await response.json()

            if (!isCancelled) {
            setData(todo)
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

        fetchTodo()

        return () => {
        isCancelled = true
        }
    }, [todoId])

    return { data, loading, error }
}