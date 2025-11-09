import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import Loader from '@/components/AnimeDetailsPage/Loader';
import { jikanFetchAnimeById } from '@/services/jikanApi/api/jikanFetchAnimeById';
import type {
    JikanAnimeLookupResponseInterface,
} from "@/services/jikanApi/api/jikanApiResponseTypes.ts";
import { isAbortError } from '@/services/_shared/isAbortError.ts';
import KaomojiErrorDisplay from "@/components/_shared/KaomojiErrorDisplay.tsx";
import AnimeMainDetails from "@/components/AnimeDetailsPage/AnimeMainDetails.tsx";
import {getPreferredJikanAnimeTitle} from "@/services/jikanApi/utils/getPreferredJikanAnimeTitle.ts";
import {firstLetterToUpper} from "@/utils/firstLetterToUpper.ts";
import {AnimeExtendedDetails} from "@/components/AnimeDetailsPage/AnimeExtendedDetails.tsx";
import AnimeStats from "@/components/AnimeDetailsPage/AnimeStats.tsx";

type Params = {
    animeId?: string;
};

function AnimeDetailsPage() {
    const { animeId } = useParams<Params>();
    const navigate = useNavigate();

    const [loading, setLoading] = useState<boolean>(true);
    const [response, setResponse] = useState<JikanAnimeLookupResponseInterface | null>(null);
    const [error, setError] = useState<string | null>(null);

    const abortControllerRef = useRef<AbortController | null>(null);

    useEffect(() => {
        // Abort any previous request
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
        }

        // Create new AbortController for this request
        const abortController = new AbortController();
        abortControllerRef.current = abortController;

        async function load() {
            setLoading(true);
            setError(null);
            setResponse(null);

            if (!animeId) {
                setError('No id found in URL');
                setLoading(false);
                return;
            }

            const id = Number(animeId);
            if (!Number.isInteger(id) || id <= 0) {
                setError('Invalid anime id');
                setLoading(false);
                return;
            }

            try {
                const resp = await jikanFetchAnimeById(id, abortController.signal);
                setResponse(resp);
            } catch (err: unknown) {
                // Ignore abort errors - they're intentional
                if (isAbortError(err)) {
                    return;
                }

                const message = err instanceof Error ? err.message : String(err);
                // detect 404 by status included in fetchJson error message
                if (message.includes('404')) {
                    navigate('/404-not-found');
                    return;
                }
                setError(message || 'An error occurred while fetching anime details');
            } finally {
                setLoading(false);
            }
        }

        load();

        return () => {
            // Abort the request on cleanup
            abortController.abort();
        };
    }, [animeId, navigate]);

    if (loading || (!response && !error)) return (
        <div className={`w-full min-h-dvh flex flex-col items-center justify-center`}>
        <Loader />
        </div>
    );



    if (error) return <KaomojiErrorDisplay messageHeader={"Error!"} messageContent={error} />;

    if (!response) return <KaomojiErrorDisplay messageHeader={"No Data"} messageContent={"No anime data available."} />;



    const data = response.data;

    // Map genre objects to string names to avoid rendering objects in JSX
    const genreNames = Array.isArray(data.genres) ? data.genres.map(g => g.name) : [];

    //TODO: PLACEHOLDER IMAGE
    return (
        <div className={`w-full min-h-dvh flex flex-col items-center gap-8`}>
            <AnimeMainDetails
                englishTitle={getPreferredJikanAnimeTitle(data.titles, "english")}
                defaultTitle={getPreferredJikanAnimeTitle(data.titles, "default")}
                japaneseTitle={getPreferredJikanAnimeTitle(data.titles, "japanese")}
                imageUrl={data.images.webp.image_url || data.images.jpg.image_url }
                mediaType={data.type}
                maturityRating={data.rating}
                season={data.season ? firstLetterToUpper(data.season) : null}
                year={data.year}
                episodeCount={data.episodes}
                episodeDuration={data.duration}
                airingStatus={data.status}
                genres={genreNames}
            />
            <div className={`flex justify-center w-full p-4`}>
                <div className={`grid grid-cols-[250px_1fr] max-w-[1100px] w-full rounded-2xl overflow-hidden`}>
                    <AnimeStats
                        score={data.score}
                        scoredBy={data.scored_by}
                        rank={data.rank}
                        popularity={data.popularity}
                        members={data.members}
                        favorites={data.favorites}
                    />
                    <AnimeExtendedDetails
                        synopsis={data.synopsis}
                        background={data.background}
                        trailerEmbedUrl={data.trailer.embed_url}
                    />
                </div>
            </div>


        </div>
    );
}

export default AnimeDetailsPage;