import hero from '@/assets/images/home/hero.webp';
import PrimaryBtn from '@/components/atoms/primary-btn';
import { MagnifyingGlassIcon } from '@heroicons/react/16/solid';
import Navbar from '@/components/molecules/home/navbar';
import Logo from '@/components/atoms/logo';

export default function Hero() {
    return (
        <section
            style={{ backgroundImage: `url(${hero})` }}
            className="primary-px pt-4 md:pt-6.5 bg-cover bg-no-repeat bg-center pb-1 relative z-10"
            aria-label="Начало страницы — Chisto.drive"
        >
            <span
                aria-hidden="true"
                className="absolute bg-hero-overlay inset-0 -z-10"
            ></span>

            <Navbar />

            <Logo className="w-80 mt-24 mb-5 sm:w-141.75 sm:mt-30.75 sm:mb-7.5 xl:w-201.5 xl:mb-9 xl:mt-32 block" />

            <p className="text-sm sm:text-base max-w-134 xl:text-lg xl:max-w-150">
                Это инновационный сервис, чтобы сделать процесс поиска и записи
                на автомойку максимально простым, быстрым и удобным
            </p>

            <PrimaryBtn
                route="/search"
                className="mt-7 mb-28 gap-2 sm:mt-10 sm:mb-36.25 xl:mt-9 xl:mb-30.25"
            >
                <MagnifyingGlassIcon className="size-5" />
                Найти мойку
            </PrimaryBtn>
        </section>
    );
}
