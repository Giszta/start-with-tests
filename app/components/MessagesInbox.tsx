import { useEffect, useState } from 'react';

type Message = {
    id: number;
    subject: string;
    from: string;
};

export function MessagesInbox() {
    const [messages, setMessages] = useState<Message[]>([]);

    useEffect(() => {
        fetch('/api/messages')
        .then((res) => res.json())
        .then((data: Message[]) => setMessages(data));
    }, []);

    return (
        <ul>
        {messages.map((message) => (
            <li key={message.id}>
            {message.subject} - {message.from}
            </li>
        ))}
        </ul>
    );
}