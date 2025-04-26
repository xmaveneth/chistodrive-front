import { cn } from '@/lib/utils';
import { PlusIcon } from '@heroicons/react/16/solid';

type AccountAddBtnProps = {
    onClick?: () => void;
    className?: string;
};

export default function AccountAddBtn({ onClick, className }: AccountAddBtnProps) {
    return (
        <button
            onClick={onClick}
            className={cn("rounded-full bg-input-bg p-1 mx-auto cursor-pointer transition-all duration-200 ease-in block hover:bg-zinc-700/60 hover:scale-105 focus-within:scale-110", className)}
        >
            <PlusIcon className="size-5 text-white" />
        </button>
    );
}
