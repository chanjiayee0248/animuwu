import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { jikanFetchAnimeById } from '@/services/jikanApi/api/jikanFetchAnimeById';
import type { JikanAnimeLookupResponseInterface } from "@/services/jikanApi/api/jikanApiResponseTypes.ts";
import { isAbortError } from '@/services/_shared/isAbortError.ts';

interface UseAnimeByIdReturn {
    loading: boolean;
    response: JikanAnimeLookupResponseInterface | null;
    error: string | null;
}

export function useAnimeById(animeId: string | undefined): UseAnimeByIdReturn {
    const navigate = useNavigate();

    const [loading, setLoading] = useState<boolean>(true);
    const [response, setResponse] = useState<JikanAnimeLookupResponseInterface | null>(null);
    const [error, setError] = useState<string | null>(null);

    const abortControllerRef = useRef<AbortController | null>(null);

    useEffect(() => {
        // Abort any previous request
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
        }

        // Create new AbortController for this request
        const abortController = new AbortController();
        abortControllerRef.current = abortController;

        async function fetchAnimeDetails() {
            setLoading(true);
            setError(null);
            setResponse(null);

            // Validate animeId exists
            if (!animeId) {
                setError('No id found in URL');
                setLoading(false);
                return;
            }

            // Validate animeId is a valid number
            const id = Number(animeId);
            if (!Number.isInteger(id) || id <= 0) {
                setError('Invalid anime id');
                setLoading(false);
                return;
            }

            try {
                const resp = await jikanFetchAnimeById(id, abortController.signal);
                setResponse(resp);
            } catch (err: unknown) {
                // Ignore abort errors - they're intentional
                if (isAbortError(err)) {
                    return;
                }

                const message = err instanceof Error ? err.message : String(err);

                // Detect 404 and navigate to not found page
                if (message.includes('404')) {
                    navigate('/404-not-found');
                    return;
                }

                setError(message || 'An error occurred while fetching anime details');
            } finally {
                setLoading(false);
            }
        }

        fetchAnimeDetails();

        // Cleanup: abort the request
        return () => {
            abortController.abort();
        };
    }, [animeId, navigate]);

    return {
        loading,
        response,
        error
    };
}