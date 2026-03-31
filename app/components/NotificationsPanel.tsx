import { useEffect, useState } from 'react';

type Notification = {
    id: number;
    message: string;
};

export function NotificationsPanel() {
    const [notifications, setNotifications] = useState<Notification[]>([]);

    useEffect(() => {
        fetch('/api/notifications')
        .then((res) => res.json())
        .then((data: Notification[]) => setNotifications(data));
    }, []);

    return (
        <aside>
        {notifications.map((notification) => (
            <p key={notification.id}>{notification.message}</p>
        ))}
        </aside>
    );
}