type CartItemProps = {
  name: string;
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
};

export function CartItem({ name, quantity, onIncrease, onDecrease }: CartItemProps) {
  return (
    <div>
      <span>{name}</span>
      <span>Ilość: {quantity}</span>
      <button onClick={onDecrease}>-</button>
      <button onClick={onIncrease}>+</button>
    </div>
  );
}