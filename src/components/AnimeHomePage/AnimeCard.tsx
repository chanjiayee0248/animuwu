import {
    ANIME_MEDIA_FORMAT_DISPLAY_VALUE_TO_PARAM_OBJECT,
    type AnimeMediaFormatParamType
} from "@/features/animeSearch/animeMediaFormats";
import {paramToDisplayValue} from "@/features/animeSearch/paramToDisplayValue.ts";

interface AnimeCardProps {
    title: string;
    imageUrl: string | null;
    score: number | null;
    mediaFormatParam: AnimeMediaFormatParamType;
    airDateString: string | null;
    episodeCount: number | null;
}

export function AnimeCard({title, imageUrl, score, mediaFormatParam, airDateString, episodeCount}: AnimeCardProps) {

    // Replace generic "All" with N/A
    const mediaFormatDisplayValue = mediaFormatParam === null ? "N/A" : paramToDisplayValue(
        mediaFormatParam,
        ANIME_MEDIA_FORMAT_DISPLAY_VALUE_TO_PARAM_OBJECT
    );

    return (
        <div className={`anime-card`}>
            <div className={`anime-card-rating-container flex justify-center items-center text-sm font-[Nunito] font-bold bg-accent-base-bright `}>
                <p className={`text-accent-muted-dark`}>{score === null ? "N/A" : score }</p>
            </div>
            {/*{TODO: ACTUALLY FIND A PLACEHOLDER}*/}
            <img src={imageUrl ?? "./placeholder-image.png"} alt={title}
                 className={`anime-card-image object-cover aspect-3/4 w-full`} />
            <div className={`p-1 text-primary-muted-bright text-sm font-bold`}>
                <h3>{title}</h3>
                {score}
                {mediaFormatDisplayValue}
                {!(episodeCount === null) && `${episodeCount}EP`}
                {airDateString}
                {episodeCount}
            </div>

        </div>
    )
}

export default AnimeCard;