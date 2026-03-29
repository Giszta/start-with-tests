export type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
};

export function filterProductsByCategory(
  products: Product[],
  category: string
): Product[] {
  const normalizedCategory = category.trim().toLowerCase();

  if (!normalizedCategory) {
    return products;
  }

  return products.filter(
    (product) => product.category.trim().toLowerCase() === normalizedCategory
  );
}