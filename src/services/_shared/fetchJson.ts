export async function fetchJson<T>(url: string, options?: RequestInit): Promise<T> {
    const response = await fetch(url, options);
    if (!response.ok){
        throw new Error(`Failed to fetch: ${response.status} - ${response.statusText}`);
    }
    return await response.json() as T;
}
