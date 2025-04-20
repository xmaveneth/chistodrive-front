import { cn } from '@/lib/utils';
import { Bookmark } from 'lucide-react';
import { BookmarkIcon } from '@heroicons/react/16/solid';

type AddFavouriteBtnProps = {
    className?: string;
    sizeClass?: string;
    isAdded: boolean;
    addClick: () => void;
    deleteClick: () => void;
    disabled?: boolean;
};

export default function AddFavouriteBtn({
    className,
    sizeClass,
    isAdded,
    addClick,
    deleteClick,
    disabled = false,
}: AddFavouriteBtnProps) {
    return (
        <button
            disabled={disabled}
            onClick={isAdded ? deleteClick : addClick}
            className={cn(
                'block p-1 rounded-full bg-input-bg cursor-pointer',
                className
            )}
        >
            {isAdded ? (
                <BookmarkIcon className={cn('text-btn-bg', sizeClass)} />
            ) : (
                <Bookmark className={cn('text-btn-bg', sizeClass)} />
            )}
        </button>
    );
}
