import { describe, expect, test } from "vitest";
import { filterBySearch } from "./filterBySearch";

type User = {
    id: number;
    name: string;
}

describe("filterBySearch", () => {
    const users: User[] = [
        { id: 1, name: "Jan Kowalski" },
        { id: 2, name: "Tomasz Nowak" },
        { id: 3, name: "Anna Zielinska" },
    ];

    test ("filtruje elementuy po fragmencie tekstu", () => {
        const result = filterBySearch(users, "jan", (user) => user.name);
        expect(result).toEqual([{ id: 1, name: "Jan Kowalski" }]);
    });

    test("ignoruje wielkość liter", () => {
        const result = filterBySearch(users, "ANNA", (user) => user.name);
        expect(result).toEqual([{ id: 3, name: "Anna Zielinska" }]);
    });
    test("ignoruje białe znaki na początku i końcu", () => {
        const result = filterBySearch(users, "  tomasz  ", (user) => user.name);
        expect(result).toEqual([{ id: 2, name: "Tomasz Nowak" }]);
    });

    test("zwraca wszystkie elementy, gdy wyszukiwanie jest puste", () => {
        const result = filterBySearch(users, "   ", (user) => user.name);
        expect(result).toEqual(users);  
    });

    test("zwraca pustą tablicę, gdy nie ma dopasowań", () => {
        const result = filterBySearch(users, "xyz", (user) => user.name);
        expect(result).toEqual([]);
    });
    });