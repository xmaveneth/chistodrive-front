import logo from '@/assets/images/home/logo.webp';
import { Button } from '@headlessui/react';
import PrimaryBtn from '@/components/atoms/primary-btn';
import { MapPinIcon, UserIcon } from '@heroicons/react/16/solid';

export default function Navbar() {
    return (
        <nav
            aria-label="Основная навигация"
            className="flex items-center py-2 pr-2.5 pl-4.5 sm:py-2.5 sm:pr-5 sm:pl-9 justify-between rounded-full bg-background text-xs sm:text-sm gap-1"
        >
            <div className="shrink-0 w-22 sm:w-32.25 hidden xs:block">
                <img
                    src={logo}
                    alt="Chisto.drive логотип"
                    className="object-contain"
                />
            </div>

            <div className="flex items-center gap-1.5">
                <MapPinIcon
                    className="size-4 text-btn-bg shrink-0"
                    aria-hidden="true"
                />
                Ваш город: Москва
            </div>

            <div className="flex items-center gap-2 md:gap-4">
                <Button className="hidden sm:block">Регистрация</Button>
                <PrimaryBtn className="py-2">
                    <UserIcon className="size-3" aria-hidden="true" />
                    Войти
                </PrimaryBtn>
            </div>
        </nav>
    );
}
