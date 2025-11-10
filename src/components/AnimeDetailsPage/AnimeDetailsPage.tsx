import { useParams } from 'react-router-dom';
import Loader from '@/components/AnimeDetailsPage/Loader';
import KaomojiErrorDisplay from "@/components/_shared/KaomojiErrorDisplay.tsx";
import AnimeMainDetails from "@/components/AnimeDetailsPage/AnimeMainDetails.tsx";
import { AnimeExtendedDetails } from "@/components/AnimeDetailsPage/AnimeExtendedDetails.tsx";
import AnimeStats from "@/components/AnimeDetailsPage/AnimeStats.tsx";
import { getPreferredJikanAnimeTitle } from "@/services/jikanApi/utils/getPreferredJikanAnimeTitle.ts";
import { firstLetterToUpper } from "@/utils/firstLetterToUpper.ts";
import { useAnimeById } from "@/hooks/useAnimeById.ts";

type Params = {
    animeId?: string;
};

function AnimeDetailsPage() {
    const { animeId } = useParams<Params>();
    const { loading, response, error } = useAnimeById(animeId);

    // Show loader while loading or when we have no response/error yet
    if (loading || (!response && !error)) {
        return (
            <div className="w-full min-h-dvh flex flex-col items-center justify-center">
                <Loader />
            </div>
        );
    }

    // Show error if present
    if (error) {
        return <KaomojiErrorDisplay messageHeader="Error!" messageContent={error} />;
    }

    // Show no data message if response is missing
    if (!response) {
        return <KaomojiErrorDisplay messageHeader="No Data" messageContent="No anime data available." />;
    }

    const data = response.data;

    // Map genre objects to string names to avoid rendering objects in JSX
    const genreNames = Array.isArray(data.genres) ? data.genres.map(g => g.name) : [];

    return (
        <div className={`w-full min-h-dvh flex flex-col items-center gap-8 max-md:gap-2`}>
            <AnimeMainDetails
                englishTitle={getPreferredJikanAnimeTitle(data.titles, "english")}
                defaultTitle={getPreferredJikanAnimeTitle(data.titles, "default")}
                japaneseTitle={getPreferredJikanAnimeTitle(data.titles, "japanese")}
                imageUrl={data.images.webp.image_url || data.images.jpg.image_url}
                mediaType={data.type}
                maturityRating={data.rating}
                season={data.season ? firstLetterToUpper(data.season) : null}
                year={data.year}
                episodeCount={data.episodes}
                episodeDuration={data.duration}
                airingStatus={data.status}
                genres={genreNames}
            />

            <div className="flex justify-center w-full p-4">
                <div className={`grid grid-cols-[250px_1fr] max-w-[1100px] w-full rounded-2xl overflow-hidden
                 shadow-[0_0_4px_var(--color-primary-vivid-standard-translucent)]
                max-md:grid-cols-1`}>
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
                        studios={data.studios}
                    />
                </div>
            </div>
        </div>
    );
}

export default AnimeDetailsPage;