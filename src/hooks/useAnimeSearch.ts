import { useEffect, useState, useRef } from 'react';
import { useAppSelector, useAppDispatch } from "@/store/hooks.ts";
import { animeSearchActions } from "@/store/animeSearchSlice.ts";
import { jikanFetchAnimeSearch } from "@/services/jikanApi/api/jikanFetchAnimeSearch.ts";
import type { JikanAnimeSearchResponseInterface } from "@/services/jikanApi/api/jikanApiResponseTypes.ts";
import { isAbortError } from "@/services/_shared/isAbortError.ts";
import { useDebounce} from "@/hooks/useDebounce.tsx";

interface UseAnimeSearchReturn {
    animeData: JikanAnimeSearchResponseInterface | null;
    animeSearchIsLoading: boolean;
    animeSearchError: string | null;
    currentPage: number;
}

export function useAnimeSearch(): UseAnimeSearchReturn {
    const dispatch = useAppDispatch();

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
    } = useAppSelector(state => state.animeSearch);

    const [animeData, setAnimeData] = useState<JikanAnimeSearchResponseInterface | null>(null);

    // Track the latest request id to prevent race conditions
    const latestRequestIdRef = useRef(0);

    // Keep a ref to the active AbortController so we can cancel previous requests
    const activeAbortControllerRef = useRef<AbortController | null>(null);

    // Debounce only the search query
    const debouncedSearchQuery = useDebounce(searchQuery, 250);

    // Reset to first page if any search parameters change
    const prevParamsRef = useRef({
        searchQuery,
        airingStatus,
        audienceRating,
        mediaFormat,
        sortCategory,
        sortDirection
    });

    useEffect(() => {
        const prev = prevParamsRef.current;
        const paramsChanged =
            prev.searchQuery !== searchQuery ||
            prev.airingStatus !== airingStatus ||
            prev.audienceRating !== audienceRating ||
            prev.mediaFormat !== mediaFormat ||
            prev.sortCategory !== sortCategory ||
            prev.sortDirection !== sortDirection;

        if (paramsChanged) {
            dispatch(animeSearchActions.setCurrentPage(1));
        }

        prevParamsRef.current = {
            searchQuery,
            airingStatus,
            audienceRating,
            mediaFormat,
            sortCategory,
            sortDirection
        };
    }, [searchQuery, airingStatus, audienceRating, mediaFormat, sortCategory, sortDirection, dispatch]);

    // Fetch anime data
    useEffect(() => {
        // Abort previous request if still running
        if (activeAbortControllerRef.current) {
            activeAbortControllerRef.current.abort();
        }

        const abortController = new AbortController();
        activeAbortControllerRef.current = abortController;

        const requestId = ++latestRequestIdRef.current;

        async function fetchData() {
            try {
                dispatch(animeSearchActions.setLoading(true));
                dispatch(animeSearchActions.setError(null));

                const response = await jikanFetchAnimeSearch({
                    q: debouncedSearchQuery || undefined,
                    page: currentPage,
                    status: airingStatus,
                    rating: audienceRating,
                    type: mediaFormat,
                    order_by: sortCategory,
                    sort: sortDirection,
                    limit: 25
                }, abortController.signal);

                if (requestId !== latestRequestIdRef.current) return;

                setAnimeData(response);
                dispatch(animeSearchActions.setLoading(false));
            } catch (error) {
                if (isAbortError(error)) {
                    if (requestId === latestRequestIdRef.current) {
                        dispatch(animeSearchActions.setLoading(false));
                    }
                    return;
                }

                const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
                if (requestId === latestRequestIdRef.current) {
                    dispatch(animeSearchActions.setError(errorMessage));
                    dispatch(animeSearchActions.setLoading(false));
                    setAnimeData(null);
                }
            } finally {
                if (activeAbortControllerRef.current === abortController) {
                    activeAbortControllerRef.current = null;
                }
            }
        }

        // Voiding this because fetchData returns an undefined promise
        // fetchData is async because you can't await directly
        // but data loading/error is already handled in state
        // so .then and .catch() is not needed
        void fetchData();

        return () => {
            // Abort request on unmount / dependency change
            abortController.abort();
        };
    }, [
        debouncedSearchQuery, // debounced value triggers effect
        airingStatus,
        audienceRating,
        mediaFormat,
        sortCategory,
        sortDirection,
        currentPage,
        dispatch
    ]);

    return { animeData, animeSearchIsLoading, animeSearchError, currentPage };
}

