import NavMenuBtn from "@/components/atoms/nav-menu-btn";
import AddressMap from "@/components/molecules/search/address-map";
import SearchHeader from "@/components/molecules/search/search-header"
import CarwashInfo from "@/components/organisms/home/carwash-info";
import CarwashReviews from "@/components/organisms/home/carwash-reviews";
import ErrorFallback from "@/components/organisms/shared/error-boundary"
import { useCarwashInfo } from "@/lib/hooks/carwash/use-carwash-info";
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

    return (
        <CarwashSlotsProvider>
            <div className="primary-px primary-py">
                <SearchHeader />

                <section className="px-4 sm:px-8 sm:pb-9 xl:pb-8 xl:px-9 xl:pt-7 pt-5 pb-7 border border-border rounded-xl">
                    <div className="rounded-3xl overflow-clip z-0">
                        <ErrorBoundary FallbackComponent={ErrorFallback}>
                            <AddressMap key="carwash-page-map" addresses={addresses} isLoading={isLoading} />
                        </ErrorBoundary>
                    </div>
                    
                    <nav className="flex items-center max-w-125 mx-auto lg:max-w-154 mt-5 md:mt-7 xl:mt-10">
                        <NavMenuBtn isActive={currentSection === 'info'} onClick={() => setCurrentSection('info')}>Инфо</NavMenuBtn>
                        <NavMenuBtn isActive={currentSection === 'reviews'} onClick={() => setCurrentSection('reviews')}>Отзывы</NavMenuBtn>
                    </nav>

                    {currentSection === 'info' ? <CarwashInfo carwashData={data} /> : <CarwashReviews />}

                </section>
            </div>
        </CarwashSlotsProvider>
    )
}

