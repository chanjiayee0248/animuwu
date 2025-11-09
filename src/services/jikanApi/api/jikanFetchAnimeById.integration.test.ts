import { describe, it, expect, afterEach } from "vitest";
import { jikanFetchAnimeById } from "./jikanFetchAnimeById.ts";
import type {
    JikanAnimeLookupResponseInterface,
    JikanAnimeSingleItemInterface,
    JikanAnimeImagesInterface,
    JikanAnimeTrailerInterface,
    JikanAnimeTitleInterface,
    JikanAnimeBroadcastInterface,
    JikanAnimeMalUrlResourceInterface,
} from "@/services/jikanApi/api/jikanApiResponseTypes.ts";
import {JIKAN_INTEGRATION_TEST_COOLDOWN_IN_MS} from "@/services/jikanApi/api/jikanApiConfig.ts";

// ======================================
// Helper Functions for Assertions
// ======================================

function assertAnimeImages(images: JikanAnimeImagesInterface) {
    expect(images).toBeDefined();

    // JPG images
    expect(images.jpg).toBeDefined();
    expect(images.jpg.image_url).toMatch(/^https:\/\/.+/);
    if (images.jpg.small_image_url !== null) {
        expect(images.jpg.small_image_url).toMatch(/^https:\/\/.+/);
    }
    if (images.jpg.large_image_url !== null) {
        expect(images.jpg.large_image_url).toMatch(/^https:\/\/.+/);
    }

    // WebP images
    expect(images.webp).toBeDefined();
    if (images.webp.image_url !== null) {
        expect(images.webp.image_url).toMatch(/^https:\/\/.+/);
    }
}

function assertAnimeTrailer(trailer: JikanAnimeTrailerInterface) {
    expect(trailer).toBeDefined();

    if (trailer.youtube_id !== null) {
        expect(typeof trailer.youtube_id).toBe("string");
        expect(trailer.youtube_id.length).toBeGreaterThan(0);
    }

    if (trailer.url !== null) {
        expect(trailer.url).toMatch(/^https:\/\/(www\.)?youtube-nocookie\.com/);
    }

    if (trailer.embed_url !== null) {
        expect(trailer.embed_url).toMatch(/^https:\/\/(www\.)?youtube-nocookie\.com\/embed/);
    }
}

function assertAnimeTitles(titles: JikanAnimeTitleInterface[]) {
    expect(Array.isArray(titles)).toBe(true);
    expect(titles.length).toBeGreaterThan(0);

    titles.forEach(title => {
        expect(title).toHaveProperty("type");
        expect(title).toHaveProperty("title");
        expect(typeof title.type).toBe("string");
        expect(typeof title.title).toBe("string");
        expect(title.title.length).toBeGreaterThan(0);
    });
}

function assertMalUrlResource(resource: JikanAnimeMalUrlResourceInterface) {
    expect(resource.mal_id).toBeTypeOf("number");
    expect(resource.mal_id).toBeGreaterThan(0);
    expect(resource.type).toBeTypeOf("string");
    expect(resource.name).toBeTypeOf("string");
    expect(resource.url).toMatch(/^https:\/\/myanimelist\.net/);
}

function assertBroadcast(broadcast: JikanAnimeBroadcastInterface) {
    expect(broadcast).toBeDefined();

    if (broadcast.day !== null) {
        expect(typeof broadcast.day).toBe("string");
    }

    if (broadcast.time !== null) {
        expect(typeof broadcast.time).toBe("string");
    }

    if (broadcast.timezone !== null) {
        expect(typeof broadcast.timezone).toBe("string");
    }
}



