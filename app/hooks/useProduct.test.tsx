
import { renderHook, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, test, vi } from "vitest";
import { useProduct } from "./useProduct";

describe("useProduct", () => {
    afterEach(() => {
        vi.restoreAllMocks();
    });

    test("should fetch product", async () => {
        vi.spyOn(global, "fetch").mockResolvedValue({
            ok: true,
            json: async () => ({ id: 1, name: "Monitor", price: 700 }),
        }as Response);
        const {result} = renderHook(() => useProduct("1"));

        await waitFor(() => {
            expect(result.current.data?.name).toBe("Monitor");
            expect(result.current.loading).toBe(false);
            expect(result.current.error).toBeNull();
        });
    });

    test("should handle fetch error", async () => {
        vi.spyOn(global, "fetch").mockResolvedValue({
            ok: false,
        }as Response);
        const {result} = renderHook(() => useProduct("1"));

        await waitFor(() => {
            expect(result.current.data).toBeNull();
            expect(result.current.loading).toBe(false);
            expect(result.current.error).toBe("Failed to fetch product");
        });
    });

    test("should not fetch when productId is null", async () => {
        const fetchSpy = vi.spyOn(global, "fetch");
        renderHook(() => useProduct(null));

        expect(fetchSpy).not.toHaveBeenCalled();
    });
});