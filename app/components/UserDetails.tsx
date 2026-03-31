import { useEffect, useState } from 'react';

type User = {
    id: number;
    name: string;
    email: string;
};

type UserDetailsProps = {
    userId: number;
};

export function UserDetails({ userId }: UserDetailsProps) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`/api/users/${userId}`)
        .then((res) => res.json())
        .then((data: User) => setUser(data))
        .finally(() => setLoading(false));
    }, [userId]);

    if (loading) return <div>Ładowanie szczegółów...</div>;
    if (!user) return <div>Brak użytkownika</div>;

    return (
        <article>
        <h2>{user.name}</h2>
        <p>{user.email}</p>
        </article>
    );
}