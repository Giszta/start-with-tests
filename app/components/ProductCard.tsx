type ProductCardProps = {
  name: string;
  price: string;
  onAddToCart: () => void;
};

export function ProductCard({ name, price, onAddToCart }: ProductCardProps) {
  return (
    <article className="ProductCard">
      <h3>{name}</h3>
      <p>{price}</p>
      <button onClick={onAddToCart}>Dodaj do koszyka</button>
    </article>
  );
}