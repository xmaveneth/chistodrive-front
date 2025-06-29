import logo from '@/assets/images/home/logo.webp';
import tgSvg from '@/assets/svgs/tg.svg?raw';
import vkSvg from '@/assets/svgs/vk.svg?raw';
import FooterSocial from '@/components/atoms/footer-social';
import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <footer className="primary-px pb-5 sm:pb-8 xl:pt-3.5 xl:pb-10">
            <nav
                aria-label="Основная навигация"
                className="flex items-center py-2 xs:px-4.5 px-3 sm:px-9 sm:py-3 mb-4 md:mb-0 justify-between rounded-full bg-input-bg text-xs sm:text-sm gap-1 sm:gap-3 xl:gap-6"
            >
                <Link
                    to="/"
                    className="shrink-0 w-22 sm:w-32.25 hidden xs:block"
                >
                    <img
                        src={logo}
                        alt="Chisto.drive логотип"
                        className="object-contain"
                    />
                </Link>

                <div className="flex items-center gap-1.5 xs:gap-2.5">
                    <FooterSocial url="" html={vkSvg} />
                    <FooterSocial url="" html={tgSvg} />
                </div>

                <div className="flex items-center gap-3 sm:gap-6 md:mr-auto">
                    <Link
                        to="/"
                        className="block hover:underline underline-offset-4"
                    >
                        О сервисе
                    </Link>
                    <Link
                        to="/rules"
                        className="block hover:underline underline-offset-4"
                    >
                        Правила сервиса
                    </Link>
                </div>

                <Link
                    to="/policy"
                    className="text-text-muted text-sm hidden lg:block mr-2 hover:underline underline-offset-4"
                >
                    Политика конфиденциальности
                </Link>

                <div
                    className="text-text-muted text-sm hidden md:block"
                    aria-hidden={true}
                >
                    ©2025 CHISTO.DRIVE
                </div>
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
