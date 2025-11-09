import {BASE_JIKAN_API_URL} from "@/services/jikanApi/api/jikanApiConfig.ts";
import type {AnimeMediaFormatParamType} from "@/features/animeSearch/animeMediaFormats.ts";
import type {AnimeAiringStatusParamType} from "@/features/animeSearch/animeAiringStatus.ts";
import type {AnimeAudienceRatingParamType} from "@/features/animeSearch/animeAudienceRating.ts";
import type {AnimeSortCategoryParamType} from "@/features/animeSearch/animeSortCategory.ts";
import type {AnimeSortDirectionParamType} from "@/features/animeSearch/animeSortDirection.ts";
import type {AlphabetCharType} from "@/features/_shared/alphabetCharType.ts";
import type {JikanAnimeSearchResponseInterface} from "@/services/jikanApi/api/jikanApiResponseTypes.ts";

import {fetchJson} from "@/services/_shared/fetchJson.ts";

interface JikanApiSearchParamsInterface {
    q?: string;
    page?: number;
    limit?: number;
    type?: AnimeMediaFormatParamType;
    score?: number;
    min_score?: number;
    max_score?: number;
    status?: AnimeAiringStatusParamType;
    rating?: AnimeAudienceRatingParamType;
    sfw?: boolean;
    genres?: string; // Comma-separated genre IDs
    genres_exclude?: string; // Comma-separated genre IDs id exclude
    order_by?: AnimeSortCategoryParamType;
    sort?: AnimeSortDirectionParamType;
    letter?: AlphabetCharType;
    producers?: string; // Comma-separated producer IDs
    start_date?: string; // YYYY-MM-DD
    end_date?: string; // YYYY-MM-DD
}

export function buildJikanAnimeSearchUrl(params: JikanApiSearchParamsInterface): string {
    const url = new URL(`${BASE_JIKAN_API_URL}/anime`);

    Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
            url.searchParams.append(key, String(value));
        }
    });
    return url.toString();
}

export async function jikanFetchAnimeSearch(params: JikanApiSearchParamsInterface, signal?: AbortSignal): Promise<JikanAnimeSearchResponseInterface> {
    if (params.limit !== undefined && params.limit < 1) {
        throw new Error("Limit must be at least 1");
    }
    const url = buildJikanAnimeSearchUrl(params);
    return fetchJson<JikanAnimeSearchResponseInterface>(url, signal ? { signal } : undefined);
}
