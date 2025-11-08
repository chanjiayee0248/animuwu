import {useParamToDisplayValue} from "@/features/animeSearch/useParamToDisplayValue";
// T is a generic type parameter — like a function argument, but for types
// This interface can work with any type `T` that is an object
// "number" in case we want to work with numeric values (like stars or scores)
interface FilterDropdownProps<T extends Record<string, string | number | null>> {
    label: string; // The label that will appear above the dropdown (like "Airing Status")
    paramValue: T[keyof T];
    displayValueToParamObject: T; // An object mapping labels (keys) to actual values (parameters)
    onParamChange: (paramValue: T[keyof T]) => void;
}

// Repeat "T" again because otherwise
//TypeScript says: “I don’t know what T is — it only exists inside the interface, not here.”
function FilterDropdown<T extends Record<string, string | number | null>>({
                                                               label,
                                                               paramValue,
                                                               displayValueToParamObject,
                                                               onParamChange,
                                                           }: FilterDropdownProps<T>) {

    const dropdownOptions = Object.keys(displayValueToParamObject);
    const paramDisplayValue = useParamToDisplayValue(displayValueToParamObject, paramValue);

    return (
        <div>

            <label className="block text-sm font-medium mb-1">{label}</label>
            <select
                className="w-full px-3 py-2 border rounded"
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
                    onParamChange(displayValueToParamObject[selectedLabel]); // call the parent function with the actual param paramValue
                }}
            >
                {dropdownOptions.map((optionLabel) => (
                    <option key={String(optionLabel)} value={String(optionLabel)}>
                        {String(optionLabel)}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default FilterDropdown;
