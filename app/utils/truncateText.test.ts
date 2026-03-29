import { describe, expect, test } from "vitest";
import { truncateText } from "./truncateText";

describe("truncateText", () => {
    test("zwraca ten sam tekst, gdy długość jest krótsza niż maxLength",()=>{
        expect(truncateText("Hej",10)).toBe("Hej");
    });
    test("zwraca ten sam tekst, gdy długość jest równa maxLength",()=>{
        expect(truncateText("Hello",5)).toBe("Hello");
    });
    test("obcina tekst i dodaje '...', gdy długość jest większa niż maxLength",()=>{
        expect(truncateText("Hello, World!",5)).toBe("Hello...");
    });
    test("rzuca błąd, gdy maxLength jest mniejsze lub równe 0",()=>{
        expect(() => truncateText("Hello", 0)).toThrow("maxLength musi być większe od 0");
        expect(() => truncateText("Hello", -1)).toThrow("maxLength musi być większe od 0");
    });
});