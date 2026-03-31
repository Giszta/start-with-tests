import { vi } from 'vitest';

export function mockFetchSuccess(data: unknown) {
    return vi.spyOn(global, 'fetch').mockResolvedValue({
        ok: true,
        json: async () => data,
    } as Response);
}

export function mockFetchError() {
    return vi.spyOn(global, 'fetch').mockRejectedValue(new Error('Network error'));
}