import { useMemo } from 'react';

/**
 * Converts a param value back to its label for display in dropdown
 * Like a reverse lookup: given "airing", returns "Airing"
 */
export function useParamToDisplayValue<T extends Record<string, string | number | null>>(
    currentParamValue: T[keyof T],
    displayValueToParamObject: T
): keyof T {
    return useMemo(() => {
        // Find the label that matches the current param value
        const entry = Object.entries(displayValueToParamObject).find(
            ([, paramValue]) => paramValue === currentParamValue
        );

        // Return the label, or default to first key if not found
        return (entry ? entry[0] : Object.keys(displayValueToParamObject)[0]) as keyof T;
    }, [displayValueToParamObject, currentParamValue]);
}