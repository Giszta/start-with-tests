import { describe, expect, test } from "vitest";
import { toggleSelection } from "./toggleSelection";

describe("toggleSelection", () => {
    test("dodaje element, gdy nie jest zaznaczony", () => {
        expect(toggleSelection([1, 2, 3], 4)).toEqual([1, 2, 3, 4]);
    });

    test("usuwa element, gdy jest zaznaczony", () => {
        expect(toggleSelection([1, 2, 3], 2)).toEqual([1, 3]);
    });
    test("działa poprawnie z pustą tablicą", () => {
        expect(toggleSelection([], "hello")).toEqual(["hello"]);
    });
    test("nie mutuje oryginalnej tablicy", () => {
        const original = ["a", "b", "c"];
        const result = toggleSelection(original, "d");
        expect(original).toEqual(["a", "b", "c"]);
        expect(result).toEqual(["a", "b", "c", "d"]);
    });
    test("działa poprawnie z różnymi typami danych", () => {
        expect(toggleSelection(["a", "b"], "c")).toEqual(["a", "b", "c"]);
        expect(toggleSelection([1, 2], 3)).toEqual([1, 2, 3]);
        expect(toggleSelection([true, false], true)).toEqual([false]);
    });
    test("działa poprawnie z duplikatami", () => {
        expect(toggleSelection([1, 2, 2, 3], 2)).toEqual([1, 3]);
    });
    test("działa poprawnie z obiektami", () => {
        const obj1 = { id: 1 };
        const obj2 = { id: 2 };
        expect(toggleSelection([obj1], obj2)).toEqual([obj1, obj2]);
        expect(toggleSelection([obj1, obj2], obj1)).toEqual([obj2]);
    });
});