import { useEffect, useState } from 'react';

type Comment = {
    id: number;
    author: string;
    body: string;
};

export function CommentsList() {
    const [comments, setComments] = useState<Comment[]>([]);

    useEffect(() => {
        fetch('/api/comments')
        .then((res) => res.json())
        .then((data: Comment[]) => setComments(data));
    }, []);

    return (
        <ul>
        {comments.map((comment) => (
            <li key={comment.id}>
            <strong>{comment.author}</strong>
            <p>{comment.body}</p>
            </li>
        ))}
        </ul>
    );
}