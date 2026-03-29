import { isValidEmail } from "./isValidEmail";
import { describe, test, expect } from "vitest";

describe("isValidEmail", () => {
    test("zwraca true dla poprawnego adresu email", () => {
        expect(isValidEmail("jan@example.com")).toBe(true);
    });

    test("zwraca false dla niepoprawnego adresu email", () => {
        expect(isValidEmail("zly-email")).toBe(false);
    });
    test("zwraca false dla pustego stringa", () => {
        expect(isValidEmail("")).toBe(false);
    });
    test("zwraca false dla stringa z samymi spacjami", () => {  
        expect(isValidEmail("   ")).toBe(false);
    });
      test('zwraca false gdy brakuje znaku @', () => {
    expect(isValidEmail('janexample.com')).toBe(false);
  });

  test('zwraca false gdy brakuje domeny', () => {
    expect(isValidEmail('jan@')).toBe(false);
  });

  test('zwraca false dla adresu z niepoprawnym formatem', () => {
    expect(isValidEmail('jan@com')).toBe(false);
  });
});