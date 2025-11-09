
import { describe, it, expect, afterEach } from "vitest";
import { jikanFetchAnimeSearch } from "./jikanFetchAnimeSearch.ts";
import {assertAnimeObject} from "@/services/jikanApi/api/jikanFetchAnimeById.integration.test.ts";
import type {
    JikanAnimeSearchResponseInterface,
    JikanAnimePaginationInterface,
} from "@/services/jikanApi/api/jikanApiResponseTypes.ts";
import {JIKAN_INTEGRATION_TEST_COOLDOWN_IN_MS} from "@/services/jikanApi/api/jikanApiConfig.ts";

function assertPagination(pagination: JikanAnimePaginationInterface) {
    expect(pagination).toBeDefined();
    expect(typeof pagination.last_visible_page).toBe("number");
    expect(typeof pagination.has_next_page).toBe("boolean");
    expect(typeof pagination.current_page).toBe("number");

    expect(pagination.items).toBeDefined();
    expect(typeof pagination.items.count).toBe("number");
    expect(typeof pagination.items.total).toBe("number");
    expect(typeof pagination.items.per_page).toBe("number");
}

describe("jikanFetchAnimeSearch (integration)", () => {

    afterEach(async () => {
        await new Promise(resolve => setTimeout(resolve, JIKAN_INTEGRATION_TEST_COOLDOWN_IN_MS));
    });

    it("searches and returns valid anime data structure", async () => {
        const params = { q: "Naruto", limit: 5 };
        const result: JikanAnimeSearchResponseInterface = await jikanFetchAnimeSearch(params);

        expect(result).toHaveProperty("data");
        expect(result).toHaveProperty("pagination");

        assertPagination(result.pagination);

        expect(Array.isArray(result.data)).toBe(true);
        expect(result.data.length).toBeGreaterThan(0);
        expect(result.data.length).toBeLessThanOrEqual(5);

        // Validate each anime object
        result.data.forEach(anime => {
            assertAnimeObject(anime);
        });
    }, 10_000);

    it("respects limit parameter", async () => {
        const params = { q: "One Piece", limit: 3 };
        const result = await jikanFetchAnimeSearch(params);

        expect(result.data.length).toBeLessThanOrEqual(3);
        assertPagination(result.pagination);
    }, 10_000);

    it("handles pagination correctly", async () => {
        const params = { q: "Dragon Ball", limit: 10, page: 1 };
        const result = await jikanFetchAnimeSearch(params);

        expect(result.pagination.current_page).toBe(1);
        expect(result.pagination.items.per_page).toBe(10);
        expect(typeof result.pagination.has_next_page).toBe("boolean");
    }, 10_000);

    it("returns empty results for non-existent anime", async () => {
        const params = { q: "xyznonexistentanime99999", limit: 5 };
        const result = await jikanFetchAnimeSearch(params);

        expect(result.data).toEqual([]);
        expect(result.pagination.has_next_page).toBe(false);
        expect(result.pagination.items.total).toBe(0);
    }, 10_000);

    it("handles special characters in search query", async () => {
        const params = { q: "Re:Zero", limit: 3 };
        const result = await jikanFetchAnimeSearch(params);

        expect(result.data.length).toBeGreaterThan(0);
        result.data.forEach(anime => {
            assertAnimeObject(anime);
        });
    }, 10_000);

    it("throws validation error for limit less than 1", async () => {
        await expect(jikanFetchAnimeSearch({ q: "Naruto", limit: 0 }))
            .rejects
            .toThrow("Limit must be at least 1");

        await expect(jikanFetchAnimeSearch({ q: "Naruto", limit: -5 }))
            .rejects
            .toThrow("Limit must be at least 1");
    });

    it("lets server handle limit upper bounds", async () => {
        // If limit is too high, server will respond with error
        // We just pass it through and let the error bubble up
        await expect(jikanFetchAnimeSearch({ q: "Naruto", limit: 1000 }))
            .rejects
            .toThrow(/4\d{2}|limit/i); // Expect 4xx error or limit-related message
    }, 10_000);

    it("uses reasonable limits successfully", async () => {
        // Test that known-good values work
        const result = await jikanFetchAnimeSearch({ q: "Naruto", limit: 10 });
        expect(result.data.length).toBeLessThanOrEqual(10);
    }, 10_000);
});
