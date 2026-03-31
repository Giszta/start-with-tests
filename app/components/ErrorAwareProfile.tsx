import { useEffect, useState } from 'react';

type Profile = {
    name: string;
};

export function ErrorAwareProfile() {
    const [profile, setProfile] = useState<Profile | null>(null);
    const [error, setError] = useState('');

    useEffect(() => {
        fetch('/api/profile')
        .then((res) => res.json())
        .then((data: Profile) => setProfile(data))
        .catch(() => setError('Nie udało się pobrać profilu'));
    }, []);

    if (error) return <div role="alert">{error}</div>;
    if (!profile) return <div>Ładowanie profilu...</div>;

    return <h2>{profile.name}</h2>;
}