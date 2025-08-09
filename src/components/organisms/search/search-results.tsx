import PrimaryBtn from '@/components/atoms/primary-btn';
import DialogLayout from '@/components/layouts/dialog-layout';
import EntryDialog from '@/components/molecules/search/entry-dialog';
import ServiceCard from '@/components/molecules/search/service-card';
import { useSearchServicesContext } from '@/lib/hooks/context/use-search-services-context';
import { formatDateToString } from '@/lib/utils/format-date';
import { ServiceResult, Slot } from '@/lib/utils/search-services';
import { useState } from 'react';

export default function SearchResult() {
    const {
        servicesData,
        areServicesLoading,
        isServicesError,
        date,
        incrementCurrentPage,
        showIncrementPageBtn,
        userCars,
    } = useSearchServicesContext();

    const [showEntryDialog, setShowEntryDialog] = useState(false);
    const [selectedCarwash, setSelectedCarwash] =
        useState<ServiceResult | null>(null);

    const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);

    const [selectedTime, setSelectedTime] = useState('');

    function handleTimeSelect(val: string, carwash: ServiceResult, slot: Slot) {
        setSelectedTime(val);
        setSelectedSlot(slot);
        setSelectedCarwash(carwash);
        setShowEntryDialog(true);
    }

    if (isServicesError)
        return (
            <p className="text-white">
                Произошла ошибка при загрузке результатов запроса, попробуйте
                позже
            </p>
        );

    if (servicesData == null) return null;
    const services = servicesData?.data;

    if (services.length === 0)
        if (areServicesLoading) {
            Array.from({ length: 3 }, (_, index) => (
                <ServiceCardSkeleton key={`skeleton-card-${index}`} />
            ));
        } else {
            return (
                <p className="text-white">
                    По вашему запросу не найдено ни одного результата
                </p>
            );
        }

    return (
        <>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 xs:gap-3 md:gap-3.5">
                {services.map((service, index) => (
                    <ServiceCard
                        key={`service-${service.car_wash_id}-${index}`}
                        imgPath={service.img}
                        name={service.car_wash_name}
                        address={service.address}
                        serviceName={service.service_name}
                        description={service.description}
                        start_price={service.start_price}
                        end_price={service.end_price}
                        slots={service.slots}
                        onClick={handleTimeSelect}
                        service={service}
                    />
                ))}
                {areServicesLoading &&
                    Array.from({ length: 3 }, (_, index) => (
                        <ServiceCardSkeleton key={`skeleton-card-${index}`} />
                    ))}
            </div>

            {showIncrementPageBtn && (
                <PrimaryBtn
                    onClick={incrementCurrentPage}
                    className="mt-10 sm:mt-12 mx-auto sm:py-5 sm:px-10"
                >
                    Показать еще
                </PrimaryBtn>
            )}

            <DialogLayout
                isOpen={showEntryDialog}
                closeDialog={() => setShowEntryDialog(false)}
            >
                <EntryDialog
                    userCars={userCars}
                    carwash={selectedCarwash}
                    date={formatDateToString(date ?? new Date())}
                    time={selectedTime}
                    slot={selectedSlot}
                    closeDialog={() => setShowEntryDialog(false)}
                />
            </DialogLayout>
        </>
    );
}

function ServiceCardSkeleton() {
    return (
        <div className="rounded-lg text-transparent animate-pulse">
            <div className="overflow-clip relative aspect-[1.55/1] rounded-lg bg-gray-100/50"></div>
            <div className="p-2 pb-3.5 sm:p-3 sm:pb-4.5">
                <p className="flex items-start gap-1 mb-2.5 text-xs sm:text-sm text-transparent bg-gray-100/50 rounded-sm">
                    loading
                </p>
                <div className="flex items-center mb-3 bg-gray-100/50 rounded-sm">
                    loading
                </div>
                <p className="mb-2.5 text-lg sm:text-xl bg-gray-100/50 rounded-sm">
                    loading
                </p>
                <p className="mb-2.5 text-xs sm:text-sm min-h-26 sm:min-h-30 bg-gray-100/50 rounded-sm">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Cumque deserunt eius modi optio facere reiciendis
                    consequatur rerum veritatis commodi vel?
                </p>
                <p className="mb-2.5 text-sm sm:text-base">loading</p>
                <p className="text-xs sm:text-sm bg-gray-100/50 rounded-sm">
                    Узнать подробнее
                </p>
            </div>
        </div>
    );
}
