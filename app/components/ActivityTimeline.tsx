import { useEffect, useState } from 'react';

type Activity = {
    id: number;
    label: string;
};

export function ActivityTimeline() {
    const [activities, setActivities] = useState<Activity[]>([]);

    useEffect(() => {
        fetch('/api/activities')
        .then((res) => res.json())
        .then((data: Activity[]) => setActivities(data));
    }, []);

    return (
        <ol>
        {activities.map((activity) => (
            <li key={activity.id}>{activity.label}</li>
        ))}
        </ol>
    );
}