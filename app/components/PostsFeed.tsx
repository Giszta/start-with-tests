import { useEffect, useState } from 'react';

type Post = {
    id: number;
    title: string;
};

export function PostsFeed() {
    const [posts, setPosts] = useState<Post[]>([]);

    useEffect(() => {
        fetch('/api/posts')
        .then((res) => res.json())
        .then((data: Post[]) => setPosts(data));
    }, []);

    return (
        <section>
        {posts.map((post) => (
            <h3 key={post.id}>{post.title}</h3>
        ))}
        </section>
    );
}