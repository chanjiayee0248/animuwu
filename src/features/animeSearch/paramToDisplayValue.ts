export function paramToDisplayValue<T extends Record<string, string | number | null>>(
    currentParamValue: T[keyof T],
    displayValueToParamObject: T
): keyof T {
    const entry = Object.entries(displayValueToParamObject).find(
        ([, paramValue]) => paramValue === currentParamValue
    );

    return (entry ? entry[0] : Object.keys(displayValueToParamObject)[0]) as keyof T;
}
