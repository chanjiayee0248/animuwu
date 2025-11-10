import { useEffect, useState, useRef } from 'react';
import { useAppSelector, useAppDispatch } from "@/store/hooks.ts";
import { animeSearchActions } from "@/store/animeSearchSlice.ts";
import { jikanFetchAnimeSearch } from "@/services/jikanApi/api/jikanFetchAnimeSearch.ts";
import type { JikanAnimeSearchResponseInterface } from "@/services/jikanApi/api/jikanApiResponseTypes.ts";
import { isAbortError } from "@/services/_shared/isAbortError.ts";

interface UseAnimeSearchReturn {
    animeData: JikanAnimeSearchResponseInterface | null;
    animeSearchIsLoading: boolean;
    animeSearchError: string | null;
    currentPage: number;
}

export function useAnimeSearch():UseAnimeSearchReturn  {
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

    // Track the latest request id to prevent race conditions
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

    // Reset to first page when search parameters change (not on mount)
    useEffect(() => {
        const prevParams = prevParamsRef.current;
        const paramsChanged =
            prevParams.searchQuery !== searchQuery ||
            prevParams.airingStatus !== airingStatus ||
            prevParams.audienceRating !== audienceRating ||
            prevParams.mediaFormat !== mediaFormat ||
            prevParams.sortCategory !== sortCategory ||
            prevParams.sortDirection !== sortDirection;

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

    // Fetch anime data with debouncing and request cancellation
    useEffect(() => {
        // Clear existing timeout on param change
        if (debounceTimeoutRef.current) {
            clearTimeout(debounceTimeoutRef.current);
        }

        // Set up debounced API call
        debounceTimeoutRef.current = setTimeout(async () => {
            // Increment request id and capture it locally
            const requestId = ++latestRequestIdRef.current;

            // Abort any in-flight request
            if (activeAbortControllerRef.current) {
                try {
                    activeAbortControllerRef.current.abort();
                } catch {
                    // Ignore abort errors
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

                // Ignore stale responses
                if (requestId !== latestRequestIdRef.current) {
                    return;
                }

                // Update local state with the response
                setAnimeData(response);

                // Clear loading state
                dispatch(animeSearchActions.setLoading(false));
            } catch (error) {
                // Handle abort errors
                if (isAbortError(error)) {
                    // Clear loading only if this is the latest request
                    if (requestId === latestRequestIdRef.current) {
                        dispatch(animeSearchActions.setLoading(false));
                    }
                    return;
                }

                // Handle other errors
                const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';

                // Only set error if this is the latest request
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
                debounceTimeoutRef.current = null;
            }
            // Abort any in-flight request: Client-side cleanup so unmounted components don't receive responses
            if (activeAbortControllerRef.current) {
                activeAbortControllerRef.current.abort();
                activeAbortControllerRef.current = null;
            }
        };
    }, [searchQuery, airingStatus, audienceRating, mediaFormat, sortCategory, sortDirection, currentPage, dispatch]);

    return {
        animeData,
        animeSearchIsLoading,
        animeSearchError,
        currentPage
    };
}