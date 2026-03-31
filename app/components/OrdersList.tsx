import { useEffect, useState } from 'react';

type Order = {
    id: number;
    number: string;
    total: number;
};

export function OrdersList() {
    const [orders, setOrders] = useState<Order[]>([]);

    useEffect(() => {
        fetch('/api/orders')
        .then((res) => res.json())
        .then((data: Order[]) => setOrders(data));
    }, []);

    return (
        <ul>
        {orders.map((order) => (
            <li key={order.id}>
            {order.number} - {order.total} zł
            </li>
        ))}
        </ul>
    );
}