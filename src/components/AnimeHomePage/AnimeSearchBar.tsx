import {useAppDispatch, useAppSelector} from "@/store/hooks";
import {animeSearchActions} from "@/store/animeSearchSlice";

function AnimeSearchBar() {
    const searchQuery = useAppSelector((state) => state.animeSearch.searchQuery);
    const dispatch = useAppDispatch();
    return (
            <input
                id="anime-search"
                aria-label="Search anime"
                type="text"
                value={searchQuery}
                onChange={(e) => dispatch(animeSearchActions.setSearchQuery(e.target.value))}
                placeholder="Search anime..."
                className="w-full px-3 py-2 border rounded"
            />
    )
}

export default AnimeSearchBar;