import type {LucideIcon} from "lucide-react";

interface StatContainerProps {
    label: string;
    value: string | number | null;
    icon: LucideIcon
}

function StatContainer({label, value, icon: Icon}: StatContainerProps) {
    return (
        <div className={`w-full p-2 flex items-center gap-4 bg-neutral-800 rounded-md
        max-md:gap-2 max-md:p-1`}>
            <div className={`p-2 bg-secondary-muted-medium border-2 border-neutral-500 rounded-md w-12 h-12
            max-md:p-1 max-md:w-8 max-md:h-8 flex items-center justify-center`}>
                <Icon color={"white"} />
            </div>
            <div className={`flex flex-col`}>
                <span className={`text-secondary-muted-bright text-sm max-md:text-xs`}>{label}</span>
                <span className={`text-neutral-300 font-semibold text-lg max-md:text-sm`}>{value ?? "N/A"}</span>
            </div>
        </div>
    )
}

export default StatContainer;