export function assertAnimeObject(anime: JikanAnimeSingleItemInterface) {
    // Required fields
    expect(anime.mal_id).toBeTypeOf("number");
    expect(anime.mal_id).toBeGreaterThan(0);
    expect(anime.url).toMatch(/^https:\/\/myanimelist\.net\/anime\//);
    expect(typeof anime.approved).toBe("boolean");
    expect(typeof anime.airing).toBe("boolean");

    // Complex nested objects
    assertAnimeImages(anime.images);
    assertAnimeTrailer(anime.trailer);
    assertAnimeTitles(anime.titles);
    assertBroadcast(anime.broadcast);

    // Type validation
    if (anime.type !== null) {
        expect(["TV", "OVA", "Movie", "Special", "ONA", "Music"]).toContain(anime.type);
    }

    // Status validation
    if (anime.status !== null) {
        expect(["Finished Airing", "Currently Airing", "Not yet aired"]).toContain(anime.status);
    }

    // Numeric fields with constraints
    if (anime.episodes !== null) {
        expect(anime.episodes).toBeGreaterThan(0);
    }

    if (anime.score !== null) {
        expect(anime.score).toBeGreaterThanOrEqual(0);
        expect(anime.score).toBeLessThanOrEqual(10);
    }

    if (anime.rank !== null) {
        expect(anime.rank).toBeGreaterThan(0);
    }

    if (anime.popularity !== null) {
        expect(anime.popularity).toBeGreaterThan(0);
    }

    if (anime.year !== null) {
        expect(anime.year).toBeGreaterThan(1900);
        expect(anime.year).toBeLessThanOrEqual(new Date().getFullYear() + 2);
    }

    // Season validation
    if (anime.season !== null) {
        expect(["summer", "winter", "spring", "fall"]).toContain(anime.season);
    }

    // Array fields
    expect(Array.isArray(anime.producers)).toBe(true);
    expect(Array.isArray(anime.licensors)).toBe(true);
    expect(Array.isArray(anime.studios)).toBe(true);
    expect(Array.isArray(anime.genres)).toBe(true);
    expect(Array.isArray(anime.explicit_genres)).toBe(true);
    expect(Array.isArray(anime.themes)).toBe(true);
    expect(Array.isArray(anime.demographics)).toBe(true);

    // Validate MAL URL resources if they exist
    if (anime.genres.length > 0) {
        assertMalUrlResource(anime.genres[0]);
    }

    if (anime.studios.length > 0) {
        assertMalUrlResource(anime.studios[0]);
    }

    // Aired dates
    expect(anime.aired).toBeDefined();
    expect(anime.aired.prop).toBeDefined();
    expect(anime.aired.prop.from).toBeDefined();
    expect(anime.aired.prop.to).toBeDefined();
}

// ======================================
// Integration Tests: Fetch by ID
// ======================================

describe("jikanFetchAnimeById (integration)", () => {

    afterEach(async () => {
        await new Promise(resolve => setTimeout(resolve, JIKAN_INTEGRATION_TEST_COOLDOWN_IN_MS));
    });

    it("fetches complete anime data for Spy x Family", async () => {
        const animeId = 50265;
        const result: JikanAnimeLookupResponseInterface = await jikanFetchAnimeById(animeId);

        expect(result).toHaveProperty("data");
        expect(result.data.mal_id).toBe(animeId);

        assertAnimeObject(result.data);

        // Specific assertions for this anime
        expect(result.data.type).toBe("TV");
        expect(result.data.status).toBe("Finished Airing");
        expect(result.data.genres.length).toBeGreaterThan(0);
    }, 10_000);

    it("fetches complete anime data for Fullmetal Alchemist: Brotherhood", async () => {
        const animeId = 5114;
        const result = await jikanFetchAnimeById(animeId);

        assertAnimeObject(result.data);
        expect(result.data.mal_id).toBe(animeId);
        expect(result.data.type).toBe("TV");
        expect(result.data.episodes).toBe(64);
    }, 10_000);

    it("fetches anime with movies type", async () => {
        const animeId = 1; // Cowboy Bebop Movie
        const result = await jikanFetchAnimeById(animeId);

        assertAnimeObject(result.data);
        expect(result.data.mal_id).toBe(animeId);
    }, 10_000);

    it("throws error for non-existent anime ID", async () => {
        await expect(jikanFetchAnimeById(999999999))
            .rejects
            .toThrow();
    }, 10_000);

    it("throws validation error before API call for invalid anime ID", async () => {
        // This should fail validation BEFORE making the API call
        await expect(jikanFetchAnimeById(-1))
            .rejects
            .toThrow("Anime ID must be a positive integer");

        await expect(jikanFetchAnimeById(0))
            .rejects
            .toThrow("Anime ID must be a positive integer");
    });
});
