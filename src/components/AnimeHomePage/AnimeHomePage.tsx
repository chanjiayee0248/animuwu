import AnimeSearchFilterDropdowns from "@/components/AnimeHomePage/AnimeSearchFilterDropdowns";
import AnimeSearchBar from "@/components/AnimeHomePage/AnimeSearchBar";
import AnimeCardGrid from "@/components/AnimeHomePage/AnimeCardGrid.tsx";
import Pagination from "@/components/AnimeHomePage/Pagination.tsx";

import {animeSearchActions} from "@/store/animeSearchSlice.ts";
import {useAnimeSearch} from "@/hooks/useAnimeSearch.ts";
import {useAppDispatch} from "@/store/hooks.ts";




function AnimeHomePage() {


    const dispatch = useAppDispatch();

    const {
        animeData,
        animeSearchIsLoading,
        animeSearchError,
        currentPage
    } = useAnimeSearch();


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