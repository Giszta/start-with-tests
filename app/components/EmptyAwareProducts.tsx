import { useEffect, useState } from 'react';

type Product = {
    id: number;
    name: string;
};

export function EmptyAwareProducts() {
    const [products, setProducts] = useState<Product[] | null>(null);

    useEffect(() => {
        fetch('/api/products')
        .then((res) => res.json())
        .then((data: Product[]) => setProducts(data));
    }, []);

    if (products === null) return <div>Ładowanie...</div>;
    if (products.length === 0) return <div>Brak produktów</div>;

    return (
        <ul>
        {products.map((product) => (
            <li key={product.id}>{product.name}</li>
        ))}
        </ul>
    );
}