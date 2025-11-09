import type {JikanAnimeTitleInterface} from "@/services/jikanApi/api/jikanApiResponseTypes.ts";

export function getPreferredJikanAnimeTitle(titles: JikanAnimeTitleInterface[], language="english"): string {
    if (!titles || titles.length === 0) return 'Unknown Title';

    // Try to find the title in the preferred language
    const preferredTitle = titles.find(title => title.type.toLowerCase() === language.toLowerCase());
    if (preferredTitle) {
        return preferredTitle.title;
    }

    // Fallback to the default title
    const defaultTitle = titles.find(title => title.type.toLowerCase() === 'default');
    if (defaultTitle) {
        return defaultTitle.title;
    }

    // Fallback to the first available title
    return titles[0].title || 'Unknown Title';
}