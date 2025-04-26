import PrimaryBtn from '@/components/atoms/primary-btn';
import { range } from '@/lib/utils/range';

export default function InfoSkeleton() {
    return (
        <div className="flex flex-col gap-8 mb-6 sm:mb-11 sm:flex-row sm:justify-between">
            <div className="space-y-2 sm:space-y-3 sm:order-2 sm:text-right">
                <p className="text-2xl font-medium block sm:text-3xl bg-gray-400 sm:ml-auto text-transparent animate-pulse rounded-sm w-max">
                    Loading... Loading...
                </p>
                <p className="bg-gray-400 block text-transparent sm:ml-auto animate-pulse rounded-sm w-max">
                    Loading... Loading...
                </p>
                <p className="bg-gray-400 block text-transparent sm:ml-auto animate-pulse rounded-sm w-max">
                    Loading... Loading...
                </p>

                <PrimaryBtn className="mt-8 text-sm sm:ml-auto bg-gray-400 text-transparent animate-pulse">
                    Редактировать график работы
                </PrimaryBtn>
            </div>
            <ul className="space-y-2">
                {range(1, 7).map((idx) => (
                    <li
                        key={`schedule-skeleton-${idx}`}
                        className="bg-gray-400 text-transparent animate-pulse rounded-sm w-max"
                    >
                        loading Loading...
                    </li>
                ))}
            </ul>
        </div>
    );
}
