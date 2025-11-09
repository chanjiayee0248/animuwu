import {AnimeCard} from "@/components/AnimeHomePage/AnimeCard.tsx";
import AnimeCardSkeleton from "@/components/AnimeHomePage/AnimeCardSkeleton.tsx";
import type {
    JikanAnimeSearchResponseInterface,
} from "@/services/jikanApi/api/jikanApiResponseTypes.ts";
import {getPreferredJikanAnimeTitle} from "@/services/jikanApi/utils/getPreferredJikanAnimeTitle.ts";

interface AnimeCardGridProps {
    animeData: JikanAnimeSearchResponseInterface | null;
    animeSearchIsLoading: boolean;
    animeSearchError: string | null;
}

function AnimeCardGrid({ animeData, animeSearchIsLoading, animeSearchError }: AnimeCardGridProps) {
    // If the search completed (not loading), there's no error, and we have an empty result set,
    // return a standalone 'no results' element (not nested inside the grid wrapper).
    const noResults = !animeSearchIsLoading && !animeSearchError && animeData && animeData.data.length === 0;

    if (noResults) {
        return (
            <div className={`flex flex-col gap-8 text-center text-primary-muted-standard text-xl`}>
                <p aria-hidden={true} className={`text-8xl`}>( ╥ω╥ )</p>
                <p>No anime found. Try adjusting your search filters.</p>
            </div>
        );
    }

    // Otherwise render the grid wrapper with loading skeletons, error, or results
    return (
        <div className="w-full max-w-[1300px] grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-x-2 gap-y-6 justify-items-center">
            {animeSearchIsLoading ? (
                // Loading skeletons
                Array.from({length: 25}).map((_, index) => (
                    <AnimeCardSkeleton key={`s-${index}`} />
                ))
            ) : animeSearchError ? (
                // Error message spans full width
                <div className={`flex flex-col gap-4 text-center text-primary-muted-standard text-xl`}>
                    <p className={`text-8xl`}>(ʘᗩʘ’)</p>
                    <p className={`text-6xl italic font-bold`}>Error!</p>
                    <p>{animeSearchError}</p>
                </div>
            ) : animeData && animeData.data.length > 0 ? (
                // Data cards
                animeData.data.map((anime) => (
                    <AnimeCard
                        key={anime.mal_id}
                        title={getPreferredJikanAnimeTitle(anime.titles)}
                        imageUrl={anime.images.jpg.large_image_url || anime.images.jpg.image_url}
                        score={anime.score}
                        mediaFormat={anime.type}
                        airDateString={anime.aired.from}
                        episodeCount={anime.episodes}
                        id={anime.mal_id.toString()}
                    />
                ))
            ) : null}
        </div>
    );
}

export default AnimeCardGrid;
