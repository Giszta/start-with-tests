import { useEffect, useState } from 'react';

type Todo = {
    id: number;
    title: string;
    completed: boolean;
};

export function TodoList() {
    const [todos, setTodos] = useState<Todo[]>([]);

    useEffect(() => {
        fetch('/api/todos')
        .then((res) => res.json())
        .then((data: Todo[]) => setTodos(data));
    }, []);

    return (
        <ul>
        {todos.map((todo) => (
            <li key={todo.id}>
            {todo.title} - {todo.completed ? 'Gotowe' : 'Do zrobienia'}
            </li>
        ))}
        </ul>
    );
}