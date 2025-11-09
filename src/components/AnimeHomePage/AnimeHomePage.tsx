import AnimeSearchFilterDropdowns from "@/components/AnimeHomePage/AnimeSearchFilterDropdowns";
import AnimeSearchBar from "@/components/AnimeHomePage/AnimeSearchBar";
import AnimeCardGrid from "@/components/AnimeHomePage/AnimeCardGrid.tsx";
import Pagination from "@/components/AnimeHomePage/Pagination.tsx";

import {useAppSelector, useAppDispatch} from "@/store/hooks.ts";
import {animeSearchActions} from "@/store/animeSearchSlice.ts";
import {useEffect, useState, useRef} from 'react';
import {jikanFetchAnimeSearch} from "@/services/jikanApi/api/jikanFetchAnimeSearch.ts";
import type {JikanAnimeSearchResponseInterface} from "@/services/jikanApi/api/jikanApiResponseTypes.ts";
import {isAbortError} from "@/services/_shared/isAbortError.ts";




function AnimeHomePage() {
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

    // Local state id store the fetched anime data
    const [animeData, setAnimeData] = useState<JikanAnimeSearchResponseInterface | null>(null);

    // Ref id track debounce timeout
    const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    // Track the latest request id to prevent race conditions (only accept the latest response)
    const latestRequestIdRef = useRef(0);

    // Keep a ref to the active AbortController so we can cancel previous requests
    const activeAbortControllerRef = useRef<AbortController | null>(null);

    // Preserve parameters to detect changes
    const prevParamsRef = useRef({
        searchQuery,
        airingStatus,
        audienceRating,
        mediaFormat,
        sortCategory,
        sortDirection
    });

    // Reset to first page ONLY when any search parameter changes (NOT ON MOUNT)
    useEffect(() => {
        const prevParams = prevParamsRef.current;
        const paramsChanged =
            prevParams.searchQuery !== searchQuery ||
            prevParams.airingStatus !== airingStatus ||
            prevParams.audienceRating !== audienceRating ||
            prevParams.mediaFormat !== mediaFormat ||
            prevParams.sortCategory !== sortCategory ||
            prevParams.sortDirection !== sortDirection;

        // Only reset to first page if parameters actually changed
        if (paramsChanged) {
            dispatch(animeSearchActions.setCurrentPage(1));
        }

        // Update ref with current values
        prevParamsRef.current = {
            searchQuery,
            airingStatus,
            audienceRating,
            mediaFormat,
            sortCategory,
            sortDirection
        };
    }, [searchQuery, airingStatus, audienceRating, mediaFormat, sortCategory, sortDirection, dispatch]);

    useEffect(() => {
        // Clear existing timeout on param change
        if (debounceTimeoutRef.current) {
            clearTimeout(debounceTimeoutRef.current);
        }

        // Set up debounced API call
        debounceTimeoutRef.current = setTimeout(async () => {
            // Increment request id and capture it locally
            const requestId = ++latestRequestIdRef.current;

            // Abort any in-flight request since we're starting a new one
            if (activeAbortControllerRef.current) {
                try {
                    activeAbortControllerRef.current.abort();
                } catch {
                    // ignore
                }
                activeAbortControllerRef.current = null;
            }

            // Create a new AbortController for this request
            const abortController = new AbortController();
            activeAbortControllerRef.current = abortController;

            try {
                // Set loading state
                dispatch(animeSearchActions.setLoading(true));
                dispatch(animeSearchActions.setError(null));

                // Call the API with the abort signal
                const response = await jikanFetchAnimeSearch({
                    q: searchQuery || undefined,
                    page: currentPage,
                    status: airingStatus,
                    rating: audienceRating,
                    type: mediaFormat,
                    order_by: sortCategory,
                    sort: sortDirection,
                    limit: 25
                }, abortController.signal);

                // If this response is stale (there's a newer request), ignore it
                if (requestId !== latestRequestIdRef.current) {
                    return;
                }

                // Update local state with the response
                setAnimeData(response);

                // Clear error and loading state
                dispatch(animeSearchActions.setLoading(false));
            } catch (error) {
                // If the error is an abort, just ignore and return (unless we want to reset loading)
                if (isAbortError(error)) {
                    // If this request was aborted and it's the latest request, clear loading
                    if (requestId === latestRequestIdRef.current) {
                        dispatch(animeSearchActions.setLoading(false));
                    }
                    return;
                }

                // Handle other errors
                const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
                // Make sure this error corresponds to the latest request
                if (requestId === latestRequestIdRef.current) {
                    dispatch(animeSearchActions.setError(errorMessage));
                    dispatch(animeSearchActions.setLoading(false));
                    setAnimeData(null);
                }
            } finally {
                // Clear the active controller if it's ours
                if (activeAbortControllerRef.current === abortController) {
                    activeAbortControllerRef.current = null;
                }
            }
        }, 250);

        // Cleanup function
        return () => {
            if (debounceTimeoutRef.current) {
                clearTimeout(debounceTimeoutRef.current);
            }
        };
    }, [searchQuery, airingStatus, audienceRating, mediaFormat, sortCategory, sortDirection, currentPage, dispatch]);


    return (
        <div className={`flex flex-col items-center w-full p-2`}>
            <header className={`flex flex-col items-center w-full pt-10 py-8 gap-1`}>
                <h1 className={`text-6xl font-semibold font-[Nunito] text-center text-primary-base-bright`}>
                    Anim<span className={`font-bold font-[Playpen_Sans] text-secondary-vivid-bright`}>UwU</span>
                </h1>
                <h2 className={`text-xl font-semibold font-[Nunito] italic text-center text-accent-muted-standard`}>
                    ~ Your Friendly Anime Search Pal ~
                </h2>
            </header>
            <section className={`flex flex-col gap-12 items-center w-full`}>
                <div className={`flex flex-col gap-6 items-center w-full`}>
                    <AnimeSearchBar/>
                    <AnimeSearchFilterDropdowns/>
                </div>
                <AnimeCardGrid animeData={animeData} animeSearchIsLoading={animeSearchIsLoading} animeSearchError={animeSearchError} />
                {animeData && animeData.data.length > 0 &&
                    <Pagination
                        currentPage={currentPage}
                        totalPages={animeData?.pagination?.last_visible_page ?? 1}
                        onPageChange={(newPage: number) => {dispatch(animeSearchActions.setCurrentPage(newPage))}}
                    />
                }

            </section>
        </div>
    );
}

export default AnimeHomePage;