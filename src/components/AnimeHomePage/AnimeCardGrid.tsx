import {AnimeCard} from "@/components/AnimeHomePage/AnimeCard.tsx";
import AnimeCardSkeleton from "@/components/AnimeHomePage/AnimeCardSkeleton.tsx";
import {useAppDispatch, useAppSelector} from "@/store/hooks";
import {animeSearchActions} from "@/store/animeSearchSlice";
import {jikanFetchAnimeSearch} from "@/services/jikanApi/jikanFetchAnimeSearch";
import {useEffect, useRef, useState} from "react";
import type {JikanAnimeSearchResponseInterface} from "@/services/jikanApi/jikanApiResponseTypes";
import type {AnimeMediaFormatParamType} from "@/features/animeSearch/animeMediaFormats";

/**
 * Convert API response type format (e.g., "TV", "Movie") to param format (e.g., "tv", "movie")
 */
function convertApiTypeToParam(apiType: "TV" | "OVA" | "Movie" | "Special" | "ONA" | "Music" | null): AnimeMediaFormatParamType {
    if (apiType === null) return null;

    const typeMap: Record<string, AnimeMediaFormatParamType> = {
        "TV": "tv",
        "Movie": "movie",
        "OVA": "ova",
        "Special": "special",
        "ONA": "ona",
        "Music": "music",
    };

    return typeMap[apiType] || null;
}

function AnimeCardGrid() {
    const dispatch = useAppDispatch();

    // Get all search parameters from the store
    const {
        searchQuery,
        airingStatus,
        audienceRating,
        mediaFormat,
        sortCategory,
        sortDirection,
        currentPage,
        animeSearchIsLoading,
        animeSearchError
    } = useAppSelector((state) => state.animeSearch);

    // Local state to store the fetched anime data
    const [animeData, setAnimeData] = useState<JikanAnimeSearchResponseInterface | null>(null);

    // Ref to track debounce timeout
    const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        // Clear existing timeout on param change
        if (debounceTimeoutRef.current) {
            clearTimeout(debounceTimeoutRef.current);
        }

        // Set up debounced API call
        debounceTimeoutRef.current = setTimeout(async () => {
            try {
                // Set loading state
                dispatch(animeSearchActions.setLoading(true));
                dispatch(animeSearchActions.setError(null));

                // Call the API
                const response = await jikanFetchAnimeSearch({
                    q: searchQuery || undefined,
                    page: currentPage,
                    status: airingStatus,
                    rating: audienceRating,
                    type: mediaFormat,
                    order_by: sortCategory,
                    sort: sortDirection,
                    limit: 25
                });

                // Update local state with the response
                setAnimeData(response);

                // Clear error and loading state
                dispatch(animeSearchActions.setLoading(false));
            } catch (error) {
                // Handle error
                const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
                dispatch(animeSearchActions.setError(errorMessage));
                dispatch(animeSearchActions.setLoading(false));
                setAnimeData(null);
            }
        }, 250);

        // Cleanup function
        return () => {
            if (debounceTimeoutRef.current) {
                clearTimeout(debounceTimeoutRef.current);
            }
        };
    }, [searchQuery, airingStatus, audienceRating, mediaFormat, sortCategory, sortDirection, currentPage, dispatch]);

    // Render loading skeletons
    if (animeSearchIsLoading) {
        return (
            <div className="anime-card-grid">
                {Array.from({length: 25}).map((_, index) => (
                    <AnimeCardSkeleton key={index} />
                ))}
            </div>
        );
    }

    // Render error message
    if (animeSearchError) {
        return (
            <div className="anime-card-grid-error">
                {animeSearchError}
            </div>
        );
    }

    // Render anime cards
    if (animeData && animeData.data.length > 0) {
        return (
            <div className="anime-card-grid">
                {animeData.data.map((anime) => (
                    <AnimeCard
                        key={anime.mal_id}
                        title={anime.titles[0]?.title || 'Unknown Title'}
                        imageUrl={anime.images.jpg.large_image_url || anime.images.jpg.image_url}
                        score={anime.score}
                        mediaFormatParam={convertApiTypeToParam(anime.type)}
                        airDate={anime.aired.from}
                    />
                ))}
            </div>
        );
    }

    // Render empty state
    return (
        <div className="anime-card-grid-empty">
            No anime found. Try adjusting your search filters.
        </div>
    );
}

export default AnimeCardGrid;