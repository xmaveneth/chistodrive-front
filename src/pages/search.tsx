import SearchHeader from '@/components/molecules/search/search-header';
import AddressMap from '@/components/molecules/search/address-map';
import PrimaryFilters from '@/components/organisms/search/primary-filters';
import { SearchServiceProvider } from '@/lib/providers/search-service-provider';
import TopFilters from '@/components/organisms/search/top-filters';
import SearchResult from '@/components/organisms/search/search-results';

export default function Search() {
    return (
        <SearchServiceProvider>
            <div className="primary-px primary-py">
                <SearchHeader />

                <section className="px-4 sm:px-8 sm:pb-9 xl:pb-8 xl:px-9 xl:pt-7 pt-5 pb-7 border border-border rounded-xl">
                    <TopFilters />

                    <div className="rounded-3xl overflow-clip z-0">
                        <AddressMap />
                    </div>

                    <div className="mt-3.5 mb-6 sm:mt-5 xl:mt-7 xl:mb-9.5">
                        <h2 className="mb-3.5 sm:mb-5 xl:mb-7 md:text-lg">
                            Фильтры
                        </h2>

                        <PrimaryFilters />
                    </div>

                    <SearchResult />
                </section>
            </div>
        </SearchServiceProvider>
    );
}
