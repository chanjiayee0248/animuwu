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

    // Otherwise render the grid wrapper with loading skeletons, error, or results
    return (
        <div
            className="w-full max-w-[1300px] grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-x-2 gap-y-6 justify-items-center">
            {animeSearchIsLoading ? (
                // Loading skeletons
                Array.from({length: 25}).map((_, index) => (
                    <AnimeCardSkeleton key={`s-${index}`}/>
                ))
            ) : animeSearchError ? (
                // Error message spans full width
                <KaomojiErrorDisplay messageHeader={"Error!"} messageContent={animeSearchError}/>
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
