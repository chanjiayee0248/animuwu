export function tryDisableUrlEmbedAutoplay(url: string): string {
    try {
        const u = new URL(url);
        u.searchParams.set("autoplay", "0"); // force autoplay off
        return u.toString();
    } catch {
        return url; // fallback
    }
}