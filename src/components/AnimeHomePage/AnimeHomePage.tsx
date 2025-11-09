import AnimeSearchFilterDropdowns from "@/components/AnimeHomePage/AnimeSearchFilterDropdowns";
import AnimeSearchBar from "@/components/AnimeHomePage/AnimeSearchBar";
import AnimeCardGrid from "@/components/AnimeHomePage/AnimeCardGrid.tsx";
import Pagination from "@/components/AnimeHomePage/Pagination.tsx";

import {useAppSelector, useAppDispatch} from "@/store/hooks.ts";
import {animeSearchActions} from "@/store/animeSearchSlice.ts";
import {useEffect, useState, useRef} from 'react';
import {jikanFetchAnimeSearch} from "@/services/jikanApi/api/jikanFetchAnimeSearch.ts";
import type {JikanAnimeSearchResponseInterface} from "@/services/jikanApi/api/jikanApiResponseTypes.ts";



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
                <Pagination
                    currentPage={currentPage}
                    totalPages={animeData?.pagination?.last_visible_page ?? 1}
                    onPageChange={(newPage: number) => {dispatch(animeSearchActions.setCurrentPage(newPage))}}
                />
            </section>
        </div>
    );
}

export default AnimeHomePage;