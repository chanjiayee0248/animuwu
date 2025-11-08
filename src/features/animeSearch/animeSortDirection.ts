export const ANIME_SORT_DIRECTION_DISPLAY_VALUE_TO_PARAM_OBJECT = {
    "Desc.": "desc",
    "Asc.": "asc",
} as const;

export type AnimeSortDirectionLabelType = keyof typeof ANIME_SORT_DIRECTION_DISPLAY_VALUE_TO_PARAM_OBJECT;
export type AnimeSortDirectionParamType = typeof ANIME_SORT_DIRECTION_DISPLAY_VALUE_TO_PARAM_OBJECT[AnimeSortDirectionLabelType];
export type DefinedAnimeSortDirectionParamType = AnimeSortDirectionParamType;

export function getAnimeSortDirectionParamFromLabel(label: AnimeSortDirectionLabelType): AnimeSortDirectionParamType {
    return ANIME_SORT_DIRECTION_DISPLAY_VALUE_TO_PARAM_OBJECT[label];
}

export function getAnimeSortDirectionLabelFromParam(param: DefinedAnimeSortDirectionParamType): AnimeSortDirectionLabelType {
    for (const [label, value] of Object.entries(ANIME_SORT_DIRECTION_DISPLAY_VALUE_TO_PARAM_OBJECT)) {
        if (value === param) return label as AnimeSortDirectionLabelType;
    }
    throw new Error(`Invalid anime sort direction param: ${param}`);
}