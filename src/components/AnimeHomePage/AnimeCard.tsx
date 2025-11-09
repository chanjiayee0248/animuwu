import {StarIcon, CalendarIcon} from "lucide-react";
import {Link} from "react-router-dom";

interface AnimeCardProps {
    id: string;
    title: string;
    imageUrl: string | null;
    score: number | null;
    mediaFormat: string | null;
    airDateString: string | null;
    episodeCount: number | null;
}

export function AnimeCard({id, title, imageUrl, score, mediaFormat, airDateString, episodeCount}: AnimeCardProps) {

    const airDate = airDateString ? new Date(airDateString) : null;
    const airDateYear = airDate ? airDate.getFullYear() : null;

    return (
        <Link to={`/anime/${id}`} className={`anime-card group overflow-hidden hover:scale-[1.04] active:scale-[0.98] transition-transform duration-100 ease-in-out`}>
            <div className={`anime-card-rating-container flex justify-center items-center text-sm font-[Nunito] font-bold bg-primary-base-dark text-accent-base-bright`}>
                {
                    score === null ?
                        <p>N/A</p>
                        :
                        <>
                            <StarIcon className={`inline w-3 h-3 mr-1 text-secondary-base-standard`} fill={"currentColor"}/>
                            <span className={`mt-[2px]`}>{score}</span>
                        </>
                }
            </div>
            {/*{TODO: ACTUALLY FIND A PLACEHOLDER}*/}
            <img src={imageUrl ?? "./placeholder-image.png"} alt={title}
                 loading="lazy"
                 className={`anime-card-image object-cover aspect-3/4 w-full transform transition-transform duration-200 ease-in-out group-hover:scale-[1.05]`} />
            <div className={`relative flex flex-col gap-1 p-2 text-primary-muted-bright text-sm font-bold bg-primary-muted-dark`}>
                <h3
                    className={
                        `max-w-[28ch h-[2lh] overflow-hidden whitespace-normal [display:-webkit-box] [-webkit-line-clamp:2] [-webkit-box-orient:vertical]`
                    }
                    title={title}
                >
                    {title}
                </h3>
                <div className={`flex justify-between items-center text-xs font-semibold text-primary-muted-standard`}>
                    <div className={`flex items-center gap-1`}>
                        <CalendarIcon className={`inline w-3 h-3 text-accent-muted-standard`} />
                        <p>{airDateYear}</p>
                    </div>
                    <p><span>{mediaFormat}</span> {!(episodeCount === null) && `| ${episodeCount}EP`}</p>
                </div>
            </div>

        </Link>
    )

}

export default AnimeCard;