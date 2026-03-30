import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { UserCard } from "./UserCard";


describe("UserCard", () => {
    test("renderuje dane użytkownika", () => {
        render(<UserCard name="Jan Kowalski" email="jan.kowalski@example.com" />);
        expect(screen.getByText("Jan Kowalski")).toBeInTheDocument();
        expect(screen.getByText("jan.kowalski@example.com")).toBeInTheDocument();
    });
});