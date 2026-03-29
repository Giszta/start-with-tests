import { describe, expect, test } from "vitest";
import { isPasswordStrong } from "./isPasswordStrong";

describe("isPasswordStrong", () => {
    test("zwraca true dla silnego hasła", () => {
        const password = "Str0ngP@ssw0rd!";
        expect(isPasswordStrong(password)).toBe(true);
    });

    test("zwraca false dla hasła krótszego niż 8 znaków", () => {
        const password = "S@1a";
        expect(isPasswordStrong(password)).toBe(false);
    });

    test("zwraca false dla hasła bez wielkich liter", () => {
        const password = "str0ngp@ssw0rd!";
        expect(isPasswordStrong(password)).toBe(false);
    });

    test("zwraca false dla hasła bez małych liter", () => {
        const password = "STR0NGP@SSW0RD!";
        expect(isPasswordStrong(password)).toBe(false);
    });

    test("zwraca false dla hasła bez cyfr", () => {
        const password = "StrongP@ssword!";
        expect(isPasswordStrong(password)).toBe(false);
    });

    test("zwraca false dla hasła bez znaków specjalnych", () => {
        const password = "StrongPassword1";
        expect(isPasswordStrong(password)).toBe(false);
    });

    test("zwraca false dla pustego hasła", () => {
        const password = "";
        expect(isPasswordStrong(password)).toBe(false);
    });
});