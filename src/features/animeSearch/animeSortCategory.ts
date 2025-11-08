export const ANIME_SORT_CATEGORY_DISPLAY_VALUE_TO_PARAM_OBJECT = {
    "MAL ID": "mal_id",
    "Title": "title",
    "Start Date": "start_date",
    "End Date": "end_date",
    "Episodes": "episodes",
    "Score": "score",
    "Scored By": "scored_by",
    "Rank": "rank",
    "Popularity": "popularity",
    "Members": "members",
    "Favorites": "favorites",
} as const;

export type AnimeSortCategoryLabelType = keyof typeof ANIME_SORT_CATEGORY_DISPLAY_VALUE_TO_PARAM_OBJECT;
export type AnimeSortCategoryParamType = typeof ANIME_SORT_CATEGORY_DISPLAY_VALUE_TO_PARAM_OBJECT[AnimeSortCategoryLabelType];
export type DefinedAnimeSortCategoryParamType = AnimeSortCategoryParamType;

export function getAnimeSortCategoryParamFromLabel(label: AnimeSortCategoryLabelType): AnimeSortCategoryParamType {
    return ANIME_SORT_CATEGORY_DISPLAY_VALUE_TO_PARAM_OBJECT[label];
}

export function getAnimeSortCategoryLabelFromParam(param: DefinedAnimeSortCategoryParamType): AnimeSortCategoryLabelType {
    for (const [label, value] of Object.entries(ANIME_SORT_CATEGORY_DISPLAY_VALUE_TO_PARAM_OBJECT)) {
        if (value === param) return label as AnimeSortCategoryLabelType;
    }
    throw new Error(`Invalid anime sort category param: ${param}`);
}
