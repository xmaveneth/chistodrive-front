import { cn } from "@/lib/utils";

type ScriptMenuBtnProps = {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
}
export default function ScriptMenuBtn({children, className, onClick}: ScriptMenuBtnProps) {
    return <button
            onClick={onClick}
            className={cn(
                'border py-1 rounded-sm cursor-pointer flex-1 text-center text-sm transition-colors ease-in duration-200 sm:text-base xl:text-lg border-text-muted text-text-muted hover:text-zinc-300 hover:border-zinc-300', className
            )}
        >
            {children}
        </button>
}