import {
    ANIME_MEDIA_FORMAT_DISPLAY_VALUE_TO_PARAM_OBJECT,
    type AnimeMediaFormatParamType
} from "@/features/animeSearch/animeMediaFormats";
import {useParamToDisplayValue} from "@/features/animeSearch/useParamToDisplayValue";

interface AnimeCardProps {
    title: string;
    imageUrl: string | null;
    score: number | null;
    mediaFormatParam: AnimeMediaFormatParamType;
    airDate: string | null;
}

export function AnimeCard({title, imageUrl, score, mediaFormatParam, airDate}: AnimeCardProps) {

    const mediaFormatLabel = useParamToDisplayValue(
        mediaFormatParam,
        ANIME_MEDIA_FORMAT_DISPLAY_VALUE_TO_PARAM_OBJECT
    );

    // Replace generic "All" with N/A
    const mediaFormatDisplayValue = mediaFormatParam === null ? "N/A" : mediaFormatLabel;

    return (
        <div className={`anime-card`}>
            {title}
            {imageUrl}
            {score}
            {mediaFormatDisplayValue}
            {airDate}
        </div>
    )
}

export default AnimeCard;