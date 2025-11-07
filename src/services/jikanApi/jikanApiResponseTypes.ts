// =========================
// Anime Images
// =========================
export interface JikanResponseAnimeImageSetInterface {
    image_url: string | null;
    small_image_url: string | null;
    large_image_url: string | null;
}

export interface JikanResponseAnimeImagesInterface {
    jpg: JikanResponseAnimeImageSetInterface;
    webp: JikanResponseAnimeImageSetInterface;
}

// =========================
// Trailer
// =========================
export interface JikanResponseAnimeTrailerInterface {
    youtube_id: string | null;
    url: string | null;
    embed_url: string | null;
}

// =========================
// Titles
// =========================
export interface JikanResponseAnimeTitleInterface {
    type: string;
    title: string;
}

// =========================
// Dates / Airing
// =========================
export interface JikanResponseAnimeDatePropInterface {
    day: number | null;
    month: number | null;
    year: number | null;
}

export interface JikanResponseAnimeDateRangeInterface {
    from: JikanResponseAnimeDatePropInterface;
    to: JikanResponseAnimeDatePropInterface;
    string: string | null;
}

// =========================
// Broadcast
// =========================
export interface JikanResponseAnimeBroadcastInterface {
    day: string | null;
    time: string | null;
    timezone: string | null;
    string: string | null;
}

// =========================
// MAL URL Resource
// =========================
export interface JikanResponseAnimeMalUrlResourceInterface {
    mal_id: number;
    type: string;
    name: string;
    url: string;
}

// =========================
// Single Anime Object
// =========================
export interface JikanResponseAnimeSingleItemInterface {
    mal_id: number;
    url: string;
    images: JikanResponseAnimeImagesInterface;
    trailer: JikanResponseAnimeTrailerInterface;
    approved: boolean;
    titles: JikanResponseAnimeTitleInterface[];
    type: "TV" | "OVA" | "Movie" | "Special" | "ONA" | "Music" | null;
    source: string | null;
    episodes: number | null;
    status: "Finished Airing" | "Currently Airing" | "Not yet aired" | null;
    airing: boolean;
    aired: JikanResponseAnimeDateRangeInterface;
    duration: string | null;
    rating:
        | "G - All Ages"
        | "PG - Children"
        | "PG-13 - Teens 13 or older"
        | "R - 17+ (violence & profanity)"
        | "R+ - Mild Nudity"
        | "Rx - Hentai"
        | null;
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
    broadcast: JikanResponseAnimeBroadcastInterface;
    producers: JikanResponseAnimeMalUrlResourceInterface[];
    licensors: JikanResponseAnimeMalUrlResourceInterface[];
    studios: JikanResponseAnimeMalUrlResourceInterface[];
    genres: JikanResponseAnimeMalUrlResourceInterface[];
    explicit_genres: JikanResponseAnimeMalUrlResourceInterface[];
    themes: JikanResponseAnimeMalUrlResourceInterface[];
    demographics: JikanResponseAnimeMalUrlResourceInterface[];
}

// =========================
// Pagination
// =========================
export interface JikanResponseAnimePaginationItemsInterface {
    count: number;
    total: number;
    per_page: number;
}

export interface JikanResponseAnimePaginationInterface {
    last_visible_page: number;
    has_next_page: boolean;
    current_page: number;
    items: JikanResponseAnimePaginationItemsInterface;
}

// =========================
// Full API Response
// =========================
export interface JikanResponseAnimeFullInterface {
    data: JikanResponseAnimeSingleItemInterface[];
    pagination: JikanResponseAnimePaginationInterface;
}
