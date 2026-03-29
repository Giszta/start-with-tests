export function calculateDiscount(price: number, discountPercentage: number): number {
    if (price < 0) {
        throw new Error("Cena nie może być ujemna");
    }
    if (discountPercentage < 0 || discountPercentage > 100) {
        throw new Error("Procent rabatu musi być między 0 a 100");
    }

    const discountedPrice = price * (1 - discountPercentage / 100);

    return Number(discountedPrice.toFixed(2));
}
