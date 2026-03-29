import { describe, expect, test } from "vitest";
import { removeDuplicates } from "./removeDuplicates";

describe("removeDuplicates", () => {
    test("usuwa duplikaty z tablicy liczb", () => {
        expect(removeDuplicates([1, 2, 2, 3, 4, 4, 5])).toEqual([1, 2, 3, 4, 5]);
    });

    test("usuwa duplikaty z tablicy stringów", () => {
        expect(removeDuplicates(['react', 'ts', 'react', 'next'])).toEqual([
            'react',
            'ts',
            'next'
        ]);
    });

    test("zwraca pustą tablicę, jeśli wejściowa tablica jest pusta", () => {
        expect(removeDuplicates([])).toEqual([]);
    });

    test("zwraca tablicę bez zmian, jeśli nie ma duplikatów", () => {
        expect(removeDuplicates([1, 2, 3])).toEqual([1, 2, 3]);
    });

    test ("zachowuje kolejność elementów po usunięciu duplikatów", () => {
        expect(removeDuplicates([3, 1, 2, 3, 4, 1])).toEqual([3, 1, 2, 4]);
    });
});