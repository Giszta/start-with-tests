import { useEffect, useState } from "react";

type Post = {
    id: number;
    title: string;
}

export function usePosts() {
    const [data, setData] = useState<Post[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let isCancelled = false;

        async function fetchPosts (){
            setLoading(true);
            setError(null);

            try {
                const response = await fetch('/api/posts');

                if (!response.ok) {
                    throw new Error("Failed to fetch posts");
                }
                const posts: Post[] = await response.json();
                
                if (!isCancelled) {
                    setData(posts);
                }
            } catch (err) {
                if (!isCancelled) {
                    setError(err instanceof Error ? err.message : "An unknown error occurred");
                }
            } finally {
                if (!isCancelled) {
                    setLoading(false);
                }
            }
        }

        fetchPosts();

        return () => {
            isCancelled = true;
        };
    }, []);
    return { data, loading, error };
}