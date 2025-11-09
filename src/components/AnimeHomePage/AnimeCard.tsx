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

    let mediaFormatDisplayValue = mediaFormatParam === null
        ? "N/A"
        : useParamToDisplayValue(mediaFormatParam, ANIME_MEDIA_FORMAT_DISPLAY_VALUE_TO_PARAM_OBJECT)

    return (
        <div>
            {title}
            {imageUrl}
            {score}
            {mediaFormatDisplayValue}
            {airDate}
        </div>
    )
}