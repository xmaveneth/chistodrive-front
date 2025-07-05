import { FavouriteCarWash } from '@/lib/types/user';
import { MapPinIcon, XMarkIcon } from '@heroicons/react/16/solid';
import { Link } from 'react-router-dom';

type FavouriteCarwashProps = {
    carwash: FavouriteCarWash;
    deleteCarwash: () => void;
};

export function FavouriteCarwash({
    carwash,
    deleteCarwash,
}: FavouriteCarwashProps) {
    return (
        <article className="w-full text-left px-3 py-3 pl-6 bg-input-bg flex items-center flex-col xs:flex-row justify-between gap-3 sm:gap-5 rounded-2xl">
            <Link to={`../../carwash/${carwash.car_wash_id}`} className="flex-1 break-word cursor-pointer">
                <div className="mb-1 md:text-lg text-center xs:text-left">
                    {carwash.car_wash_name}
                </div>
                <p className="flex items-start gap-1 mb-2.5 text-xs sm:text-sm text-white/70 break-word">
                    <MapPinIcon className="size-4 shrink-0 xs:mt-1 text-btn-bg" />
                    {carwash.location && carwash.location}
                </p>
            </Link>
            <div className="flex items-center basis-1/3 justify-end">
                <button
                    onClick={deleteCarwash}
                    className="shrink-0 aspect-square p-1 rounded-full bg-background cursor-pointer transition-all duration-200 ease-in block hover:bg-zinc-700/60 hover:scale-105 focus-within:scale-110"
                >
                    <XMarkIcon className="size-4" />{' '}
                </button>
            </div>
        </article>
    );
}
