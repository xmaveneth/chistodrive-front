import PrimaryBtn from '@/components/atoms/primary-btn';
import { CarWash } from '@/lib/types/admin';
import { getWeekdayShortName } from '@/lib/utils/get-weekday-short-names';

type CarwashInfoProps = {
    carwash: CarWash;
    onClick: () => void;
};

export default function CarwashInfo({ carwash, onClick }: CarwashInfoProps) {
    return (
        <div className="flex flex-col gap-8 mb-6 sm:mb-11 sm:flex-row sm:justify-between">
            <div className="space-y-2 sm:space-y-3 sm:order-2 sm:text-right">
                <p className="text-2xl font-medium sm:text-3xl">
                    {carwash.name}
                </p>
                {carwash?.location && (
                    <p>
                        <span className="text-text-muted">Адрес:</span>{' '}
                        {carwash.location}
                    </p>
                )}
                {carwash?.telephone && (
                    <p>
                        <span className="text-text-muted">Телефон:</span>{' '}
                        {carwash.telephone}
                    </p>
                )}

                <PrimaryBtn onClick={onClick} className="mt-8 text-sm sm:ml-auto">
                    Редактировать график работы
                </PrimaryBtn>
            </div>
            <ul className="space-y-2">
                {carwash.schedule && carwash.schedule.map((weekday, idx) => (
                    <li key={`weekday-${idx}`}>
                        <span className="text-text-muted">
                            {getWeekdayShortName(idx)}:
                        </span>{' '}
                        {weekday.is_day_off
                            ? 'Выходной'
                            : `с ${weekday.start} до ${weekday.end}`}
                    </li>
                ))}
            </ul>
        </div>
    );
}
