import { useEffect, useState } from 'react';

type Stats = {
    users: number;
    orders: number;
};

export function DashboardStats() {
    const [stats, setStats] = useState<Stats | null>(null);

    useEffect(() => {
        fetch('/api/stats')
        .then((res) => res.json())
        .then((data: Stats) => setStats(data));
    }, []);

    if (!stats) return <div>Ładowanie statystyk...</div>;

    return (
        <section>
        <p>Użytkownicy: {stats.users}</p>
        <p>Zamówienia: {stats.orders}</p>
        </section>
    );
}