import {useAppDispatch, useAppSelector} from "@/store/hooks";
import {animeSearchActions} from "@/store/animeSearchSlice";
import {SearchIcon} from "lucide-react";

function AnimeSearchBar() {
    const searchQuery = useAppSelector((state) => state.animeSearch.searchQuery);
    const dispatch = useAppDispatch();
    return (
        <div className={`w-full max-w-[800px] flex items-center gap-2 px-3 py-2 bg-primary-base-medium text-white rounded-3xl
        border-2 border-transparent focus-within:border-accent-base-bright-translucent transition-border duration-200
        max-xl:px-2 max-xl:py-1`}>
            <label htmlFor="anime-search-bar-input">
                <SearchIcon color={"white"} width={"1rem"}/>
            </label>
            <input
                id="anime-search-bar-input"
                aria-label="Search anime"
                type="text"
                value={searchQuery}
                onChange={(e) => dispatch(animeSearchActions.setSearchQuery(e.target.value))}
                placeholder="Search anime..."
                className={`w-full focus:outline-none placeholder-primary-muted-bright`}
            />
        </div>

    )
}

export default AnimeSearchBar;