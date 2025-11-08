import {BASE_JIKAN_API_URL} from "@/services/jikanApi/jikanApiConfig";
import type {AnimeMediaFormatParamType} from "@/features/animeSearch/animeMediaFormats";
import type {AnimeAiringStatusParamType} from "@/features/animeSearch/animeAiringStatus";
import type {AnimeAudienceRatingParamType} from "@/features/animeSearch/animeAudienceRating";
import type {AnimeSortCategoryParamType} from "@/features/animeSearch/animeSortCategory";
import type {AnimeSortDirectionParamType} from "@/features/animeSearch/animeSortDirection";
import type {AlphabetCharType} from "@/features/_shared/alphabetCharType";
import type {JikanAnimeSearchResponseInterface} from "@/services/jikanApi/jikanApiResponseTypes";

import {fetchJson} from "@/services/_shared/fetchJson";

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
    genres_exclude?: string; // Comma-separated genre IDs to exclude
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

export async function jikanFetchAnimeSearch(params: JikanApiSearchParamsInterface): Promise<JikanAnimeSearchResponseInterface> {
    if (params.limit !== undefined && params.limit < 1) {
        throw new Error("Limit must be at least 1");
    }
    const url = buildJikanAnimeSearchUrl(params);
    return fetchJson<JikanAnimeSearchResponseInterface>(url);
}
