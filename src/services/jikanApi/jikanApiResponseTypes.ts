// =========================
// Anime Images
// =========================

export interface JikanAnimeImageSetInterface {
    image_url: string | null;
    small_image_url: string | null;
    large_image_url: string | null;
}

export interface JikanAnimeImagesInterface {
    jpg: JikanAnimeImageSetInterface;
    webp: JikanAnimeImageSetInterface;
}

// =========================
// Trailer
// =========================
export interface JikanAnimeTrailerInterface {
    youtube_id: string | null;
    url: string | null;
    embed_url: string | null;
}

// =========================
// Titles
// =========================
export interface JikanAnimeTitleInterface {
    type: string;
    title: string;
}

// =========================
// Dates / Airing
// =========================
export interface JikanAnimeDatePropInterface {
    day: number | null;
    month: number | null;
    year: number | null;
}

export interface JikanAnimeDateRangeInterface {
    from: JikanAnimeDatePropInterface;
    to: JikanAnimeDatePropInterface;
    // string: string | null; NO STRING! JIKAN DOCS ERROR!
}

// =========================
// Broadcast
// =========================
export interface JikanAnimeBroadcastInterface {
    day: string | null;
    time: string | null;
    timezone: string | null;
    string: string | null;
}

// =========================
// MAL URL Resource
// =========================
export interface JikanAnimeMalUrlResourceInterface {
    mal_id: number;
    type: string;
    name: string;
    url: string;
}

// =========================
// Single Anime Object
// =========================
export interface JikanAnimeSingleItemInterface {
    mal_id: number;
    url: string;
    images: JikanAnimeImagesInterface;
    trailer: JikanAnimeTrailerInterface;
    approved: boolean;
    titles: JikanAnimeTitleInterface[];
    type: "TV" | "OVA" | "Movie" | "Special" | "ONA" | "Music" | null;
    source: string | null;
    episodes: number | null;
    status: "Finished Airing" | "Currently Airing" | "Not yet aired" | null;
    airing: boolean;
    aired: { from: string | null; to: string | null; prop: JikanAnimeDateRangeInterface; string: string | null };
    duration: string | null;
    rating: "G - All Ages" | "PG - Children" | "PG-13 - Teens 13 or older" | "R - 17+ (violence & profanity)" | "R+ - Mild Nudity" | "Rx - Hentai" | null;
    score: number | null;
    scored_by: number | null;
    rank: number | null;
    popularity: number | null;
    members: number | null;
    favorites: number | null;
    synopsis: string | null;
    background: string | null;
    season: "summer" | "winter" | "spring" | "fall" | null;
    year: number | null;
    broadcast: JikanAnimeBroadcastInterface;
    producers: JikanAnimeMalUrlResourceInterface[];
    licensors: JikanAnimeMalUrlResourceInterface[];
    studios: JikanAnimeMalUrlResourceInterface[];
    genres: JikanAnimeMalUrlResourceInterface[];
    explicit_genres: JikanAnimeMalUrlResourceInterface[];
    themes: JikanAnimeMalUrlResourceInterface[];
    demographics: JikanAnimeMalUrlResourceInterface[];
}

// =========================
// Pagination
// =========================
export interface JikanAnimePaginationItemsInterface {
    count: number;
    total: number;
    per_page: number;
}

export interface JikanAnimePaginationInterface {
    last_visible_page: number;
    has_next_page: boolean;
    current_page: number;
    items: JikanAnimePaginationItemsInterface;
}

// =========================
// Full API Response
// =========================
export interface JikanAnimeSearchResponseInterface {
    data: JikanAnimeSingleItemInterface[];
    pagination: JikanAnimePaginationInterface;
}

export interface JikanAnimeLookupResponseInterface {
    data: JikanAnimeSingleItemInterface;
}
