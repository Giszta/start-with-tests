import { useEffect, useState } from 'react';

type Product = {
    id: number;
    name: string;
};

export function RecommendedProducts() {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        fetch('/api/recommended-products')
        .then((res) => res.json())
        .then((data: Product[]) => setProducts(data));
    }, []);

    return (
        <section>
        <h2>Polecane produkty</h2>
        {products.map((product) => (
            <p key={product.id}>{product.name}</p>
        ))}
        </section>
    );
}