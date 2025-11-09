// Small type-guard to detect abort errors without using `any`
export function isAbortError(err: unknown): err is DOMException {
    // Prefer the DOMException instance check when available
    if (typeof DOMException !== 'undefined' && err instanceof DOMException) {
        return err.name === 'AbortError';
    }
    // Fallback: runtime check for an object with a `name` property equal to 'AbortError'
    return typeof err === 'object' && err !== null && 'name' in err && (err as Record<string, unknown>).name === 'AbortError';
}