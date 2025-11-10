import {RefreshCcwIcon} from "lucide-react";
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

    const airingStatus = useAppSelector((state) => state.animeSearch.airingStatus);
    const audienceRating = useAppSelector((state) => state.animeSearch.audienceRating);
    const mediaFormat = useAppSelector((state) => state.animeSearch.mediaFormat);
    const sortCategory = useAppSelector((state) => state.animeSearch.sortCategory);
    const sortDirection = useAppSelector((state) => state.animeSearch.sortDirection);


    return (
        <div className={`flex flex-wrap gap-4 w-full justify-center items-center
            max-2xl:gap-3 max-md:gap-2 max-sm:gap-1`}>

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
                showOnlyParams={["episodes", "start_date", "end_date", "score", "rank", "popularity", "members", "favorites"]}
            />
            <FilterDropdown
                label="Direction"
                paramValue={sortDirection}
                displayValueToParamObject={ANIME_SORT_DIRECTION_DISPLAY_VALUE_TO_PARAM_OBJECT}
                onParamChange={(paramValue) => dispatch(animeSearchActions.setSortDirection(paramValue))}
            />
            <button
                onClick={() => dispatch(animeSearchActions.resetFilters())}
                className={`w-8 h-8 rounded-full bg-primary-muted-medium text-primary-muted-bright
                hover:brightness-130 hover:scale-110 active:brightness-80 active:scale-90 transition-filter duration-100
                p-1  max-md:w-6 max-md:h-6 max-md:p-[2px]`}
                aria-label={"Reset Filters"}
            >
                <RefreshCcwIcon className="w-full h-full p-0.5 hover:-rotate-100 transition-rotate duration-200" strokeWidth={2} />
            </button>
        </div>
    )
}

export default AnimeSearchFilterDropdowns;