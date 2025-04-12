import { City } from '@/lib/types/city';
import { cn } from '@/lib/utils/cn';
import { CheckIcon } from '@heroicons/react/16/solid';

type CityListItemProps = {
    city: City;
    isCurrent?: boolean;
    select: (city: City) => void;
};

export default function CityListItem({
    city,
    isCurrent = false,
    select,
}: CityListItemProps) {
    return (
        <li>
            <button
                onClick={() => select(city)}
                type="button"
                name="выбрать город"
                value={city.ru_name}
                className={cn(
                    'flex items-center justify-between rounded-full cursor-pointer py-2 hover:underline w-full px-3',
                    isCurrent && 'bg-input-bg'
                )}
            >
                {city.ru_name}
                {isCurrent && <CheckIcon className="shrink-0 size-4" />}
            </button>
        </li>
    );
}
