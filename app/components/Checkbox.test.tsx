import { render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import { Checkbox } from "./Checkbox";
import userEvent from "@testing-library/user-event";

describe("Checkbox", () => {
    test("renderuje checkbox z labelką", () => {
        render(
            <Checkbox
                label="Akceptuję regulamin"
                checked={false}
                onChange={() => {}}
            />
        );
        expect(screen.getByLabelText("Akceptuję regulamin")).toBeInTheDocument();
    })

    test("wywołuje onChange podczas zmiany stanu", async () => {
        const user = userEvent.setup();
        const handleChange = vi.fn();

        render(
            <Checkbox
                label="Akceptuję regulamin"
                checked={false}
                onChange={handleChange}
            />
        );
        await user.click(screen.getByLabelText("Akceptuję regulamin"));
        expect(handleChange).toHaveBeenCalledWith(true);
    })

})