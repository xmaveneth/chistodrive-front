import SelectCityModal from '@/components/molecules/home/select-city-modal';
import { useCityContext } from '@/lib/hooks/context/use-city-context';
import useClickOutside from '@/lib/hooks/utils/use-click-outside';
import { cn } from '@/lib/utils/cn';
import { Button } from '@headlessui/react';
import { MapPinIcon } from '@heroicons/react/16/solid';
import { useRef } from 'react';

type CitySelectorProps = {
    className?: string;
}

export default function CitySelector({className}: CitySelectorProps) {
    const { toggleCityList, currentCity, showCityList } = useCityContext();

    const modalRef = useRef<HTMLDivElement | null>(null);

    useClickOutside(modalRef, () => {
        if (showCityList) toggleCityList(false);
    });

    return (
        <div
            ref={modalRef}
            className={cn("sm:relative", className)}
        >
            <Button
                onClick={() => toggleCityList()}
                className="flex items-center gap-1.5 cursor-pointer text-sm sm:text-base"
            >
                <MapPinIcon
                    className="size-4 sm:size-6 text-btn-bg shrink-0"
                    aria-hidden="true"
                />
                <span className='hidden xs:inline'>Ваш город: </span>{currentCity.ru_name}
                <span
                    className={cn(
                        'text-[0.5rem] md:text-[0.625rem] mt-0.5 transition-transform ease-in-out duration-300',
                        showCityList && 'rotate-180'
                    )}
                >
                    &#9660;
                </span>
            </Button>

            <SelectCityModal />
        </div>
    );
}
