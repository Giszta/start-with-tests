import { useEffect, useState } from 'react';

type User = {
    id: number;
    name: string;
};

export function UsersList() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetch('/api/users')
        .then((res) => res.json())
        .then((data: User[]) => setUsers(data))
        .catch(() => setError('Nie udało się pobrać użytkowników'))
        .finally(() => setLoading(false));
    }, []);

    if (loading) return <div>Ładowanie użytkowników...</div>;
    if (error) return <div role="alert">{error}</div>;

    return (
        <ul>
        {users.map((user) => (
            <li key={user.id}>{user.name}</li>
        ))}
        </ul>
    );
}