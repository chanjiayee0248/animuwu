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

    //TODO: Move Searchbar to its own component
    // Read current values from Redux store
    const searchQuery = useAppSelector((state) => state.animeSearch.searchQuery);
    const airingStatus = useAppSelector((state) => state.animeSearch.airingStatus);
    const audienceRating = useAppSelector((state) => state.animeSearch.audienceRating);
    const mediaFormat = useAppSelector((state) => state.animeSearch.mediaFormat);
    const sortCategory = useAppSelector((state) => state.animeSearch.sortCategory);
    const sortDirection = useAppSelector((state) => state.animeSearch.sortDirection);



    return (
        <div className="space-y-4">
            {/* Search Query Input */}
            <div>
                <label className="block text-sm font-medium mb-1">Search</label>
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => dispatch(animeSearchActions.setSearchQuery(e.target.value))}
                    placeholder="Search anime..."
                    className="w-full px-3 py-2 border rounded"
                />
            </div>

            {/* Airing Status Dropdown */}
            <FilterDropdown
                label="Airing Status"
                paramValue={airingStatus}
                displayValueToParamObject={ANIME_AIRING_STATUS_DISPLAY_VALUE_TO_PARAM_OBJECT}
                onParamChange={(paramValue) => dispatch(animeSearchActions.setAiringStatus(paramValue))}
            />

            {/* Audience Rating Dropdown */}
            <FilterDropdown
                label="Audience Rating"
                paramValue={audienceRating}
                displayValueToParamObject={ANIME_AUDIENCE_RATING_DISPLAY_VALUE_TO_PARAM_OBJECT}
                onParamChange={(paramValue) => dispatch(animeSearchActions.setAudienceRating(paramValue))}
            />

            {/* Media Format Dropdown */}
            <FilterDropdown
                label="Media Format"
                paramValue={mediaFormat}
                displayValueToParamObject={ANIME_MEDIA_FORMAT_DISPLAY_VALUE_TO_PARAM_OBJECT}
                onParamChange={(paramValue) => dispatch(animeSearchActions.setMediaFormat(paramValue))}
            />

            {/* Sort Category Dropdown */}
            <FilterDropdown
                label="Sort By"
                paramValue={sortCategory}
                displayValueToParamObject={ANIME_SORT_CATEGORY_DISPLAY_VALUE_TO_PARAM_OBJECT}
                onParamChange={(paramValue) => dispatch(animeSearchActions.setSortCategory(paramValue))}
            />

            {/* Sort Direction Dropdown */}
            <FilterDropdown
                label="Direction"
                paramValue={sortDirection}
                displayValueToParamObject={ANIME_SORT_DIRECTION_DISPLAY_VALUE_TO_PARAM_OBJECT}
                onParamChange={(paramValue) => dispatch(animeSearchActions.setSortDirection(paramValue))}
            />

            {/* Reset Button */}
            <button
                onClick={() => dispatch(animeSearchActions.resetFilters())}
                className="w-full px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            >
                Reset Filters
            </button>
        </div>
    )
}

export default AnimeSearchFilterDropdowns;