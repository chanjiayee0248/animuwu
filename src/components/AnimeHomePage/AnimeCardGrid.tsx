import {AnimeCard} from "@/components/AnimeHomePage/AnimeCard.tsx";
import AnimeCardSkeleton from "@/components/AnimeHomePage/AnimeCardSkeleton.tsx";
import type {
    JikanAnimeSearchResponseInterface,
} from "@/services/jikanApi/api/jikanApiResponseTypes.ts";
import {getPreferredJikanAnimeTitle} from "@/services/jikanApi/utils/getPreferredJikanAnimeTitle.ts";
import KaomojiErrorDisplay from "@/components/_shared/KaomojiErrorDisplay.tsx";

interface AnimeCardGridProps {
    animeData: JikanAnimeSearchResponseInterface | null;
    animeSearchIsLoading: boolean;
    animeSearchError: string | null;
}

function AnimeCardGrid({animeData, animeSearchIsLoading, animeSearchError}: AnimeCardGridProps) {
    // If the search completed (not loading), there's no error, and we have an empty result set,
    // return a standalone 'no results' element (not nested inside the grid wrapper).
    const noResults = !animeSearchIsLoading && !animeSearchError && animeData && animeData.data.length === 0;

    if (noResults) {
        return (
            <KaomojiErrorDisplay messageHeader={"No Results Found"}
                                 messageContent={"Try readjusting your search criteria?"}/>
        );
    }

    // Deduplicate results by mal_id to avoid duplicate React keys (can happen with rapid pagination or
    // transient API responses that include overlapping items). Preserve first occurrence order.
    const uniqueAnimeData = animeData?.data
        ? animeData.data.filter((item, index, arr) => arr.findIndex(i => String(i.mal_id) === String(item.mal_id)) === index)
        : [];

    // Otherwise render the grid wrapper with loading skeletons, error, or results
    return (
        <div
            className={`w-full max-w-[1300px] grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-x-2 gap-y-6 justify-items-center
            max-lg:grid-cols-[repeat(auto-fit,minmax(200px,1fr))] max-md:grid-cols-[repeat(auto-fit,minmax(140px,1fr))]`}>
            {animeSearchIsLoading ? (
                // Loading skeletons
                Array.from({length: 25}).map((_, index) => (
                    <AnimeCardSkeleton key={`s-${index}`}/>
                ))
            ) : animeSearchError ? (
                // Error message spans full width
                <KaomojiErrorDisplay messageHeader={"Error!"} messageContent={animeSearchError}/>
            ) : uniqueAnimeData && uniqueAnimeData.length > 0 ? (
                // Data cards (deduplicated)
                uniqueAnimeData.map((anime) => (
                    <AnimeCard
                        key={String(anime.mal_id)}
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
