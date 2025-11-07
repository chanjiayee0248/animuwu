export const ANIME_AIRING_STATUS_LABEL_TO_PARAM_OBJECT = {
    "All": null,
    "Airing": "airing",
    "Completed": "complete",
    "Upcoming": "upcoming",
} as const;

export type AnimeAiringStatusLabelType = keyof typeof ANIME_AIRING_STATUS_LABEL_TO_PARAM_OBJECT;
export type AnimeAiringStatusParamType = typeof ANIME_AIRING_STATUS_LABEL_TO_PARAM_OBJECT[AnimeAiringStatusLabelType];
export type DefinedAnimeAiringStatusParamType = Exclude<AnimeAiringStatusParamType, null>;

export function getAnimeAiringStatusParamFromLabel(label: AnimeAiringStatusLabelType): AnimeAiringStatusParamType {
    return ANIME_AIRING_STATUS_LABEL_TO_PARAM_OBJECT[label];
}

export function getAnimeAiringStatusLabelFromParam(param: DefinedAnimeAiringStatusParamType): AnimeAiringStatusLabelType {
    for (const [label, value] of Object.entries(ANIME_AIRING_STATUS_LABEL_TO_PARAM_OBJECT)) {
        if (value === param) return label as AnimeAiringStatusLabelType;
    }
    throw new Error(`Invalid anime airing status param: ${param}`);
}