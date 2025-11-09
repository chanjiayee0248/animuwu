import {useParamToDisplayValue} from "@/features/animeSearch/useParamToDisplayValue";
// T is a generic type parameter — like a function argument, but for types
// This interface can work with any type `T` that is an object
// "number" in case we want to work with numeric values (like stars or scores)
interface FilterDropdownProps<T extends Record<string, string | number | null>> {
    label: string; // The label that will appear above the dropdown (like "Airing Status")
    paramValue: T[keyof T];
    displayValueToParamObject: T; // An object mapping labels (keys) to actual values (parameters)
    onParamChange: (paramValue: T[keyof T]) => void;
    showOnlyParams?: T[keyof T][];
}

// Repeat "T" again because otherwise
//TypeScript says: “I don’t know what T is — it only exists inside the interface, not here.”
function FilterDropdown<T extends Record<string, string | number | null>>({
                                                                              label,
                                                                              paramValue,
                                                                              displayValueToParamObject,
                                                                              onParamChange,
                                                                              showOnlyParams,
                                                                          }: FilterDropdownProps<T>) {
    // Compute dropdown options
    const allOptions = Object.keys(displayValueToParamObject) as (keyof T)[];
    const dropdownOptions = showOnlyParams
        ? allOptions.filter((key) => showOnlyParams.includes(displayValueToParamObject[key]))
        : allOptions;

    const paramDisplayValue = useParamToDisplayValue(paramValue, displayValueToParamObject);

    return (
        <div>
            <select
                aria-label={label}
                className={`w-full min-w-[12rem] pl-3 pr-4 py-1.5 rounded-lg
          bg-primary-muted-dark text-primary-muted-bright
          hover:bg-primary-muted-medium nth-of-type-2:bg-white`}
                value={String(paramDisplayValue)}
                onChange={(e) => {
                    const selectedLabel = e.target.value as keyof T;
                    if (!(selectedLabel in displayValueToParamObject)) {
                        if (process.env.NODE_ENV === "development") {
                            throw new Error("Unexpected dropdown label");
                        } else {
                            return;
                        }
                    }
                    onParamChange(displayValueToParamObject[selectedLabel]);
                }}
            >
                {dropdownOptions.map((optionLabel) => (
                    <option
                        key={String(optionLabel)}
                        value={String(optionLabel)}
                        className={`p-1 bg-primary-muted-superdark text-primary-muted-bright
              checked:bg-primary-muted-dark checked:text-white 
              hover:bg-secondary-muted-dark hover:text-secondary-muted-bright`}
                    >
                        {String(optionLabel) + " "}
                    </option>
                ))}
            </select>
        </div>
    );
}


export default FilterDropdown;
