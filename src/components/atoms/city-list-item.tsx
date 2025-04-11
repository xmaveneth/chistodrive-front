import { City } from '@/lib/types/city';
import { CheckIcon } from '@heroicons/react/16/solid';
import clsx from 'clsx';

type CityListItemProps = {
    city: City;
    isCurrent?: boolean;
    select: (city: City) => void;
};

export default function CityListItem({ city, isCurrent = false, select }: CityListItemProps) {
    return (
        <li
            onClick={() => select(city)}
            className={clsx(
                'flex items-center justify-between cursor-pointer py-2 hover:underline px-3',
                isCurrent && 'bg-input-bg rounded-full'
            )}
        >
            {city.ru_name}
            {isCurrent && <CheckIcon className="shrink-0 size-4" />}
        </li>
    );
} 