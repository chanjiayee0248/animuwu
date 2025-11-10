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


    return (
        <div className={`w-full h-full p-[8%] bg-[#00000033] flex flex-col items-end gap-5
        max-md:px-[4%] max-md:gap-4`}>
            <div className={`w-full flex flex-col items-end
            max-md:flex-row max-md:items-center max-md:justify-end max-md:gap-2`}>
                <div className={`text-5xl font-bold font-[Nunito] text-secondary-greyed-bright flex items-start justify-center
                max-md:text-3xl`}>
                    {!score ? <p>No Score</p> :
                        <>
                            <span>{score}</span>
                            <StarIcon className={`inline w-11 h-11 ml-1 text-accent-base-bright
                            max-md:w-7.5 max-md:h-7.5`} fill={"currentColor"} />
                        </>
                    }
                </div>
                {
                    scoredBy && score &&
                    <p className={`block text-lg font-normal italic text-accent-greyed-standard mt-2 max-sm:text-sm`}>
                        by <span className={`font-bold text-accent-muted-standard`}>{scoredBy.toLocaleString()}</span> users
                    </p>
                }
            </div>
            <div className={`w-full flex flex-col gap-3 
            max-md:grid max-md:gap-1.5 max-md:grid-cols-[repeat(auto-fit,minmax(120px,1fr)_minmax(100px,1fr))]`}>
                <StatContainer label={"Rank"} icon={TrendingUpIcon} value={rank !== null ? `#${rank.toLocaleString()}` : "N/A"} />
                <StatContainer label={"Popularity"} icon={FlameIcon} value={popularity !== null ? `#${popularity.toLocaleString()}` : "N/A"} />
                <StatContainer label={"Members"} icon={UsersRoundIcon} value={members !== null ? members.toLocaleString() : "N/A"} />
                <StatContainer label={"Favorites"} icon={HeartIcon} value={favorites !== null ? favorites.toLocaleString() : "N/A"} />
            </div>

        </div>
    )
}

export default AnimeStats;