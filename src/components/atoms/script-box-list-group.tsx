import { cn } from "@/lib/utils";

type ScriptBoxListGroupProps = {
    children: React.ReactNode;
    className?: string;
};

export default function ScriptBoxListGroup({
    children,
    className
}: ScriptBoxListGroupProps) {
    return (
        <div className={cn("flex items-center w-full gap-2 text-sm", className)}>
            <div className="text-white text-center basis-1/3">Бокс, №</div>
            {children}
        </div>
    );
}
