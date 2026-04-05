import { useEffect, useState } from 'react'

type Project = {
  id: number
  name: string
}

type Task = {
    id: number
    title: string
}

export function useProjectAndTasks(projectSlug: string | null) {
    const [project, setProject] = useState<Project | null>(null)
    const [tasks, setTasks] = useState<Task[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        if (!projectSlug) {
        setProject(null)
        setTasks([])
        setLoading(false)
        setError(null)
        return
        }

        let isCancelled = false

        async function fetchProjectAndTasks() {
        setLoading(true)
        setError(null)

        try {
            const projectResponse = await fetch(`/api/projects/${projectSlug}`)

            if (!projectResponse.ok) {
            throw new Error('Failed to fetch project')
            }

            const projectResult: Project = await projectResponse.json()

            if (!isCancelled) {
            setProject(projectResult)
            }

            const tasksResponse = await fetch(`/api/projects/${projectResult.id}/tasks`)

            if (!tasksResponse.ok) {
            throw new Error('Failed to fetch tasks')
            }

            const tasksResult: Task[] = await tasksResponse.json()

            if (!isCancelled) {
            setTasks(tasksResult)
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

        void fetchProjectAndTasks()

        return () => {
        isCancelled = true
        }
    }, [projectSlug])

    return { project, tasks, loading, error }
}