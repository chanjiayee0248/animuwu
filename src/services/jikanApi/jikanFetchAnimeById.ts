import {fetchJson} from "@/services/_shared/fetchJson";
import {BASE_JIKAN_API_URL} from "@/services/jikanApi/jikanApiConfig";
import type {JikanAnimeLookupResponseInterface} from "@/services/jikanApi/jikanApiResponseTypes";

export async function jikanFetchAnimeById(animeId: number): Promise<JikanAnimeLookupResponseInterface> {

    if (!animeId || animeId <= 0) {
        throw new Error('Anime ID must be a positive integer');
    }

    const url = `${BASE_JIKAN_API_URL}/anime/${animeId}`;
    return fetchJson<JikanAnimeLookupResponseInterface>(url);
}