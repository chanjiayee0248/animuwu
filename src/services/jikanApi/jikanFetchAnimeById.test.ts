// src/services/jikanApi/jikanFetchAnimeById.test.ts
import { describe, it, expect, vi, beforeEach } from "vitest";
import type { MockedFunction } from "vitest";
import { jikanFetchAnimeById } from "./jikanFetchAnimeById";
import { fetchJson } from "@/services/_shared/fetchJson";
import type { JikanAnimeLookupResponseInterface } from "@/services/jikanApi/jikanApiResponseTypes";

// --- Mock fetchJson ---
vi.mock("@/services/_shared/fetchJson");

describe("jikanFetchAnimeById (unit test)", () => {
    const mockResponse: JikanAnimeLookupResponseInterface = {
        data: {
            mal_id: 50265,
            url: "https://myanimelist.net/anime/50265/Spy_x_Family",
            images: {
                jpg: {
                    image_url: "https://cdn.myanimelist.net/images/anime/1441/122795.jpg",
                    small_image_url: "https://cdn.myanimelist.net/images/anime/1441/122795t.jpg",
                    large_image_url: "https://cdn.myanimelist.net/images/anime/1441/122795l.jpg",
                },
                webp: {
                    image_url: "https://cdn.myanimelist.net/images/anime/1441/122795.webp",
                    small_image_url: "https://cdn.myanimelist.net/images/anime/1441/122795t.webp",
                    large_image_url: "https://cdn.myanimelist.net/images/anime/1441/122795l.webp",
                },
            },
            trailer: {
                youtube_id: null,
                url: null,
                embed_url: "https://www.youtube-nocookie.com/embed/ofXigq9aIpo?enablejsapi=1&wmode=opaque&autoplay=1",
                images: {
                    image_url: null,
                    small_image_url: null,
                    medium_image_url: null,
                    large_image_url: null,
                    maximum_image_url: null,
                },
            },
            approved: true,
            titles: [
                { type: "Default", title: "Spy x Family" },
                { type: "Japanese", title: "SPY×FAMILY" },
            ],
            title: "Spy x Family",
            title_english: null,
            title_japanese: "SPY×FAMILY",
            title_synonyms: [],
            type: "TV",
            source: "Manga",
            episodes: 12,
            status: "Finished Airing",
            airing: false,
            aired: {
                from: "2022-04-09T00:00:00+00:00",
                to: "2022-06-25T00:00:00+00:00",
                prop: {
                    from: { day: 9, month: 4, year: 2022 },
                    to: { day: 25, month: 6, year: 2022 },
                },
                string: "Apr 9, 2022 to Jun 25, 2022",
            },
            duration: "24 min per ep",
            rating: "PG-13 - Teens 13 or older",
            score: 8.44,
            scored_by: 1112876,
            rank: 187,
            popularity: 59,
            members: 1810193,
            favorites: 40663,
            synopsis: "Corrupt politicians, frenzied nationalists, ...",
            background: "Winner of the Anime of the Year ...",
            season: "spring",
            year: 2022,
            broadcast: {
                day: "Saturdays",
                time: "23:00",
                timezone: "Asia/Tokyo",
                string: "Saturdays at 23:00 (JST)",
            },
            producers: [],
            licensors: [],
            studios: [],
            genres: [],
            explicit_genres: [],
            themes: [],
            demographics: [],
        },
    } as unknown as JikanAnimeLookupResponseInterface // Force type — Jikan has field (images) not logged in docs, but the values are null anyways

    beforeEach(() => {
        vi.resetAllMocks();
    });

    it("calls fetchJson with the correct URL and returns data", async () => {
        // Cast fetchJson to MockedFunction for type safety
        const fetchJsonMock = fetchJson as MockedFunction<typeof fetchJson>;
        fetchJsonMock.mockResolvedValue(mockResponse);

        const animeId = 50265;
        const result = await jikanFetchAnimeById(animeId);

        // ✅ fetchJson called once
        expect(fetchJsonMock).toHaveBeenCalledTimes(1);

        // ✅ fetchJson called with correct URL
        const calledUrl = fetchJsonMock.mock.calls[0][0];
        expect(calledUrl).toContain(`${animeId}`);

        // ✅ result matches mock
        expect(result).toEqual(mockResponse);
    });
});
