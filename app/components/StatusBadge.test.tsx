import { describe, expect, test } from "vitest";
import { StatusBadge } from "./StatusBadge";
import { render, screen } from "@testing-library/react";

describe("StatusBadge", () => {
    test('renderuje poprawny tekst dla statusu "active"', () => {
        render(<StatusBadge status="active" />);
        expect(screen.getByText("Aktywny")).toBeInTheDocument();
    });
    test('renderuje poprawny tekst dla statusu "inactive"', () => {
        render(<StatusBadge status="inactive" />);
        expect(screen.getByText("Nieaktywny")).toBeInTheDocument();
    });
    test('renderuje poprawny tekst dla statusu "pending"', () => {
        render(<StatusBadge status="pending" />);
        expect(screen.getByText("Oczekujący")).toBeInTheDocument();
    });
});