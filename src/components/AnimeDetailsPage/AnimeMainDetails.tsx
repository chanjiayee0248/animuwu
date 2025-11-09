import {Link} from "react-router-dom";
import {ClockIcon} from "lucide-react";
import {useEffect, useRef, useState} from "react";
import {placeholderImage} from "@/assets/img";

interface AnimeMainDetailsProps {
    englishTitle: string;
    defaultTitle: string;
    japaneseTitle: string;
    imageUrl: string | null;
    mediaType: string | null;
    maturityRating: string | null;
    season: string | null;
    year: number | null;
    episodeCount: number | null;
    episodeDuration: string | null;
    airingStatus: string | null;
    genres: string[];
}

function AnimeMainDetails({
                              englishTitle,
                              defaultTitle,
                              japaneseTitle,
                              imageUrl,
                              mediaType,
                              maturityRating,
                              season,
                              year,
                              episodeCount,
                              episodeDuration,
                              airingStatus,
                              genres
                          }: AnimeMainDetailsProps) {

    const hasDisplayTime = season || year;
    const hasEpisodeCountAndDuration = episodeCount && episodeDuration;
    const tagStyle = "block rounded-full px-3 py-0.5 font-bold font-[Nunito]"

    const genresRef = useRef<HTMLUListElement | null>(null);
    const [genresHeight, setGenresHeight] = useState<number>(0);

    useEffect(() => {
        const el = genresRef.current;
        if (!el) return;

        // Measure once immediately
        setGenresHeight(el.offsetHeight);

        // Watch for resizes of that element
        const observer = new ResizeObserver((entries) => {
            for (const entry of entries) {
                const target = entry.target as HTMLElement;
                setGenresHeight(target.offsetHeight);
            }
        });

        observer.observe(el);

        // Cleanup on unmount
        return () => observer.disconnect();
    }, []); // runs only once — genres don’t change

    return (
        <div className={`relative w-full flex justify-center`}>
            <div className={`absolute inset-0 bg-primary-muted-dark-translucent`} style={{bottom: genresHeight}}/>
            <div className={`relative max-w-[1100px] w-full px-4`}>
                <Link to={`/`} className={``}>
                    <button className={`py-4 text-2xl hover:brightness-150 active:brightness-80 font-bold font-[Nunito]`}>
                        {`< Home`}
                    </button>
                </Link>
                <div className={`w-full px-4 flex gap-12 items-end`}>
                    <img className={`object-cover aspect-9/14 rounded-md w-[240px]`} src={imageUrl || placeholderImage}/>
                    <div className={`w-full flex flex-col gap-4`}>
                        <div className={`flex gap-4`}>
                            <p className={`${tagStyle} bg-accent-base-standard text-accent-base-dark`}>{mediaType}</p>
                            <p className={`${tagStyle} bg-secondary-base-standard text-secondary-base-dark`}>{maturityRating}</p>
                        </div>
                        <div className={`flex flex-col gap-1`}>
                            <h1 className={`text-4xl font-bold text-white`}>{englishTitle}</h1>
                            <h2 className={`text-2xl font-semibold italic text-primary-base-bright`}>{defaultTitle}</h2>
                            <h3 className={`text-xl italic text-secondary-muted-standard`}>{japaneseTitle}</h3>
                        </div>
                        <div className={`flex flex-wrap gap-2 text-md`}>
                            <div className={`flex gap-2 items-center`}>
                                <ClockIcon className={`w-4 h-4 text-accent-muted-standard`}/>
                                <p>{season} {year} {!hasDisplayTime && "N/A"}</p>
                            </div>
                            <p>|</p>
                            <p>{episodeCount} episodes</p>
                            {hasEpisodeCountAndDuration && <p>•</p>}
                            <p>{episodeDuration} </p>
                            {airingStatus && <p>|</p>}
                            <p>{airingStatus}</p>
                        </div>
                        <ul className={`flex flex-wrap gap-2 py-4`} ref={genresRef}>
                            {genres.map((genre) => (
                                <li key={genre} className={`px-3 py-1 font-medium rounded-xl text-sm
                                text-primary-muted-bright
                                bg-primary-base-medium-translucent `}>
                                    {genre}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AnimeMainDetails;
