import type {LucideIcon} from "lucide-react";

interface StatContainerProps {
    label: string;
    value: string | number | null;
    icon: LucideIcon
}

function StatContainer({label, value, icon: Icon}: StatContainerProps) {
    return (
        <div className={`w-full p-2 flex items-center gap-4 bg-neutral-800 rounded-md`}>
            <div className={`p-2 bg-secondary-muted-medium border-2 border-neutral-400 rounded-md`}>
                <Icon color={"white"} width={`1.75rem`} height={`1.75rem`} />
            </div>
            <div className={`flex flex-col`}>
                <span className={`text-secondary-muted-bright text-sm`}>{label}</span>
                <span className={`text-neutral-300 font-semibold text-lg`}>{value ?? "N/A"}</span>
            </div>
        </div>
    )
}

export default StatContainer;