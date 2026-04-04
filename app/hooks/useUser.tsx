import { useEffect, useState } from "react";

type User = {
    id: number;
    name: string;
    email: string;
    };

type UseUserState = {
    data: User | null;
    loading: boolean;
    error: string | null;
};

export function useUser(userId: string | null) {
    const [state, setState] = useState<UseUserState>({
        data: null,
        loading: false,
        error: null,
    });

    useEffect(() => {
        if (!userId) {
        setState({ data: null, loading: false, error: null });
        return;
        }

        let isCancelled = false;

        async function fetchUser() {
        setState({ data: null, loading: true, error: null });

        try {
            const response = await fetch(`/api/users/${userId}`);

            if (!response.ok) {
            throw new Error("Failed to fetch user");
            }

            const data: User = await response.json();

            if (!isCancelled) {
            setState({ data, loading: false, error: null });
            }
        } catch (error) {
            if (!isCancelled) {
            setState({
                data: null,
                loading: false,
                error: error instanceof Error ? error.message : "Unknown error",
            });
            }
        }
        }

        fetchUser();

        return () => {
        isCancelled = true;
        };
    }, [userId]);

    return state;
}
