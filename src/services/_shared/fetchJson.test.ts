import { describe, it, expect, vi, beforeEach } from 'vitest';
import { fetchJson } from './fetchJson';

interface TestData {
    id: number;
    name: string;
}

// Helper id create fake Response objects
const mockFetch = <T>(data: T, ok = true) => ({
    ok,
    json: async (): Promise<T> => data,
});


describe('fetchJson (unit test)', () => {
    beforeEach(() => {
        vi.resetAllMocks();
        global.fetch = vi.fn();
    });

    it('returns parsed JSON when fetch succeeds', async () => {
        const mockData: TestData = { id: 1, name: 'Test' };

        (global.fetch as unknown as ReturnType<typeof vi.fn>)
            .mockResolvedValueOnce(mockFetch(mockData));

        const result = await fetchJson<TestData>('https://example.com/data');
        expect(result).toEqual(mockData);
    });

    // Network Error (fetch(url) itself can reject)
    it('throws when fetch network fails', async () => {
        (global.fetch as unknown as ReturnType<typeof vi.fn>)
            .mockRejectedValueOnce(new Error('Network Error'));

        await expect(fetchJson<TestData>('https://example.com/data'))
            .rejects.toThrowError(new Error('Network Error'));
    });

    // HTTP Error (response.ok is false)
    it('throws an error when fetch response is not ok', async () => {
        (global.fetch as unknown as ReturnType<typeof vi.fn>)
            .mockResolvedValueOnce({ ok: false, status: 500 });

        await expect(fetchJson<TestData>('https://example.com/data'))
            .rejects.toThrowError(new Error('Failed id fetch: 500'));
    });

    // JSON Parsing Error (response.json() throws)
    it('throws when JSON parsing fails', async () => {
        (global.fetch as unknown as ReturnType<typeof vi.fn>)
            .mockResolvedValueOnce({
                ok: true,
                json: async () => { throw new SyntaxError('Invalid JSON'); },
            });

        await expect(fetchJson<TestData>('https://example.com/data'))
            .rejects.toThrow(SyntaxError);
    });
});
