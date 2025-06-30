import NavMenuBtn from "@/components/atoms/nav-menu-btn";
import AddressMap from "@/components/molecules/search/address-map";
import SearchHeader from "@/components/molecules/search/search-header"
import PrimaryFilters from "@/components/organisms/search/primary-filters";
import ErrorFallback from "@/components/organisms/shared/error-boundary"
import { useCarwashInfo } from "@/lib/hooks/carwash/use-carwash-info";
import useSearchSlotsContext from "@/lib/hooks/context/use-search-slots-context";
import { CarwashSlotsProvider } from "@/lib/providers/carwash-slots-provider";
import { extractCarwashInfoAddresses } from "@/lib/utils/get-filter-options";
import { useState } from "react";
import { ErrorBoundary } from "react-error-boundary"
import { useParams } from "react-router-dom"

export default function Carwash() {
    const { id } = useParams();
    const parsedId = Number(id);
    const [currentSection, setCurrentSection] = useState<'info' | 'reviews'>('info');

    const { data, isLoading } = useCarwashInfo(parsedId);

    if (data?.data == null) return null;

    const addresses = extractCarwashInfoAddresses(data);

    console.log(data);

    return (
        <CarwashSlotsProvider>
            <div className="primary-px primary-py">
                <SearchHeader />

                <section className="px-4 sm:px-8 sm:pb-9 xl:pb-8 xl:px-9 xl:pt-7 pt-5 pb-7 border border-border rounded-xl">
                    <div className="rounded-3xl overflow-clip z-0">
                        <ErrorBoundary FallbackComponent={ErrorFallback}>
                            <AddressMap addresses={addresses} isLoading={isLoading} />
                        </ErrorBoundary>
                    </div>

                    <div className="mt-3.5 mb-6 sm:mt-5 xl:mt-7 xl:mb-9.5">
                        <h2 className="mb-3.5 sm:mb-5 xl:mb-7 md:text-lg">
                            Фильтры
                        </h2>

                        <ErrorBoundary FallbackComponent={ErrorFallback}>
                            <FilterWrapper />
                        </ErrorBoundary>
                    </div>
                    <nav className="flex items-center max-w-125 mx-auto lg:max-w-154">
                        <NavMenuBtn isActive={currentSection === 'info'} onClick={() => setCurrentSection('info')}>Инфо</NavMenuBtn>
                        <NavMenuBtn isActive={currentSection === 'reviews'} onClick={() => setCurrentSection('reviews')}>Отзывы</NavMenuBtn>
                    </nav>

                </section>
            </div>
        </CarwashSlotsProvider>
    )
}

function FilterWrapper() {
    const {
        areFiltersLoading,
        filters,
        date,
        setDate,
        startTime,
        endTime,
        setStartTime,
        setEndTime,
        startPrice,
        endPrice,
        setStartPrice,
        setEndPrice,
        serviceCategoryId,
        setServiceCategoryId,
        serviceTypeId,
        setServiceTypeId,
        vehicleTypeId,
        setVehicleTypeId,
    } = useSearchSlotsContext();

    return <PrimaryFilters areFiltersLoading={areFiltersLoading} filters={filters} date={date} setDate={setDate} startTime={startTime} endTime={endTime} setStartTime={setStartTime} setEndPrice={setEndPrice} setEndTime={setEndTime} endPrice={endPrice} startPrice={startPrice} serviceCategoryId={serviceCategoryId} setServiceCategoryId={setServiceCategoryId} serviceTypeId={serviceTypeId} setServiceTypeId={setServiceTypeId} vehicleTypeId={vehicleTypeId} setVehicleTypeId={setVehicleTypeId} setStartPrice={setStartPrice} />;
}

