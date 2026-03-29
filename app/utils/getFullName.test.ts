import { describe, expect, test } from "vitest";
import { getFullName } from "./getFullName";

describe("getFullName", () => {
    test("łączy imię i nazwisko spacją", () => {
        expect(getFullName("Jan", "Kowalski")).toBe("Jan Kowalski");
    })
    test("usuwa nadmiarowe spacje z imienia i nazwiska", () => {
        expect(getFullName("  Jan  ", "  Kowalski  ")).toBe("Jan Kowalski");
    })
    test("zwraca samo imię, gdy nazwisko jest puste", () => {
        expect(getFullName("Jan", "")).toBe("Jan");
    })
    test("zwraca samo nazwisko, gdy imię jest puste", () => {
        expect(getFullName("", "Kowalski")).toBe("Kowalski");
    })
    test("zwraca pusty string, gdy imię i nazwisko są puste", () => {
        expect(getFullName("", "")).toBe("");
    })
    test("zwraca pusty string, gdy imię i nazwisko zawierają tylko spacje", ()=> {
        expect(getFullName("   ", "   ")).toBe("");
    })
});