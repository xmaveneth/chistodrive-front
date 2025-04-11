import logo from '@/assets/images/home/logo.webp';
import { Button } from '@headlessui/react';
import PrimaryBtn from '@/components/atoms/primary-btn';
import { MapPinIcon, UserIcon } from '@heroicons/react/16/solid';
import { useCityContext } from '@/lib/hooks/useCityContext';
import SelectCityModal from '@/components/molecules/home/select-city-modal';
import useClickOutside from '@/lib/hooks/useClickOutside';
import { useRef } from 'react';

export default function Navbar() {
    const { toggleCityList, currentCity, showCityList } = useCityContext();

    const modalRef = useRef<HTMLDivElement | null>(null);

    useClickOutside(modalRef, () => {
        if (showCityList) toggleCityList(false);
    });

    return (
        <nav
            aria-label="Основная навигация"
            className="flex relative items-center py-2 pr-2.5 pl-4.5 sm:py-2.5 sm:pr-5 sm:pl-9 justify-between rounded-full bg-background text-xs sm:text-sm gap-1"
        >
            <div className="shrink-0 w-22 sm:w-32.25 hidden sm:block">
                <img
                    src={logo}
                    alt="Chisto.drive логотип"
                    className="object-contain"
                />
            </div>

            <div ref={modalRef} className="sm:relative sm:mr-auto sm:ml-5 min-w-55 sm:min-w-70">
                <Button
                    onClick={() => toggleCityList()}
                    className="flex items-center gap-1.5 cursor-pointer"
                >
                    <MapPinIcon
                        className="size-4 sm:size-6 text-btn-bg shrink-0"
                        aria-hidden="true"
                    />
                    Ваш город: {currentCity.ru_name}
                    <span className="text-[0.5rem] md:text-[0.625rem] mt-0.5">
                        &#9660;
                    </span>
                </Button>

                <SelectCityModal />
            </div>

            <div className="flex items-center gap-2 md:gap-4">
                <Button className="hidden md:block hover:underline underline-offset-4 cursor-pointer">
                    Регистрация
                </Button>
                <PrimaryBtn className="py-2">
                    <UserIcon className="size-3" aria-hidden="true" />
                    Войти
                </PrimaryBtn>
            </div>
        </nav>
    );
}
