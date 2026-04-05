import { useState } from 'react'

type Todo = {
    id: number
    title: string
}

export function useOptimisticTodos(initialTodos: Todo[] = []) {
    const [data, setData] = useState<Todo[]>(initialTodos)
    const [error, setError] = useState<string | null>(null)

    async function addTodo(title: string) {
        const optimisticTodo: Todo = {
        id: Date.now(),
        title
        }

        setError(null)
        setData((prev) => [...prev, optimisticTodo])

        try {
        const response = await fetch('/api/todos', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title })
        })

        if (!response.ok) {
            throw new Error('Failed to create todo')
        }

        const createdTodo: Todo = await response.json()

        setData((prev) => prev.map((item) => (item.id === optimisticTodo.id ? createdTodo : item)))
        } catch (error) {
        setData((prev) => prev.filter((item) => item.id !== optimisticTodo.id))
        setError(error instanceof Error ? error.message : 'Unknown error')
        }
    }

    return { data, error, addTodo }
}