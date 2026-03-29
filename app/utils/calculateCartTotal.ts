export type CartItem = {
    id: number;
    name: string;
    price: number;
    quantity: number;
}

export function calculateCartTotal (cartItems: CartItem[]): number {
    const total = cartItems.reduce((sum,item) => {
        if (item.price < 0 ) {
            throw new Error("Cena produktu nie może być ujemna");
        
        }
        if (item.quantity < 0) {
            throw new Error("Ilość produktu nie może być ujemna");
        }
        return sum + item.price * item.quantity;
    }, 0);
        return Number(total.toFixed(2));
    }
