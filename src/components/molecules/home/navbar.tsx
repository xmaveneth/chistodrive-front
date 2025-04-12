import logo from '@/assets/images/home/logo.webp';
import { Button } from '@headlessui/react';
import PrimaryBtn from '@/components/atoms/primary-btn';
import { UserIcon } from '@heroicons/react/16/solid';
import CitySelector from '@/components/molecules/shared/city-selector';
import { useAuthContext } from '@/lib/hooks/useAuthContext';

export default function Navbar() {
    const { toggleLoginDialog, toggleSignupDialog } = useAuthContext();

    return (
        <>
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

                <CitySelector />

                <div className="flex items-center gap-2 md:gap-4">
                    <Button
                        onClick={() => toggleSignupDialog(true)}
                        className="hidden md:block hover:underline underline-offset-4 cursor-pointer"
                    >
                        Регистрация
                    </Button>
                    <PrimaryBtn
                        onClick={() => toggleLoginDialog(true)}
                        className="py-2"
                    >
                        <UserIcon className="size-3" aria-hidden="true" />
                        Войти
                    </PrimaryBtn>
                </div>
            </nav>
        </>
    );
}
