import { useEffect, useState } from "react";

type Product = {
    id: number;
    name: string;
    price: number;
};

export function useProduct(productId:string | null){
    const [data, setData] = useState<Product | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(()=>{
        if(!productId) {
            setData(null);
            setLoading(false);
            setError(null);
            
            return;
        }

        let isCancelled = false;

        async function fetchProduct() {
            setLoading(true);
            setError(null);

            try {
                const response = await fetch(`/api/products/${productId}`);

                if (!response.ok) {
                    throw new Error(`Failed to fetch product`);
                }

                const product: Product = await response.json();

                if (!isCancelled) {
                    setData(product);
                }
            
            } catch (err) {
                if (!isCancelled) {
                    setError(err instanceof Error ? err.message : 'Unknown error');
                }
            } finally {
                if (!isCancelled) {
                    setLoading(false);
                }
            }
        }

        fetchProduct();

        return () => {
            isCancelled = true;
        };
    }, [productId]);

    return { data, loading, error };
}