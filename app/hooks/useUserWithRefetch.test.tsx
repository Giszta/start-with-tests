import { afterEach, describe, expect, vi, test } from "vitest";
import { useUserWithRefetch } from "./useUserWithRefetch";
import { renderHook, waitFor } from "@testing-library/react";
import { act } from "react";

describe('useUserWithRefetch', () => {
    afterEach(() => {
        vi.resetAllMocks()
    })

    test('should fetch user data successfully', async () => {
        vi.spyOn(global, 'fetch').mockResolvedValue({
            ok: true,
            json: async () => ({ id: 1, name: 'John Doe' })
        } as Response)

        const {result} = renderHook(() => useUserWithRefetch('1'))

        await waitFor(()=> {
            expect(result.current.data).toEqual({ id: 1, name: 'John Doe'})
        })
        })

        test ("should let user refetch data", async () => {
            const fetchSpy = vi.spyOn(global, 'fetch').mockResolvedValueOnce({
                ok: true,
                json: async () => ({ id: 1, name: 'John Doe' })
            } as Response).mockResolvedValueOnce({
                ok: true,
                json: async () => ({ id: 1, name: 'Jane Doe' })
            } as Response)

            const {result} = renderHook(() => useUserWithRefetch('1'))
            
            await waitFor(() => {
                expect(result.current.data?.name).toEqual('John Doe')
                })
            
            await act(async () => {
                await result.current.refetch()
            })

            expect(fetchSpy).toHaveBeenCalledTimes(2)
            expect(result.current.data?.name).toEqual('Jane Doe')
            })

        test('should handle fetch error', async () => {
            vi.spyOn(global, 'fetch').mockResolvedValue({
                ok: false,
            } as Response)

            const {result} = renderHook(() => useUserWithRefetch('1'))

            await waitFor(() => {
                expect(result.current.error).toEqual('Failed to fetch user')
            })
        })
    })