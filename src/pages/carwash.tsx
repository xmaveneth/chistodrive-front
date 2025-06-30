import AddressMap from "@/components/molecules/search/address-map";
import SearchHeader from "@/components/molecules/search/search-header"
import ErrorFallback from "@/components/organisms/shared/error-boundary"
import { useCarwashInfo } from "@/lib/hooks/carwash/use-carwash-info";
import { extractCarwashInfoAddresses } from "@/lib/utils/get-filter-options";
import { ErrorBoundary } from "react-error-boundary"
import { useParams } from "react-router-dom"

export default function Carwash() {
    const { id } = useParams();
    const parsedId = Number(id);

    const { data, isLoading } = useCarwashInfo(parsedId);

    if (data?.data == null) return null;

    const addresses = extractCarwashInfoAddresses(data);

    return (
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
                        {/* FILTERS */}
                    </ErrorBoundary>
                </div>
                {/* TODO */}
            </section>
        </div>
    )
}
