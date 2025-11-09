import FilterDropdown from "@/components/AnimeHomePage/FilterDropdown";
import {useAppDispatch, useAppSelector} from "@/store/hooks";
import {ANIME_AIRING_STATUS_DISPLAY_VALUE_TO_PARAM_OBJECT} from "@/features/animeSearch/animeAiringStatus";
import {ANIME_AUDIENCE_RATING_DISPLAY_VALUE_TO_PARAM_OBJECT} from "@/features/animeSearch/animeAudienceRating";
import {ANIME_MEDIA_FORMAT_DISPLAY_VALUE_TO_PARAM_OBJECT} from "@/features/animeSearch/animeMediaFormats";
import {ANIME_SORT_CATEGORY_DISPLAY_VALUE_TO_PARAM_OBJECT} from "@/features/animeSearch/animeSortCategory";
import {ANIME_SORT_DIRECTION_DISPLAY_VALUE_TO_PARAM_OBJECT} from "@/features/animeSearch/animeSortDirection";
import {animeSearchActions} from "@/store/animeSearchSlice";

function AnimeSearchFilterDropdowns() {
    const dispatch = useAppDispatch();

    //TODO: Move Searchbar id its own component
    // Read current values from Redux store

    const airingStatus = useAppSelector((state) => state.animeSearch.airingStatus);
    const audienceRating = useAppSelector((state) => state.animeSearch.audienceRating);
    const mediaFormat = useAppSelector((state) => state.animeSearch.mediaFormat);
    const sortCategory = useAppSelector((state) => state.animeSearch.sortCategory);
    const sortDirection = useAppSelector((state) => state.animeSearch.sortDirection);



    return (
        <div className={`flex gap-4`}>


            <FilterDropdown
                label="Airing Status"
                paramValue={airingStatus}
                displayValueToParamObject={ANIME_AIRING_STATUS_DISPLAY_VALUE_TO_PARAM_OBJECT}
                onParamChange={(paramValue) => dispatch(animeSearchActions.setAiringStatus(paramValue))}
            />
            <FilterDropdown
                label="Maturity"
                paramValue={audienceRating}
                displayValueToParamObject={ANIME_AUDIENCE_RATING_DISPLAY_VALUE_TO_PARAM_OBJECT}
                onParamChange={(paramValue) => dispatch(animeSearchActions.setAudienceRating(paramValue))}
            />
            <FilterDropdown
                label="Format"
                paramValue={mediaFormat}
                displayValueToParamObject={ANIME_MEDIA_FORMAT_DISPLAY_VALUE_TO_PARAM_OBJECT}
                onParamChange={(paramValue) => dispatch(animeSearchActions.setMediaFormat(paramValue))}
            />
            <FilterDropdown
                label="Order"
                paramValue={sortCategory}
                displayValueToParamObject={ANIME_SORT_CATEGORY_DISPLAY_VALUE_TO_PARAM_OBJECT}
                onParamChange={(paramValue) => dispatch(animeSearchActions.setSortCategory(paramValue))}
                showOnlyParams={["title","episodes","start_date", "end_date", "score", "rank", "popularity"]}
            />
            <FilterDropdown
                label="Direction"
                paramValue={sortDirection}
                displayValueToParamObject={ANIME_SORT_DIRECTION_DISPLAY_VALUE_TO_PARAM_OBJECT}
                onParamChange={(paramValue) => dispatch(animeSearchActions.setSortDirection(paramValue))}
            />
            {/*<button*/}
            {/*    onClick={() => dispatch(animeSearchActions.resetFilters())}*/}
            {/*    className="w-full px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"*/}
            {/*>*/}
            {/*    Reset Filters*/}
            {/*</button>*/}
        </div>
    )
}

export default AnimeSearchFilterDropdowns;