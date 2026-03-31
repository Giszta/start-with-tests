import { useEffect, useState } from 'react';

type TeamMember = {
    id: number;
    name: string;
    role: string;
};

export function TeamMembers() {
    const [members, setMembers] = useState<TeamMember[]>([]);

    useEffect(() => {
        fetch('/api/team')
        .then((res) => res.json())
        .then((data: TeamMember[]) => setMembers(data));
    }, []);

    return (
        <ul>
        {members.map((member) => (
            <li key={member.id}>
            {member.name} - {member.role}
            </li>
        ))}
        </ul>
    );
}