import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { ErrorAlert } from "./ErrorAlert";

describe ("ErrorAlert", () => {
    test ("renderuje komunikat o błędzie", () => {
        render (ErrorAlert ({message: "404 Not Found"}));
        expect (screen.getByRole("allert")).toHaveTextContent("404 Not Found");
    });
})
