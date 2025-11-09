export const ANIME_MEDIA_FORMAT_DISPLAY_VALUE_TO_PARAM_OBJECT = {
    "All Formats": null,
    "TV": "tv",
    "Movie": "movie",
    "OVA": "ova",
    "Special": "special",
    "ONA": "ona",
    "Music": "music",
    "Commercial": "cm",
    "Promotion": "pv",
    "TV Special": "tv_special",
} as const;

export type AnimeMediaFormatLabelType = keyof typeof ANIME_MEDIA_FORMAT_DISPLAY_VALUE_TO_PARAM_OBJECT;
export type AnimeMediaFormatParamType = typeof ANIME_MEDIA_FORMAT_DISPLAY_VALUE_TO_PARAM_OBJECT[AnimeMediaFormatLabelType];
export type DefinedAnimeMediaFormatParamType = Exclude<AnimeMediaFormatParamType, null>;

export function getAnimeMediaFormatParamFromLabel(label: AnimeMediaFormatLabelType): AnimeMediaFormatParamType {
    return ANIME_MEDIA_FORMAT_DISPLAY_VALUE_TO_PARAM_OBJECT[label];
}

// O(n) time complexity, fine for now, but possible refactor to use a reverse mapping if performance becomes an issue
export function getAnimeMediaFormatLabelFromParam(
    param: DefinedAnimeMediaFormatParamType
): AnimeMediaFormatLabelType {
    for (const [label, value] of Object.entries(ANIME_MEDIA_FORMAT_DISPLAY_VALUE_TO_PARAM_OBJECT)) {
        if (value === param) return label as AnimeMediaFormatLabelType;
    }
    throw new Error(`Invalid anime media format param: ${param}`);
}
