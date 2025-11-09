import {fetchJson} from "@/services/_shared/fetchJson.ts";
import {BASE_JIKAN_API_URL} from "@/services/jikanApi/api/jikanApiConfig.ts";
import type {JikanAnimeLookupResponseInterface} from "@/services/jikanApi/api/jikanApiResponseTypes.ts";

export async function jikanFetchAnimeById(animeId: number, signal?: AbortSignal): Promise<JikanAnimeLookupResponseInterface> {

    if (!animeId || animeId <= 0) {
        throw new Error('Anime ID must be a positive integer');
    }

    const url = `${BASE_JIKAN_API_URL}/anime/${animeId}`;
    return fetchJson<JikanAnimeLookupResponseInterface>(url, signal ? { signal } : undefined);
}