export const ANIME_AUDIENCE_RATING_DISPLAY_VALUE_TO_PARAM_OBJECT = {
    "All": null,
    "G - All Ages": "g",
    "PG - Children": "pg",
    "PG-13 - Teens 13+": "pg13",
    "R - 17+": "r17",
    "R+ - Mild Nudity": "r",
    "Rx - Explicit": "rx",
} as const;

export type AnimeAudienceRatingLabelType = keyof typeof ANIME_AUDIENCE_RATING_DISPLAY_VALUE_TO_PARAM_OBJECT;
export type AnimeAudienceRatingParamType = typeof ANIME_AUDIENCE_RATING_DISPLAY_VALUE_TO_PARAM_OBJECT[AnimeAudienceRatingLabelType];
export type DefinedAnimeAudienceRatingParamType = Exclude<AnimeAudienceRatingParamType, null>;

export function getAnimeAudienceRatingParamFromLabel(label: AnimeAudienceRatingLabelType): AnimeAudienceRatingParamType {
    return ANIME_AUDIENCE_RATING_DISPLAY_VALUE_TO_PARAM_OBJECT[label];
}

export function getAnimeAudienceRatingLabelFromParam(param: DefinedAnimeAudienceRatingParamType): AnimeAudienceRatingLabelType {
    for (const [label, value] of Object.entries(ANIME_AUDIENCE_RATING_DISPLAY_VALUE_TO_PARAM_OBJECT)) {
        if (value === param) return label as AnimeAudienceRatingLabelType;
    }
    throw new Error(`Invalid anime audience rating param: ${param}`);
}