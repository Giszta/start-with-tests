import { render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import { TextInput } from "./TextInput";
import userEvent from "@testing-library/user-event";

describe(TextInput, () => {
    test("renderuje input z labelką", () => {
        render(<TextInput label="Imię" value="" onChange={()=>{}} />);
        expect(screen.getByLabelText("Imię")).toBeInTheDocument();
    });
    test('wywołuje onChange podczas wpisywania', async () => {
        const user=userEvent.setup();
        const handleChange = vi.fn();

        render(<TextInput label="Imię" value="" onChange={handleChange}/>);
        await user.type(screen.getByLabelText("Imię"), "Jan");
        expect(handleChange).toHaveBeenCalled();
});
})