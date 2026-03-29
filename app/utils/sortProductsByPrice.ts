export type Product = {
    id: number;
    name: string;
    price: number;
};

export function sortProductsByPrice(products: Product[]): Product[] {
    return [...products].sort((a, b) => a.price - b.price);
} 