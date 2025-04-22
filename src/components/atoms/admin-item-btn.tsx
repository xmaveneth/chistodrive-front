import { cn } from '@/lib/utils';

type AdminItemBtnProps = {
    children: React.ReactNode;
    onClick: () => void;
    className?: string;
    disabled?: boolean;
};
export default function AdminItemBtn({
    children,
    onClick,
    className,
    disabled = false
}: AdminItemBtnProps) {
    return (
        <button
            className={cn(
                'bg-lightest-bg py-2 px-4 flex items-center gap-2 rounded-full cursor-pointer transition-scale duration-250 ease-in hover:scale-110',
                className
            )}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    );
}
