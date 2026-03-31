import { useEffect, useState } from 'react';

type User = {
    id: number;
    name: string;
};

export function RetryableUsersList() {
    const [users, setUsers] = useState<User[]>([]);
    const [error, setError] = useState('');

    const loadUsers = async () => {
        setError('');
        try {
        const res = await fetch('/api/users');
        const data = await res.json();
        setUsers(data);
        } catch {
        setError('Błąd pobierania');
        }
    };

    useEffect(() => {
        const initUsers = async () => {
            await loadUsers();
        };
        initUsers();
    }, []);

    return (
        <div>
        {error ? (
            <>
            <div role="alert">{error}</div>
            <button onClick={loadUsers}>Spróbuj ponownie</button>
            </>
        ) : (
            users.map((user) => <p key={user.id}>{user.name}</p>)
        )}
        </div>
    );
}