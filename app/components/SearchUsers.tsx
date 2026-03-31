import { useEffect, useState } from 'react';

type User = {
    id: number;
    name: string;
};

export function SearchUsers() {
    const [query, setQuery] = useState('');
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        if (!query) return;

        fetch(`/api/users?search=${query}`)
        .then((res) => res.json())
        .then((data: User[]) => setUsers(data));
    }, [query]);

    return (
        <div>
        <label>
            Szukaj użytkownika
            <input value={query} onChange={(e) => setQuery(e.target.value)} />
        </label>

        <ul>
            {users.map((user) => (
            <li key={user.id}>{user.name}</li>
            ))}
        </ul>
        </div>
    );
}