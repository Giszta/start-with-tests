import { describe, expect, test } from "vitest";
import { calculateCartTotal } from "./calculateCartTotal";

describe("calculateCartTotal", () => {
    test("zwraca 0 dla pustego koszyka", () => {
        expect(calculateCartTotal([])).toBe(0);
    });

    test("oblicza poprawną wartość koszyka dla jednego produktu", () => {
        const cartItems = [] = [
            { id: 1, name: 'Laptop', price: 3000, quantity: 1 },
        ];

        expect(calculateCartTotal(cartItems)).toBe(3000);
    })
test("oblicza poprawną wartość koszyka dla wielu produktów", () => {
    const cartItems = [
        { id: 1, name: 'Laptop', price: 3000, quantity: 1 },
        { id: 2, name: 'Myszka', price: 120, quantity: 2 },
        { id: 3, name: 'Klawiatura', price: 200, quantity: 1 },
    ];

    expect(calculateCartTotal(cartItems)).toBe(3440);
});

test("poprawnie obsługuje wartości dziesiętne", () => {
    const cartItems = [
        { id: 1, name: 'Kawa', price: 9.99, quantity: 3 },
    ];

    expect(calculateCartTotal(cartItems)).toBe(29.97);
});

test("rzuca błąd, gdy cena produktu jest ujemna", () => {
    const cartItems = [
        { id: 1, name: 'Laptop', price: -3000, quantity: 1 },
    ];
    expect(() => calculateCartTotal(cartItems)).toThrow("Cena produktu nie może być ujemna");
});
 test("rzuca błąd, gdy ilość produktu jest ujemna", () => {
    const cartItems = [
        { id: 1, name: 'Laptop', price: 3000, quantity: -1 },
    ];
    expect(() => calculateCartTotal(cartItems)).toThrow("Ilość produktu nie może być ujemna");
});

});