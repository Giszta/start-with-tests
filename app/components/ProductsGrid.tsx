import { useEffect, useState } from 'react';

type Product = {
    id: number;
    name: string;
    price: number;
};

export function ProductsGrid() {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        fetch('/api/products')
        .then((res) => res.json())
        .then((data: Product[]) => setProducts(data));
    }, []);

    return (
        <div>
        {products.map((product) => (
            <article key={product.id}>
            <h3>{product.name}</h3>
            <p>{product.price} zł</p>
            </article>
        ))}
        </div>
    );
}