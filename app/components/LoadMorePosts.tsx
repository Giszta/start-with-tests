import { useState } from 'react';

type Post = {
    id: number;
    title: string;
};

export function LoadMorePosts() {
    const [posts, setPosts] = useState<Post[]>([]);

    const loadPosts = async () => {
        const res = await fetch('/api/posts');
        const data = await res.json();
        setPosts(data);
    };

    return (
        <div>
        <button onClick={loadPosts}>Załaduj posty</button>
        {posts.map((post) => (
            <p key={post.id}>{post.title}</p>
        ))}
        </div>
    );
}