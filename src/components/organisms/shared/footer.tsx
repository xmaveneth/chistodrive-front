import logo from '@/assets/images/home/logo.webp';
import tgSvg from '@/assets/svgs/tg.svg?raw';
import vkSvg from '@/assets/svgs/vk.svg?raw';
import FooterSocial from '@/components/atoms/footer-social';
import { EnvelopeIcon } from '@heroicons/react/24/solid';
import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <footer className="primary-px pb-5 sm:pb-8 xl:pt-3.5 xl:pb-10">
            <nav
                aria-label="Основная навигация"
                className="space-y-3 xs:space-y-4 lg:space-y-6 xl:space-y-8 py-4 px-6 sm:py-4.5 md:py-6 md:px-8 mb-4 md:mb-0 xl:py-10 xl:px-10 rounded-3xl bg-input-bg text-xs xs:text-sm md:text-base xl:text-lg"
            >
                <FooterTop />

                <FooterBottom />
            </nav>

            <div
                className="text-text-muted text-sm text-center md:hidden"
                aria-hidden={true}
            >
                ©2025 CHISTO.DRIVE
            </div>
        </footer>
    );
}

function FooterTop() {
    return (
        <div className="flex items-center flex-wrap gap-4 xs:gap-6 lg:justify-between">
            <Link
                to="/"
                className="shrink-0 w-32 xs:w-42.25 md:w-60 xl:w-80"
            >
                <img
                    src={logo}
                    alt="Chisto.drive логотип"
                    className="object-contain"
                />
            </Link>

            <div className="flex items-center gap-1.5 xs:gap-2.5 ml-auto lg:order-2 lg:ml-0 lg:basis-full xl:mt-3">
                <FooterSocial
                    url="https://vk.com/chisto.drive"
                    html={vkSvg}
                />
                <FooterSocial
                    url="https://t.me/chisto_drive"
                    html={tgSvg}
                />
            </div>
            <div className="flex items-center gap-3 xs:gap-6 md:gap-8 basis-full lg:basis-auto">
                <Link
                    to="/rules"
                    className="block hover:underline underline-offset-4"
                >
                    Пользовательское соглашение
                </Link>
                <Link
                    to="/"
                    className="hover:underline underline-offset-4 whitespace-nowrap"
                >
                    О сервисе
                </Link>
            </div>

            <div
                className="text-text-muted text-sm hidden lg:block lg:text-lg"
                aria-hidden={true}
            >
                ©2025 CHISTO.DRIVE
            </div>
        </div>
    );
}

function FooterBottom() {
    return (
        <div className="flex lg:flex-row lg:items-center lg:justify-between flex-col gap-3 xs:gap-4 text-text-muted">
            <div className="">
                ИП Голованов Кирилл Антонович <br /> ОГРНИП 325565800075437 / ИНН
                561011278636
            </div>

            <div className="">
                <Link
                    to="/policy"
                    className="text-text-muted hover:underline underline-offset-4"
                >
                    Политика конфиденциальности
                </Link>
            </div>

            <div>
                <a
                    href="mailto:chisto.drive@yandex.ru"
                    target='_blank'
                    className="flex items-center gap-2 hover:underline underline-offset-4"
                >
                    <EnvelopeIcon className="text-btn-bg size-4 xs:size-5" />
                    chisto.drive@yandex.ru
                </a>
            </div>
        </div>
    );
}
