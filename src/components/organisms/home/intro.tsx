import { cards } from '@/lib/data/intro-card';
import intro from '@/assets/images/home/intro.webp';
import PrimaryBtn from '@/components/atoms/primary-btn';
import { MagnifyingGlassIcon } from '@heroicons/react/16/solid';

export default function Intro() {
    return (
        <section className="primary-px primary-py">
            <h2 className="uppercase text-2xl mb-4 sm:mb-5 sm:text-4xl">
                Как это <span className="text-btn-bg">работает</span>
            </h2>

            <p className="text-text-muted mb-5.5 sm:mb-7.5">
                Проект объединяет тысячи автомоек по всей России, позволяя
                пользователям находить ближайшие точки обслуживания, сравнить
                цены, читать отзывы и записываться на услуги в пару кликов
            </p>

            <div className="grid gap-4 mb-4 sm:gap-4.5 sm:mb-4.5 sm:grid-cols-2 xl:grid-cols-4">
                {cards.map((card, index) => (
                    <IntroCard
                        key={card.id}
                        step={index + 1}
                        content={card.text}
                    />
                ))}
            </div>

            <section className="p-4.5 rounded-xl border border-border text-sm md:text-base relative">
                <div className="text-btn-bg text-[0.5rem] sm:text-[0.625rem] mb-4 sm:mb-6">
                    [ Наш подход ]
                </div>
                <h2 className="uppercase text-2xl mb-4 sm:mb-5 sm:text-4xl xl:max-w-1/2 text-balance">
                    CHISTO.DRIVE — ЭТО НЕ ПРОСТО СЕРВИС,{' '}
                    <span className="text-btn-bg">
                        ЭТО СТАНДАРТ УХОДА ЗА АВТОМОБИЛЕМ
                    </span>
                </h2>

                <p className="text-text-muted mb-6 sm:mb-7 xl:mb-10">
                    Множество автовладельцов доверяют нашему сервису
                </p>

                <div className="mb-6 sm:mb-7 sm:mx-auto max-w-179 xl:absolute xl:w-3/5 xl:top-1/2 xl:-translate-y-1/2 xl:right-6.5 xl:-z-10">
                    <img src={intro} alt="Вид сбоку на серебристый спортивный автомобиль с чёрными дисками и задним спойлером" className='object-contain object-center w-full' />
                </div>

                <PrimaryBtn className="gap-2 mx-auto xl:ml-0 mb-2.5 xl:mb-4.5">
                    <MagnifyingGlassIcon className="size-5" />
                    Найти мойку
                </PrimaryBtn>
            </section>
        </section>
    );
}

type IntroCardProps = {
    step: number;
    content: string;
};

function IntroCard({ step, content }: IntroCardProps) {
    return (
        <section
            aria-labelledby={`step-${step}-title`}
            className="p-4.5 rounded-xl border border-border text-sm transition-colors duration-200 ease-in hover:border-btn-hover"
        >
            <div className="text-btn-bg mb-6 sm:mb-21" aria-hidden="true">
                {`0${step}`}
            </div>
            <h3 id={`step-${step}-title`} className="uppercase text-xl mb-4">
                {`ШАГ ${step}`}
            </h3>
            <p className="text-text-muted">{content}</p>
        </section>
    );
}
