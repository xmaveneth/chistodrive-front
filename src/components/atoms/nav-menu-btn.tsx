import { cn } from '@/lib/utils';

type NavMenuBtnProps = {
    isActive: boolean,
    children: React.ReactNode;
    className?: string;
    onClick: () => void;
};
export default function NavMenuBtn({
    isActive,
    children,
    className,
    onClick
}: NavMenuBtnProps) {

    return (
        <button
            onClick={onClick}
            className={cn(
                'cursor-pointer border-b pb-4 flex-1 text-center text-sm transition-colors ease-in duration-200 sm:text-base xl:text-lg',
                isActive ? 'border-white text-white' : 'border-text-muted text-text-muted hover:text-zinc-300 hover:border-zinc-300', className
            )}
        >
            {children}
        </button>
    );
}
