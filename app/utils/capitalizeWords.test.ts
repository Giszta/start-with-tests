import { describe, expect, test } from "vitest";
import { capitalizeWords } from "./capitalizeWords";

describe("capitalizeWords", () => {
    test("zamienia pierwszą literę każdego słowa na wielką", () => {
        const input = "hello world";
        const expectedOutput = "Hello World";
        expect(capitalizeWords(input)).toBe(expectedOutput);
    });
    test ("zmienia wszystkie litery na małe oprócz pierwszej", () => {
        const input = "hELLO wORLD";
        const expectedOutput = "Hello World";
        expect(capitalizeWords(input)).toBe(expectedOutput);
    });
    test("usuwa nadmiarowe spacje", () => {
        const input = "  hello   world  ";
        const expectedOutput = "Hello World";
        expect(capitalizeWords(input)).toBe(expectedOutput);
    });
    test("zwraca pusty string, jeśli pole jest puste lub zawiera tylko spacje", () => {
        expect(capitalizeWords("")).toBe("");
        expect(capitalizeWords("   ")).toBe("");
    });
    test("obsługuje pojedyncze słowo", () => {
        const input = "hello";
        const expectedOutput = "Hello";
        expect(capitalizeWords(input)).toBe(expectedOutput);
    });
});
