import {StarIcon, TrendingUpIcon, FlameIcon, HeartIcon, UsersRoundIcon} from "lucide-react";
import StatContainer from "@/components/AnimeDetailsPage/StatContainer.tsx";

interface AnimeStatsProps {
    score: number | null;
    scoredBy: number | null;
    rank: number | null;
    popularity: number | null;
    members: number | null;
    favorites: number | null;
}

function AnimeStats({ score, scoredBy, rank, popularity, members, favorites }: AnimeStatsProps) {

    console.log(score)

    return (
        <div className={`w-full h-full p-8 bg-[#00000033] flex flex-col items-end gap-5`}>
            <div className={`w-full flex flex-col items-end`}>
                <div className={`text-5xl font-bold font-[Nunito] text-secondary-greyed-bright flex items-start justify-center`}>
                    {!score ? <p>No Score</p> :
                        <>
                            <span>{score}</span>
                            <StarIcon className={`inline w-11 h-11 ml-1 text-accent-base-bright`} fill={"currentColor"} />
                        </>
                    }
                </div>
                {
                    scoredBy && score &&
                    <p className={`block text-lg font-normal italic text-accent-greyed-standard mt-2`}>
                        by <span className={`font-bold text-accent-muted-standard`}>{scoredBy.toLocaleString()}</span> users
                    </p>
                }
            </div>
            <StatContainer label={"Rank"} icon={TrendingUpIcon} value={rank !== null ? `#${rank.toLocaleString()}` : "N/A"} />
            <StatContainer label={"Popularity"} icon={FlameIcon} value={popularity !== null ? `#${popularity.toLocaleString()}` : "N/A"} />
            <StatContainer label={"Members"} icon={UsersRoundIcon} value={members !== null ? members.toLocaleString() : "N/A"} />
            <StatContainer label={"Favorites"} icon={HeartIcon} value={favorites !== null ? favorites.toLocaleString() : "N/A"} />

        </div>
    )
}

export default AnimeStats;